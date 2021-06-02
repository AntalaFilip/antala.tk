// React
import React from 'react';
import ReactDOM from 'react-dom';

// React-Router
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Sub-Site Routers
import main from './main/router';
import vyvrouter from './modules/projects/felix/vyv-exhibition/router';
import fll21router from './modules/projects/fll/2021/router';

// Others
import reportWebVitals from './reportWebVitals';
import Modules from './modules';

import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<Router basename="/">
				{/* */}
				<Switch>
					{/* Load up the mainpage router */}
					<Route exact path="/main*" children={main} />
					<Route path="/projects/felix/vyv-exhibition/" children={vyvrouter} />
					<Route path="/projects/fll/2021/" children={fll21router} />
					{/* Redirect to the main page if the user just opened the site */}
					<Route exact path="/" children={redirToMain} />
				</Switch>
			</Router>
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

function redirToMain() {
	window.location.href = "/main";
}


reportWebVitals();