import React from 'react';

import {
	Switch,
	Route,
	BrowserRouter as Router,
} from 'react-router-dom';

function mainRouter() {
	return(
		<Router basename="/main">
			<Switch>
				<Route exact path="/">
					{/* Route to homepage */}
				</Route>
				<Route>
					{/* Route to 404 */}
				</Route>
			</Switch>
		</Router>
	)
}

export default mainRouter;