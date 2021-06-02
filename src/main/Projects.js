import { Button, Card, CardActions, CardContent, Chip, Divider, Link, makeStyles, Popover, Typography } from '@material-ui/core';
import { blue, green, grey, orange, red, yellow } from '@material-ui/core/colors';
import { CancelOutlined, Check, HourglassEmpty, Pause, Schedule, Warning } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
	root: {

	},
	heading: {
		textAlign: 'center',
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(1),
	},
	description: {
		textAlign: 'center',
		marginBottom: theme.spacing(1),
	},
	card: {
		maxWidth: 350,
		margin: theme.spacing(1),
	},
	cardTitle: {

	},
	cardDescription: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	status: {
		marginTop: theme.spacing(2),
	},
	cards: {
		display: 'flex',
		justifyContent: 'center',
		justifyItems: 'center',
		flexWrap: 'wrap',
	},
	popover: {
		padding: theme.spacing(1),
	},
}));

const cards = [
	{
		name: 'FelixMuzikál | School',
		description: <>FelixMusical is a project aimed to provide accurate information about current musicals at {<Link href="https://www.skolafelix.sk">School Felix</Link>}.
			It also serves as a place for new musical makers to find inspiration, or get help from the team.</>,
		category: ['programming', 'javascript'],
		links: [
			{
				name: 'Check it out!',
				url: 'https://felixmuzikal.sk',
				props: {
					variant: 'outlined',
					color: 'secondary',
					rel: "noreferrer",
					target: "_blank",
				},
			},
			{
				name: 'Learn more',
				url: '/main/projects/felixmuzikal',
			},
		],
		chips: ['onHold'],
	},
	{
		name: 'FelixBot | JavaScript | SK',
		description: `FelixBot is a private Discord bot to manage online learning and make it easier for teachers
			by providing helpful utilities such as automatic attendance logging, mass moving students, randoms and more. Now with an API and a website!`,
		category: ['programming', 'javascript'],
		links: [
			{
				name: 'Management page',
				url: 'https://felixdiscord.felixmuzikal.sk',
				props: {
					variant: 'outlined',
					color: 'secondary',
					rel: 'noreferrer',
					target: '_blank',
				},
			},
			{
				name: 'Source code',
				url: 'https://github.com/AntalaFilip/FelixBot',
				props: {
					rel: 'noreferrer',
					target: '_blank',
				},
			},
		],
		chips: ['noLongerMaintained'],
	},
	{
		name: 'FLL - 2021 | JavaScript | SK',
		description: <>This is a project for the <Link href="https://firstlegoleague.org">First Lego League</Link> 2021 competition <Link href="https://www.fll.sk">in Slovakia</Link>.
			The purpose of this project is to provide a database of playgrounds and training fields in Bratislava
			and a portal for users, in which they can find playgrounds by categories or location, and add or modify existing playgrounds.</>,
		category: ['programming', 'javascript'],
		links: [
			{
				name: 'Website',
				url: 'http://filipantala.ddns.net/projects/fll/2021',
				props: {
					variant: 'outlined',
					color: 'secondary',
					rel: 'noreferrer',
					target: '_blank',
				},
			},
			{
				name: 'API source',
				url: 'https://github.com/AntalaFilip/FLL-api',
				props: {
					rel: 'noreferrer',
					target: '_blank',
				},
			},
			{
				name: 'Web source',
				url: 'https://github.com/AntalaFilip/antalafilip.github.io',
				props: {
					rel: 'noreferrer',
					target: '_blank',
				},
			},
		],
		chips: ['inProgress'],
	},
	{
		name: `MDGA | Unity C# | EN`,
		category: ['programming', 'C#', 'unity'],
		description: <><Link href="https://en.wikipedia.org/wiki/Mensch_%C3%A4rgere_Dich_nicht">Mensch ärgere Dich nicht </Link>
			(Man, don't get angry, shortened to MDGA) is a German board game for 4 players, similar to
			<Link href="https://en.wikipedia.org/wiki/Parcheesi"> Parcheesi </Link> or
			<Link href="https://en.wikipedia.org/wiki/Trouble_(board_game)"> Trouble</Link>.
			I'm remaking it as an online game in Unity, allowing global multiplayer, making an extended version for 6 players
			and potentially adding some more fun stuff to it</>,
		links: [],
		chips: ['onHold'],
	},
	{
		name: `This website | JavaScript | EN`,
		description: <>This website serves as a personal portfolio and for having a convenient place to host my projects</>,
		category: ['programming', 'javascript'],
		links: [],
		chips: ['inProgress'],
	},
	{
		name: `Spotify track getter | JavaScript | EN`,
		description: <>Simple one-page site which authorizes the user into the Spotify API, gets all tracks from a given artist,
		 can filter duplicates and prints them in a convenient table with sorting, filtering and (broken) CSV export.</>,
		category: ['programming', 'javascript'],
		links: [
			{
				name: 'Try it out',
				url: '/main/trackgetter',
				props: {
					color: 'secondary',
					variant: 'contained',
				},
			},
		],
		chips: ['finished'],
	},
	{
		name: `DisInteractions | JavaScript | EN`,
		description: <>NodeJS module (maybe built on the DiscordJS framework) for using Discord's new Interactions (slash commands).
			Should include everything from registering commands, running a http server to listen for commands, parse them and so on.</>,
		category: ['programming', 'javascript'],
		links: [
			{
				name: 'Source',
				url: 'https://github.com/AntalaFilip/DisInteractionsJS',
			},
		],
		chips: ['planned'],
	},
];


function Projects() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const [popoverId, setPopoverId] = useState(null);

	const handlePopoverOpen = (pid) => (e) => {
		setAnchorEl(e.currentTarget);
		setPopoverId(pid);
	};
	const handlePopoverClose = (e) => {
		setAnchorEl(null);
		setPopoverId(null);
	};

	const popperOpen = Boolean(anchorEl);

	const chips = {
		finished: {
			id: 'finished',
			text: (
				<Typography>
					This project is in a finished state.
				</Typography>
			),
			chip: (<Chip
				size="medium"
				label="Finished!"
				style={{ backgroundColor: green[500] }}
				avatar={<Check />}
				onClick={handlePopoverOpen("finished")}
			/>),
		},
		inProgress: {
			id: 'inprogress',
			text: (
				<Typography>
					This project is in currently in progress.
				</Typography>
			),
			chip: (
				<Chip
					size="medium"
					label="In progress"
					style={{ backgroundColor: blue[500] }}
					avatar={<HourglassEmpty />}
					onClick={handlePopoverOpen("inProgress")}
				/>
			),
		},
		noLongerMaintained: {
			id: 'nolongermaintained',
			text: (
				<Typography>
					This project is no longer maintained and is not receiving updates, but may still receive critical bug fixes.
				</Typography>
			),
			chip: (
				<Chip
					size="medium"
					label="No longer maintained"
					style={{ backgroundColor: grey[400] }}
					avatar={<Warning />}
					onClick={handlePopoverOpen("noLongerMaintained")}
				/>
			),
		},
		abandoned: {
			id: 'abandoned',
			text: (
				<Typography>
					This project is abandoned and will not be worked on or maintained in any way.
				</Typography>
			),
			chip: (
				<Chip
					size="medium"
					label="Abandoned"
					style={{ backgroundColor: red[500] }}
					avatar={<CancelOutlined />}
					onClick={handlePopoverOpen("abandoned")}
				/>
			),
		},
		onHold: {
			id: 'onhold',
			text: (
				<Typography>
					This project is currently not receiving updates, but will be worked on in the future.
				</Typography>
			),
			chip: (
				<Chip
					size="medium"
					label="On hold"
					style={{ backgroundColor: yellow[500] }}
					avatar={<Pause />}
					onClick={handlePopoverOpen("onHold")}
				/>
			),
		},
		planned: {
			id: 'planned',
			text: (
				<Typography>
					This project is planned, and will probably be worked on sometimes in the future.
				</Typography>
			),
			chip: (
				<Chip
					size="medium"
					label="Planned"
					style={{ backgroundColor: orange[400] }}
					avatar={<Schedule />}
					onClick={handlePopoverOpen("planned")}
				/>
			),
		},
	};

	const curtext = chips[popoverId] ? chips[popoverId].text : null;
	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.heading}>My projects:</Typography>
			<Typography className={classes.description}>Here, you can find all my projects, from programming, through managing, to school projects.</Typography>
			<div className={classes.cards}>
				{cards.map(card => (
					<Card key={card.name} className={classes.card} raised>
						<CardContent>
							<Typography variant="h6" color="textSecondary">
								{card.name}
							</Typography>
							<Divider />
							<Typography variant="body2" className={classes.cardDescription}>
								{card.description}
							</Typography>
							{card.chips.map(id => (chips[id].chip))}
						</CardContent>
						<CardActions>
							{card.links.map(link => (
								<Button key={link.name} size="small" {...link.props} href={link.url}>{link.name}</Button>
							))}
						</CardActions>
					</Card>
				))}
				<Popover
					open={popperOpen}
					anchorEl={anchorEl}
					onClose={handlePopoverClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
				>
					<div className={classes.popover}>
						{curtext && curtext}
					</div>
				</Popover>
			</div>

		</div>
	);
}

export default Projects;