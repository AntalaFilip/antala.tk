import { Route, BrowserRouter as Router } from 'react-router-dom';
import modules from './modules.json';
import path from 'path';


function Modules() {
	return (
		modules.map((module, i) => (
			<Router basename="/">
				<Route key={modules.name} exact path={module.path}>
					{require('./modules/' + module.router).default}
				</Route>
			</Router>
		))
	);
}

export default Modules;