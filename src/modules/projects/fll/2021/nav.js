import { AppBar, Button, Divider, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useContext, useState } from 'react';
import AddPlaygroundByAddress from "./addPlayground";
import { AuthContext } from './authprovider';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	button: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 0.02,
	}
}));


function Navigator() {
	const classes = useStyles();
	const { state, logout, showAuth } = useContext(AuthContext);
	const { authenticated, data, loading } = state;
	const [addPgOpen, setAddPgOpen] = useState(false);
	if (loading) return 'Loading...'
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Databáza ihrísk
					</Typography>
					<div className={classes.button}>
						<Button variant="outlined" href="/projects/fll/2021">
							Domov
						</Button>
						<Button variant="outlined" href="/projects/fll/2021/find">
							Vyhľadať ihriská
						</Button>
						<Button variant="outlined" onClick={() => setAddPgOpen(true)}>
							Pridať ihrisko
						</Button>
					</div>
					{authenticated ? <UserMenu data={data} logout={logout} /> : <Button color="inherit" onClick={() => showAuth(true)}>Login</Button>}
				</Toolbar>
			</AppBar>
			<AddPlaygroundByAddress open={addPgOpen} setOpen={setAddPgOpen} />
		</div>
	)
}

function UserMenu({ data, logout }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	}
	const handleMenuClose = () => {
		setAnchorEl(null);
	}

	const isMenuOpen = Boolean(anchorEl);

	const menuId = 'account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			getContentAnchorEl={null}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem button={false}>User: {data.username}</MenuItem>
			<MenuItem button={false}>Role: {data.role}</MenuItem>
			<Divider />
			<MenuItem>Profile</MenuItem>
			<MenuItem onClick={() => logout(true)}>Logout</MenuItem>
		</Menu>
	)

	return (
		<div>
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-haspopup="true"
				onClick={handleProfileMenuOpen}
				color="inherit"
			>
				<AccountCircle style={{ marginRight: '0.1em' }} />
				<Typography variant="caption">
					{data.name}
				</Typography>
			</IconButton>
			{renderMenu}
		</div>

	)
}

export default Navigator;