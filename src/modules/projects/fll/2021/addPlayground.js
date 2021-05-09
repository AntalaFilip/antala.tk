import { gql, useMutation, useQuery } from '@apollo/client';
import { Backdrop, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, LinearProgress, makeStyles, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight, Replay, SendRounded } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { AuthContext } from './authprovider';

const ADD_PLAYGROUND_ADDRESS = gql`
	mutation AddPlaygroundByAddress($name: String!, $desc: String!, $ctgid: [Int!]!, $facid: [Int!]!, $address: String!) {
		addPlaygroundByAddress(base: {name: $name, description: $desc, categoryIds: $ctgid, facilityIds: $facid}, location: {address: $address}) {
			id
			name
			description
			categories {
				name
			}
			facilities {
				name
			}
			location {
				address {
					formatted
				}
				geocoordinates {
					latitude
					longtitude
				}
			}
		}
	}
`
const ADD_PLAYGROUND_COORDS = gql`
	mutation AddPlaygroundByCoords($name: String!, $desc: String!, $ctgid: [Int!]!, $facid: [Int!]!, $lat: Float!, $long: Float!) {
		addPlaygroundByCoords(base: {name: $name, description: $desc, categoryIds: $ctgid, facilityIds: $facid}, location: {latitude: $lat, longtitude: $long}) {
			id
			name
			description
			categories {
				name
			}
			facilities {
				name
			}
			location {
				address {
					formatted
				}
				geocoordinates {
					latitude
					longtitude
				}
			}
		}
	}
`

const GET_DATA = gql`
	query GetAddData {
		categories {
			id
			name
		}
		facilities {
			id
			name
		}
	}
`

const useFormStyles = makeStyles((theme) => ({
	selectControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	formPaper: {
		textAlign: 'center'
	},
	textField: {
		marginBottom: theme.spacing(2),
	}
}));

