import React, { createContext } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import AError from '../../../../errors/Error';
import { EventEmitter } from 'events'
import AuthDialog from './login';

export const AuthContext = createContext();

const AuthorizationApi = axios.create({ baseURL: 'http://188.167.224.122:4000/auth' })
class AuthProvider extends React.Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			authenticated: false,
			data: null,
			showAuthDialog: false,
		}
	}
	componentDidMount() {
		this.auth();
	}
	login = async (username, password) => {
		if (this.state.authenticated) throw new AError(`You are already logged in!`, `ALRLOGGEDIN`);
		if (!username || !password) throw new AError(`Missing parameters!`, `MISSINGPARAM`);

		const { cookies } = this.props;

		try {
			const res = await AuthorizationApi.post('/login', { user: username, pass: password });
			if (res.status === 200) {
				cookies.set('authToken', res.data.data.token, { path: '/projects/fll/2021' });
				this.eventManager.emit('login', true);
				this.auth();
				return res.data.data;
			}
			else {
				console.log('A');
				throw new AError();
			}
		}
		catch {
			console.log('B')
			throw new AError();
		}
	}
	logout = (useraction = false) => {
		const { cookies } = this.props;
		cookies.remove('authToken', { path: '/projects/fll/2021' });
		if (this.state.loading) this.eventManager.emit('loaded', this.state);
		this.setState({
			...this.state,
			authenticated: false,
			data: null,
			loading: false,
		});
		this.eventManager.emit('logout', useraction);
		this.props.enqueueSnackbar(`You have been logged out!`, { variant: useraction ? 'success' : 'warning', key: 'loggedout' });
	}
	register = async (username, password, fullname, email) => {
		if (!username || !password || !fullname || !email) throw new AError('Missing parameters!', 'MISSINGPARAM');

		try {
			await AuthorizationApi.post('/register', { user: username, pass: password, name: fullname, email });
			return true;
		}
		catch (error) {
			const res = error.response;
			if (res.status === 400 || res.status === 500) {
				const error = res.data.error;
				throw new AError(error.message, error.code);
			}
		}
	}
	auth = async () => {
		const { cookies } = this.props;
		const token = cookies.get('authToken');
		if (token) {
			AuthorizationApi.defaults.headers.common['Authorization'] = token;
			try {
				const result = await AuthorizationApi.post('/auth');
				if (result.status === 200) {
					if (this.state.loading) this.eventManager.emit('loaded', this.state);
					this.setState({
						...this.state,
						authenticated: true,
						data: result.data.data.user,
						loading: false,
					});
					this.eventManager.emit('auth', true);
				}
				else this.logout(false);
			}
			catch {
				this.logout(false);
			}
		}
		else {
			this.setState({
				...this.state,
				authenticated: false,
				data: null,
				loading: false,
			});
			this.eventManager.emit('loaded', this.state);
		}
		return this.state.data;
	}
	showAuthDialog = (bool = true) => {
		if (this.state.authenticated && bool) return;
		this.setState({ showAuthDialog: bool });
	}
	eventManager = new EventEmitter();
	render() {
		const value = {
			state: this.state,
			auth: this.auth,
			login: this.login,
			logout: this.logout,
			register: this.register,
			events: this.eventManager,
			showAuth: this.showAuthDialog,
		}
		return (
			<AuthContext.Provider value={value}>
				<AuthDialog />
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

export default withCookies(withSnackbar(AuthProvider));