import './App.css';
import { Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		justifyItems: 'center',
		flexWrap: 'wrap',
	},
	header: {
		textAlign: 'center',
	},
	break: {
		flexBasis: '100%',
		height: 0,
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography variant="h2">Filip Antala</Typography>
			</div>
			<div className={classes.break}/>
			<div>
				<Typography variant="h4">Welcome to my awesome white portfolio page.</Typography>
				<Typography variant="h5">You can look around, but it's not that pretty yet.</Typography>
				<Typography>
					I am a high school student, <Link href="https://github.com/AntalaFilip">developer</Link>, bit of a sysadmin, bookworm...
					<br/>You can take a look at most of my bigger projects <Link href="/main/projects">here</Link>.
					<br/>I do lots of stuff, but mostly work with NodeJS.
					<br/>Check out my amazing <Link href="/main/trackgetter">Spotify track getter</Link>.
					<br/>Be hypnotized by shrinking paragraphs.
					<br/>Look! They're gettings shorter!
					<br/>Yes, I'm in high school.
					<br/>Definitely mature.
					<br/>Anyway, byee.
					<br/>*waves*
				</Typography>
			</div>
		</div>
	);
}

export default App;
