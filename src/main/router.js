//#region IMPORTS

// React
import React from 'react';

// React-Router
import {
	Switch,
	Route,
	BrowserRouter as Router,
} from 'react-router-dom';

// Site pages
import TrackGetter from './spotifytrackgetter';
import Projects from './Projects';

// Others
import BaseApp from './App';
import Nav from './nav';

//#endregion

function mainRouter() {
	return(
		<Router basename="/main">
			<Nav />
			<Switch>
				<Route exact path="/">
					<BaseApp />
				</Route>
				<Route path="/projects">
					<Projects />
				</Route>
				<Route path="/trackgetter">
					<TrackGetter />
				</Route>
				<Route>
					{/* Route to 404 */}
				</Route>
			</Switch>
		</Router>
	)
}

export default mainRouter;