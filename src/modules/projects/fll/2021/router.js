import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import cookie from 'cookie';

import {
	Switch,
	Route,
	BrowserRouter as Router,
} from 'react-router-dom';

import Home from './home';
import ListPlaygrounds from './listPlaygrounds';
import AddPlayground from './addPlayground';

import Nav from './nav';

import AuthProvider from './authprovider';

const httplink = createHttpLink({
	uri: process.env.NODE_ENV === 'production' ? 'http://188.167.224.122:4000/graphql' : 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
	const cookies = cookie.parse(document.cookie);
	const token = cookies['authToken'];

	return {
		headers: {
			...headers,
			authorization: token ? token : '',
		},
	};
});
const client = new ApolloClient({ link: authLink.concat(httplink), cache: new InMemoryCache() });

function MainRouter() {
	const theme = createMuiTheme({
		palette: {
			type: 'light',
		},
	});

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider>
					<AuthProvider>
						<Router basename="/projects/fll/2021">
							<Nav />
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/find">
									<ListPlaygrounds />
								</Route>
								<Route exact path="/new">
									<AddPlayground />
								</Route>
								<Route children={'404'} />
							</Switch>
						</Router>
					</AuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}
export default MainRouter;