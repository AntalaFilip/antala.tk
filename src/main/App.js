import './App.css';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {

	},
	header: {
		textAlign: 'center',
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography variant="h2">Hey there!</Typography>
			</div>
		</div>
	);
}

export default App;