function AddPlaygroundByAddress({ open, setOpen }) {
	const { state, showAuth, events } = useContext(AuthContext);
	const { authenticated, loading } = state;

	const { enqueueSnackbar } = useSnackbar();

	const { loading: qloading, error: qerror, data: qdata } = useQuery(GET_DATA);
	const [addPlayground, { loading: mloading, error: merror, data: mdata }] = useMutation(ADD_PLAYGROUND_ADDRESS);

	const [pgName, setPgName] = useState();
	const [pgDesc, setPgDesc] = useState();
	const [pgAddr, setPgAddr] = useState();

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedFacilities, setSelectedFacilities] = useState([]);

	const [step, setStep] = useState(0);
	const [stepErr, setStepErr] = useState([]);
	const classes = useFormStyles();

	if (loading) return <Backdrop open={loading}><CircularProgress color="inherit" /></Backdrop>

	if (open === true) {
		if (!authenticated) {
			enqueueSnackbar(`You must be authenticated to use this module!`, { variant: 'error' });
			showAuth(true);
			events.on('auth', (success) => {
				if (success) setOpen(true);
			});
			setOpen(false);
			return null;
		}
	}
	if (open === false) {
		if (pgName) setPgName();
		if (pgDesc) setPgDesc();
		if (pgAddr) setPgAddr();
		if (selectedCategories.length > 0) setSelectedCategories([]);
		if (step !== 0) setStep(0);
		if (stepErr.length > 0) setStepErr([]);
		return null;
	}

	if (merror) {
		enqueueSnackbar(`Failed to submit data`, { variant: 'error' });
		console.error([merror, merror.networkError, merror.graphQLErrors]);
	}
	if (qerror) {
		enqueueSnackbar(`Failed to fetch data`, { variant: 'error' });
		console.error([qerror, qerror.networkError, qerror.graphQLErrors]);
	}
	if (mdata) console.log(mdata);

	const handleCategory = (e) => {
		setSelectedCategories(e.target.value);
	}
	const handleFacility = (e) => {
		setSelectedFacilities(e.target.value);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const ctgs = selectedCategories.map(ctg => parseInt((qdata.categories.find(cat => cat.name === ctg).id)));
		const facs = selectedFacilities.map(fac => parseInt((qdata.facilities.find(fct => fct.name === fac).id)));
		console.log(ctgs);
		console.log(facs);
		await addPlayground({
			variables: {
				name: pgName,
				desc: pgDesc,
				address: pgAddr,
				ctgid: ctgs,
				facid: facs,
			},
		});
		setStepErr([]);
		handleNext();
	}
	const handleNext = () => {
		const validity = document.getElementById('add-playground-form').checkValidity();
		if (validity || process.env.NODE_ENV === 'development') {
			const errInd = stepErr.indexOf(step);
			if (errInd !== -1) {
				stepErr.splice(errInd, 1);
			}
			setStep(step + 1);
		}
		else {
			enqueueSnackbar(`Please fill out all required fields!`, { variant: 'error' });
		}
		if (!validity) {
			setStepErr([...stepErr, step]);
		}
	}
	const handleBack = () => {
		const errInd = stepErr.indexOf(step - 1);
		if (errInd !== -1) {
			stepErr.splice(errInd, 1);
		}
		setStep(step - 1);
	}

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Add a playground</DialogTitle>
			<DialogContent>
				{
					(qloading) ?
						<CircularProgress color="inherit" />
						:
						qerror ?
							<Typography color="error">An error has occurred while fetching data.</Typography>
							:
							merror ?
								<Typography color="error">An error has occurred while adding the playground.</Typography>
								:
								<form id="add-playground-form" onSubmit={handleSubmit}>
									<Stepper activeStep={step} alternativeLabel>
										<Step>
											<StepLabel error={stepErr.includes(0)}>Basic information</StepLabel>
										</Step>
										<Step>
											<StepLabel error={stepErr.includes(1)}>Categories</StepLabel>
										</Step>
										<Step>
											<StepLabel error={stepErr.includes(2)}>Properties</StepLabel>
										</Step>
										<Step>
											<StepLabel error={stepErr.includes(3)}>The Aftermath</StepLabel>
										</Step>
									</Stepper>
									<Paper elevation={4} className={classes.formPaper}>
										{step === 0 &&
											<div>
												<TextField
													className={classes.textField}
													variant="standard"
													color="secondary"
													label='Playground name'
													value={pgName}
													onChange={e => setPgName(e.target.value)}
													inputMode="text"
													required
												/>
												<br />
												<TextField
													className={classes.textField}
													variant="standard"
													color="secondary"
													label='Description'
													value={pgDesc}
													onChange={e => setPgDesc(e.target.value)}
													multiline
													required
												/>
												<br />
												<TextField
													className={classes.textField}
													variant="standard"
													color="secondary"
													label='Address'
													value={pgAddr}
													onChange={e => setPgAddr(e.target.value)}
													required
												/>
											</div>
										}
										{step === 1 &&
											<div>
												<FormControl className={classes.selectControl} required>
													<InputLabel id="playground-category-label">Categories</InputLabel>
													<Select
														labelId="playground-category-label"
														id="playground-category-select"
														multiple
														value={selectedCategories}
														onChange={handleCategory}
														input={<Input id="playground-category-input" />}
														renderValue={sel => (
															<div className={classes.chips}>
																{sel.map(val => (
																	<Chip key={val} label={val} className={classes.chip} />
																))}
															</div>
														)}
													>
														{qdata.categories.map(category => (
															<MenuItem key={category.id} value={category.name}>
																{category.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
										}
										{step === 2 &&
											<div>
												{mloading && <LinearProgress />}
												<FormControl className={classes.selectControl} required>
													<InputLabel id="playground-props-label">Facilities</InputLabel>
													<Select
														labelId="playground-props-label"
														id="playground-props-select"
														multiple
														value={selectedFacilities}
														onChange={handleFacility}
														input={<Input id="playground-props-input" />}
														renderValue={sel => (
															<div className={classes.chips}>
																{sel.map(val => (
																	<Chip key={val} label={val} className={classes.chip} />
																))}
															</div>
														)}
													>
														{qdata.facilities.map(facility => (
															<MenuItem key={facility.id} value={facility.name}>
																{facility.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
										}
										{step === 3 &&
											<div>
												{mdata &&
													<>
														<Typography variant="body1">Successfully added a playground as no. {mdata.addPlaygroundByAddress.id}!</Typography>
														<Typography variant="body2">Here is a quick recap:</Typography>
														<Typography variant="caption">
															<b>Name: </b>{mdata.addPlaygroundByAddress.name}
															<br />
															<b>Description: </b>{mdata.addPlaygroundByAddress.description}
															<br />
															<b>Address: </b>{mdata.addPlaygroundByAddress.location.address.formatted}
															<br />
															<b>Coordinates: </b>Lat: {mdata.addPlaygroundByAddress.location.geocoordinates.latitude}, Long: {mdata.addPlaygroundByAddress.location.geocoordinates.longtitude}
															<br />
															<b>Categories: </b>{mdata.addPlaygroundByAddress.categories.map(ctg => ctg.name).toString()}
															<br />
															<b>Facilities: </b>{mdata.addPlaygroundByAddress.facilities.map(ctg => ctg.name).toString()}
														</Typography>
													</>
												}
											</div>
										}
									</Paper>
								</form>
				}

			</DialogContent>
			<DialogActions>
				{step !== 3 && <Button color="secondary" onClick={() => setOpen(false)}>Cancel</Button>}
				{step !== 0 && step !== 3 && <Button variant="outlined" onClick={handleBack}><ArrowLeft /> Back</Button>}
				{step !== 2 && step !== 3 &&
					<Button variant="contained" onClick={handleNext}>Next<ArrowRight /></Button>
				}
				{step === 2 &&
					<Button type="submit" form="add-playground-form" variant="contained" color="primary" disabled={mloading || stepErr.length > 0}>
						{mloading ?
							<CircularProgress color="inherit" />
							:
							<>Submit&nbsp;<SendRounded /></>
						}
					</Button>
				}
				{step === 3 &&
					<Button variant="contained" color="secondary" onClick={() => setOpen(false)}>Close</Button>}
				{
					(merror || qerror) &&
					<Button variant="outlined" color="secondary" onClick={() => window.location.reload()}>Reload <Replay /></Button>
				}
			</DialogActions>
		</Dialog>
	)
}

export default AddPlaygroundByAddress;