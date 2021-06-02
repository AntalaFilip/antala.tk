import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import { FourZeroFour } from './errors';

import Home from './home';
import Nav from './nav';
import RoA from './roadofart';
import Gallery from './gallery';
import ClassGallery from './classgallery';

function MainRouter() {
	return (
		<Router basename="/projects/felix/vyv-exhibition">
			<Nav />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/roadofart">
					<RoA />
				</Route>
				<Route exact path="/gallery">
					<Gallery />
				</Route>
				<Route exact path="/gallery/:cid" children={<ClassGallery />} />
				<Route>
					Not found
				</Route>
			</Switch>
		</Router>
	);
}

export default MainRouter;