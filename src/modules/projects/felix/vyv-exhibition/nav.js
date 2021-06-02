import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

function Navigator() {
	return(
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">
					Felixácka výtvarná exhibícia
				</Typography>
				<Button href="/projects/felix/vyv-exhibition/">
					Domov
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Navigator;