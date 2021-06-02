import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Backdrop, CircularProgress, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

const LIST_PLAYGROUNDS = gql`
	query getPlaygrounds {
		playgrounds {
			id
			name
			location {
				address {
					formatted
				}
				geocoordinates {
					latitude
					longtitude
				}
			}
			addedby {
				name
			}
			categories {
				name
			}
			facilities {
				name
			}
		}
	}
`;

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1 },
	{ field: 'name', headerName: 'Name', flex: 1.5 },
	{ field: 'address', headerName: 'Address', flex: 3 },
	{ field: 'categories', headerName: 'Categories', flex: 4 },
	{ field: 'facilities', headerName: 'Facilities', flex: 4 },
	{ field: 'addedby', headerName: 'Added by', flex: 2 },
];

const useStyles = makeStyles((theme) => ({
	searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	searchButton: {
		padding: 10,
	},
	errorDiv: {
		textAlign: 'center',
		'& h4': {
			marginTop: '0.4em',
		},
	},
	tableContainer: {
		display: 'flex',
	},
}));

function ListPlaygrounds() {
	const { loading, error, data } = useQuery(LIST_PLAYGROUNDS);
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	if (loading) return <Backdrop open={loading}><CircularProgress color="inherit" /></Backdrop>;
	if (error) {
		enqueueSnackbar('An error has occurred while fetching data', { variant: 'error', key: 'pgfetcherror' });
		console.error(error);
	}
	return (
		<>
			<Paper component="form" className={classes.searchRoot}>
				<InputBase placeholder="Vyhľadať ihriská" inputProps={{ 'aria-label': 'vyhľadať ihriská' }} className={classes.input} />
				<IconButton type="submit" aria-label="vyhľadať" className={classes.searchButton}>
					<Search />
				</IconButton>
			</Paper>
			<div className={classes.tableContainer}>
				<div style={{ flexGrow: 0.9 }}>
					<DataGrid
						rows={
							data && data.playgrounds ? data.playgrounds.map(pg => (
								{
									id: pg.id,
									name: pg.name,
									address: pg.location.address.formatted,
									addedby: pg.addedby.name,
									categories: pg.categories.map(ctg => (ctg.name)),
									facilities: pg.facilities.map(fac => (fac.name)),
								}
							)) : []}
						columns={columns}
						pageSize={10}
						checkboxSelection
						autoHeight
						components={{ Toolbar: GridToolbar }}
					/>
				</div>
			</div>
		</>
	);
}
export default ListPlaygrounds;