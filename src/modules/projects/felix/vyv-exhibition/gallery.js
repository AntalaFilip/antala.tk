import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActions, Button, makeStyles, Divider, CircularProgress } from '@material-ui/core';
import axios from 'axios';
const Axios = axios.create({ baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3020' : 'https://vyvapi.antala.tk' });

const useStyles = makeStyles(theme => ({
	root: {

	},
	header: {
		textAlign: 'center',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	card: {
		marginLeft: theme.spacing(1),
	},
}));

function Gallery() {
	const classes = useStyles();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	if (!data) {
		Axios.get('/gallery')
			.then(res => {
				if (res.status === 200) {
					setData(res.data.items);
				}
				setLoading(false);
			})
			.catch(err => {
				console.error(err);
				setLoading(false);
			});
	}

	return (
		<div className={classes.root}>
			<Typography className={classes.header} variant="h3">Triedne galérie:</Typography>
			{loading ? <CircularProgress /> : <div className={classes.cards}>
				{data ? data.map(cls => (
					<Card key={cls.id} className={classes.card} raised>
						<CardContent>
							<Typography variant="h6" color="textSecondary">
								{cls.name}
							</Typography>
							<Divider />
							<Typography>
								{cls.desc}
							</Typography>
						</CardContent>
						<CardActions>
							<Button color="secondary" variant="contained" href={`/projects/felix/vyv-exhibition/gallery/${cls.id}`}>
                                Prejsť do galérie
							</Button>
						</CardActions>
					</Card>
				)) : 'An error has occurred'}
			</div>}
		</div>
	);
}

export default Gallery;