import { Button, ButtonBase, ButtonGroup, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	rootDiv: {
		textAlign: 'center',
	},
	headerRoot: {
		marginTop: '0.2em',
	},
}));

function Home() {
	const classes = useStyles();
	return(
		<div className={classes.rootDiv}>
			<Typography variant="h3" className={classes.headerRoot}>
				Vitajte na webe Felixáckej výtvarnej exhibície!
			</Typography>
			<Typography variant="h4">

			</Typography>
			<Button variant="contained" color="secondary" href="/projects/felix/vyv-exhibition/roadofart">
				Spustiť cestu umením
			</Button>
			<Button variant="contained" href="/projects/felix/vyv-exhibition/gallery">
				Prejsť do galérie
			</Button>
		</div>
	);
}

export default Home;