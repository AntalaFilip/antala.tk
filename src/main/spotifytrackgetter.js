import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch as rSwitch, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button, FormControlLabel, Switch, TextField, Typography } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { grey } from '@material-ui/core/colors';
import AError from '../errors/Error';

const SpotifyApi = axios.create({ baseURL: 'https://api.spotify.com/v1' });

function RenderPage() {
	const [cookies] = useCookies();
	const [input, setInput] = useState();
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [showDuplicates, setShowDuplicates] = useState(false);

	function msToMinSec(millis) {
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);
		return (
			seconds === 60 ?
				(minutes + 1) + ":00" :
				minutes + ":" + (seconds < 10 ? "0" : "") + seconds
		);
	}

	const columns = [
		{ field: 'track', headerName: 'Track name', flex: 1.5 },
		{ field: 'artists', headerName: 'Artists', flex: 1 },
		{ field: 'album', headerName: 'Album', flex: 1 },
		{ field: 'duration', headerName: 'Duration', flex: 0.5 },
	];

	const submit = async (e) => {
		e.preventDefault();
		if (!input) return setError('Please provide an artist!');
		setError();
		setData();
		setLoading(true);
		SpotifyApi.defaults.headers.common['Authorization'] = `Bearer ${cookies.spotifyAuth}`;
		try {
			const artistres = await SpotifyApi.get('/search', { params: { query: input, type: 'artist' } });
			const artist = artistres.data.artists.items[0];
			if (!artist) throw new AError('Artist not found', 'SPTNOARTIST');
			const albumsres = await SpotifyApi.get(`/artists/${artist.id}/albums`, { params: { limit: 50, market: 'SK', include_groups: 'album,single' } });
			const albums = albumsres.data.items;
			const rawtracks = [];
			for (let i = 0; i < albums.length; i++) {
				const id = albums[i].id;
				const tracksres = await SpotifyApi.get(`/albums/${id}/tracks`);
				const trdata = tracksres.data.items;
				const mapped = trdata.map(track => ({ name: track.name, id: track.id, href: track.external_urls.spotify, artists: track.artists, album: { name: albums[i].name, href: albums[i].external_urls.spotify }, duration: track.duration_ms }));
				rawtracks.push(...mapped);
			}
			rawtracks.sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
			const tracks = rawtracks.reduce((arr, tr) => {
				if (!arr.find(val => val.name === tr.name)) arr.push(tr);
				return arr;
			}, []);
			let duration = 0;
			let rawduration = 0;
			tracks.forEach(tr => duration += tr.duration);
			rawtracks.forEach(rtr => rawduration += rtr.duration);
			setData({ tracks, duration, rawduration, rawtracks, artist });
			setLoading(false);
		}
		catch (err) {
			setData('Something went wrong! Sorry! ' + err);
			setLoading(false);
		}
	};

	const renderTableRow = (track) => (
		{
			id: track.id,
			track: track.name,
			artists: track.artists.map(artist => (artist.name)),
			album: track.album.name,
			duration: msToMinSec(track.duration),
		}
	);

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Spotify track getter</h1>
			{cookies.spotifyAuth &&
				<>
					<form onSubmit={submit}>
						<Typography>Enter artist name</Typography>
						<TextField
							variant="standard"
							color="secondary"
							style={{ backgroundColor: grey[200] }}
							type="text"
							value={input}
							onChange={e => setInput(e.target.value)}
						/>
						<Button
							type="submit"
							disabled={loading}
							variant="contained"
						>
						Get tracks!
						</Button>
					</form>
					<FormControlLabel
						control={
							<Switch
								checked={showDuplicates}
								onChange={() => setShowDuplicates(!showDuplicates)}
							/>
						}
						label={<Typography>Show duplicates</Typography>}
					/><br />
					{loading && 'Processing... this may take a while'}
					{error && <Typography color="error">{error}</Typography>}
					{
						<>
							{data && <>Found {showDuplicates ? data.rawtracks.length : data.tracks.length} tracks by {data.artist.name}, length: {Math.floor(((showDuplicates ? data.rawduration : data.duration) / 1000) / 60)}min</>}
							<div style={{ height: '500px', margin: '20px', display: 'flex' }}>
								<div style={{ flexGrow: 1 }}>
									<DataGrid
										columns={columns}
										rows={data ? showDuplicates ? data.rawtracks.map(renderTableRow) : data.tracks.map(renderTableRow) : []}
										components={{ Toolbar: GridToolbar }}
										loading={loading}
										checkboxSelection
									/>
								</div>

							</div>

						</>
					}
				</>
			}
			{!cookies.spotifyAuth &&
				<>
					You are not logged in!
					<br />
					{process.env.NODE_ENV === 'development' &&
						<a href={`https://accounts.spotify.com/en/authorize?client_id=042bbeff35b54d618b97de6ed9e16bf0&response_type=token&redirect_uri=${encodeURI('http://localhost:3000/main/trackgetter/authorize')}`}>Log in through Spotify!</a>}
					{process.env.NODE_ENV === 'production' &&
						<a href={`https://accounts.spotify.com/en/authorize?client_id=042bbeff35b54d618b97de6ed9e16bf0&response_type=token&redirect_uri=${encodeURI('http://antala.tk/main/trackgetter/authorize')}`}>Log in through Spotify!</a>}
				</>}
		</div>
	);
}

function Authorize() {
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies();
	const query = useQuery();
	const hash = parseUrlHash();
	if (hash['access_token']) {
		setCookie('spotifyAuth', hash['access_token'], { path: '/main/trackgetter', maxAge: 3600 });
		window.location.href = '/main/trackgetter';
		return 'Logging in...';
	}
	setTimeout(() => window.location.href = '/main/trackgetter', 5000);
	return `Sorry, an error ocurred, redirecting; ${query.error ? query.error : ''}`;
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function parseUrlHash() {
	const hash = window.location.hash.substr(1);

	const result = hash.split('&').reduce(function(res, item) {
		const parts = item.split('=');
		res[parts[0]] = parts[1];
		return res;
	}, {});
	return result;
}

function Router() {
	return (
		<BrowserRouter basename="/main/trackgetter">
			<rSwitch>
				<Route exact path="/">
					<RenderPage />
				</Route>
				<Route path="/authorize">
					<Authorize />
				</Route>
			</rSwitch>
		</BrowserRouter>
	);
}

export default Router;