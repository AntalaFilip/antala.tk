import React from 'react';

import notfound from './media/404.jpg'

function FourZeroFour() {
	return (
		<div id="404">
			<img src={notfound} alt="404" />
		</div>
	)
}

export { FourZeroFour };