import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import allimgpaths from './imgs.json';

const useStyles = makeStyles(theme => ({
	root: {

	},
	imgs: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
}));

function ClassGallery() {
	const classes = useStyles();
	const { cid } = useParams();
	if (!cid) return 'Not found';

	const imgpaths = allimgpaths[cid];
	
	const imgs = imgpaths.map(path => (require(path)));

	return (
		<div className={classes.root}>
			<Typography variant="h3">
				Galéria triedy {cid.substr(0, 1).toUpperCase() + cid.substr(1)}
			</Typography>
			<div className={classes.imgs}>
				{imgs}
			</div>
		</div>
	)
}

export default ClassGallery;