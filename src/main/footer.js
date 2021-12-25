import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#ffc107',
		position: 'fixed',
		bottom: '0%',
		width: '100%',
	},
	text: {
		textAlign: 'center',
		padding: theme.spacing(1.5),
	},
}));

function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Typography className={classes.text}>
				&copy; 2021 Filip Antala | <Link color="primary" href="mailto:filip@ahst.sk">filip@ahst.sk</Link>
			</Typography>
		</div>
	);
}

export default Footer;
