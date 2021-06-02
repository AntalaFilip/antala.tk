import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Link, makeStyles, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import AError from '../../../../errors/Error';
import { AuthContext } from './authprovider';

const useStyles = makeStyles((theme) => ({
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '90%',
		left: '75%',
		marginTop: -14,
		marginLeft: -14,
	},
	input: {
		marginBottom: theme.typography.pxToRem(6),
		marginTop: theme.typography.pxToRem(6),
	},
}));

function RenderAuthDialog() {
	const { state, showAuth, login, register } = useContext(AuthContext);
	const { showAuthDialog } = state;
	const { enqueueSnackbar } = useSnackbar();

	const theme = useTheme();
	const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
	const classes = useStyles();

	const [registerMode, setRegisterMode] = useState(false);
	const [username, setUsername] = useState();
	const [usernameError, setUsernameError] = useState(false);
	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState(false);
	const [fullname, setFullname] = useState();
	const [fullnameError, setFullnameError] = useState(false);
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState(false);
	const [tosAgree, setTosAgree] = useState(false);
	const [tosError, setTosError] = useState(false);

	const [errorText, setErrorText] = useState();
	const [loading, setLoading] = useState(false);

	const closeAuthDialog = () => {
		setLoading(false);
		showAuth(false);
		setUsername();
		setUsernameError();
		setPassword();
		setPasswordError();
		setFullname();
		setFullnameError();
		setEmail();
		setEmailError();
		setTosError();
		setErrorText();
		setRegisterMode(false);
	};

	const handleLogin = () => {
		setErrorText();
		if (!username) return setUsernameError(true);
		else setUsernameError(false);
		if (!password) return setPasswordError(true);
		else setPasswordError(false);

		login(username, password)
			.then(data => {
				closeAuthDialog();
				enqueueSnackbar(`You have been logged in!`, { variant: 'success', key: 'loginsuccess' });
			})
			.catch(err => {
				setLoading(false);
				if (err instanceof AError) {
					if (err.code && err.code === 'ALRLOGGEDIN') {
						setErrorText('You are already logged in!');
					}

				}
			});

		setLoading(true);
	};

	const handleRegister = () => {
		setErrorText();
		if (!username) return setUsernameError(true);
		else setUsernameError(false);
		if (!fullname) return setFullnameError(true);
		else setFullnameError(false);
		if (!email) return setEmailError(true);
		else setEmailError(false);
		if (!password) return setPasswordError(true);
		else setPasswordError(false);
		if (!tosAgree) return setTosError(true);
		else setTosError(false);

		register(username, password, fullname, email)
			.then(data => {
				closeAuthDialog();
				enqueueSnackbar(`Registered successfully!`, { variant: 'success', key: 'registersuccess' });
			})
			.catch(err => {
				setLoading(false);
				if (err instanceof AError) {
					if (err.code && err.code === 'ALRLOGGEDIN') {
						setErrorText('You are already logged in!');
					}
					setErrorText(err.message);
				}
			});
	};

	return (
		<Dialog
			fullscreen={fullscreen}
			open={showAuthDialog}
			onClose={closeAuthDialog}
			aria-labelledby="auth-dialog-title"
		>
			<DialogTitle id="auth-dialog-title">{registerMode ? 'Register' : 'Login'}</DialogTitle>
			<DialogContent style={{ textAlign: 'center' }}>
				<form>
					{errorText && <><Typography color="error">{errorText}</Typography></>}
					<TextField
						className={classes.input}
						variant="outlined"
						id="username-input"
						label="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={usernameError}
						required
					/>
					<br />
					{registerMode &&
						<>
							<TextField
								className={classes.input}
								variant="outlined"
								id="fullname-input"
								label="Your name"
								type="text"
								value={fullname}
								onChange={e => setFullname(e.target.value)}
								error={fullnameError}
								required
							/><br />
							<TextField
								className={classes.input}
								variant="outlined"
								id="email-input"
								label="Email"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								error={emailError}
								required
							/><br />
							<Tooltip
								title={
									'Your email is needed to reduce the risk of spammers. Your email will be kept private at all times and is only visible to you and the web admins.'
								}
							>
								<Typography color="textSecondary" variant="subtitle2">Why do we need your email?</Typography>
							</Tooltip>
						</>
					}
					<TextField
						className={classes.input}
						variant="outlined"
						id="password-input"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={passwordError}
						required
					/>
					{registerMode &&
						<>
							<br />
							<FormControlLabel
								control={
									<Checkbox
										checked={tosAgree}
										onChange={e => setTosAgree(e.target.checked)}
										name="tosAgrreement"
										color="default"
										required
									/>
								}
								label={
									<Typography variant="caption">
										I agree with the <Link underline="always" color="inherit" href="/tos">Terms of Service</Link>
									</Typography>
								}
							/><br/>
							{tosError &&
							<Typography variant="caption" color="error">You have to accept the Terms of Service!</Typography>}
						</>
					}
				</form>
			</DialogContent>
			<DialogActions>
				<Button disabled={loading} onClick={() => setRegisterMode(!registerMode)}>
					{registerMode ? 'Login' : 'Register'}
				</Button>
				<Button color="secondary" disabled={loading} onClick={closeAuthDialog} variant="outlined">
					Cancel
				</Button>
				{registerMode ?
					<Button color="primary" variant="contained" onClick={handleRegister} disabled={loading}>
						Register
					</Button>
					:
					<Button color="primary" variant="contained" onClick={handleLogin} disabled={loading}>
						Login
					</Button>}
				{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
			</DialogActions>
		</Dialog>
	);
}

export default RenderAuthDialog;