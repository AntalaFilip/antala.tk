import { Typography } from '@material-ui/core';
import React from 'react';
import fs from 'fs';
import { useParams } from 'react-router';

function ClassGallery() {
	const { cid } = useParams();
	if (!cid) return 'Not found';
	/* const imgpaths = fs.readdirSync(`./gallery/${cid}`);
	const imgs = imgpaths.map(path => (require(path))); */

	return (
		<div>
			<Typography variant="h3">Galéria triedy {cid.substr(0, 1).toUpperCase() + cid.substr(1)}</Typography>
			{/* {imgs} */}
		</div>
	)
}

export default ClassGallery;