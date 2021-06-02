import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
}));

function RoadOfArt() {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Paper elevation={4}>
				test
			</Paper>
		</div>
	);
}
export default RoadOfArt;