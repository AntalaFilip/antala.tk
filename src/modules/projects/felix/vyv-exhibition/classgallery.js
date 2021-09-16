import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Axios = axios.create({ baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3020' : 'https://vyvapi.antala.tk' });

const useStyles = makeStyles(theme => ({
	root: {

	},
	header: {
		textAlign: 'center',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	imgs: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	img: {
		maxWidth: 450,
	},
	card: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));

function ClassGallery() {
	const classes = useStyles();
	const { cid } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	if (!cid) return 'Not found';

	if (!data) {
		Axios.get(`/gallery/${cid}`)
			.then(res => {
				setLoading(false);
				if (res.status === 200) {
					setData(res.data.items);
				}
			})
			.catch(err => {
				setLoading(false);
				console.error(err);
			});
	}

	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.header}>
				Galéria triedy {cid.substr(0, 1).toUpperCase() + cid.substr(1)}
			</Typography>
			{
				loading
					?
					<CircularProgress />
					:
					<div className={classes.imgs}>
						{data && data.map(img => (
							<Card key={img.id} className={classes.card}>
								<CardHeader
									title={img.name}
									subheader={img.author}
								/>
								<CardMedia
									component="img"
									alt={img.id}
									className={classes.img}
									image={img.uri}
									title={img.name}
								/>
								<CardContent>
									<Typography variant="body1" color="textSecondary">
										{img.desc}
									</Typography>
								</CardContent>
								<CardActions>
									<Button href={img.uri}>
										Zobraziť originál
									</Button>
								</CardActions>
							</Card>
						))}
					</div>
			}
		</div>
	);
}

export default ClassGallery;