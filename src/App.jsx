import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Account from "components/Account";
import { Autocomplete, Grid, Stack, Typography, TextField } from "@mui/material";
import { createUseStyles } from "react-jss";
import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Logo from "./Logo.png";

const useStyles = createUseStyles({
	root: {
		color: "#fff",
		fontFamily: "Roboto, sans-serif",
	},
	logoLink: {
		textDecoration: "none",
		color: "unset",
	},
	logo: {
		height: "80px",
		width: "120px",
	},
	header: {
		position: "fixed",
		paddingTop: "8px",
		background: "#2e2e2e",
	},
	headerItem: { paddingTop: "22px" },
	searchBar: {
		paddingTop: "8px",
	},
	content: {
		display: "flex",
		justifyContent: "center",
		color: "#c4c4c4",
		paddingTop: "10%",
		marginBottom: "5%",
	},
	link: {
		textDecoration: "none",
		color: "#fff",
		"&:hover": {
			color: "#E84042",
		},
	},
});
const App = () => {
	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
	const classes = useStyles();

	const authErrorMessage = () => (
		<Typography align="center">Please login using the "Connect Wallet" button</Typography>
	);

	const searchOptions = [
		{
			label: "Spell AMA with Daniele Siesta",
			code: "ama",
		},
		{
			label: "Connecting Avalanche to MetaMask",
			code: "avax tutorial",
		},
		{
			label: "Crabada Project Overview",
			code: "crabada",
		},
		{
			label: "1000X ALTCOINS",
			code: "crypto influencer",
		},
		{
			label: "Imperium Empires IGO Overview",
			code: "imperium",
		},
		{
			label: "Whales Just DUMPED",
			code: "influencer lol",
		},
		{
			label: "Infura Alternative",
			code: "moralis tutorial",
		},
		{
			label: "BIG NFT NEWS AND NEW HYPED PROJECTS!",
			code: "nft",
		},
		{
			label: "Ultra CEO INTERVIEW",
			code: "ultra",
		},
	];

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	return (
		<Router>
			<Grid container className={classes.root}>
				<Grid container item alignItems="flex-start" className={classes.header}>
					<Grid item xs={2}>
						<NavLink to="/" className={classes.logoLink}>
							<img alt="Watch To Earn Logo" className={classes.logo} src={Logo} />
						</NavLink>
					</Grid>
					<Grid item xs={4} className={classes.headerItem}>
						<Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={6}>
							<NavLink className={classes.link} to="/">
								Home
							</NavLink>
							<NavLink className={classes.link} to="/mychannel">
								My Channel
							</NavLink>
							<NavLink className={classes.link} to="/earnings">
								Earnings
							</NavLink>
							<NavLink className={classes.link} to="/swap">
								Swap
							</NavLink>
						</Stack>
					</Grid>
					<Grid item xs={4} className={classes.searchBar}>
						<Autocomplete
							id="video-search"
							sx={{
								width: 300,
								"& .MuiInputLabel-root": {
									color: "#fff",
								},
								"& .MuiOutlinedInput-input": {
									color: "#fff",
								},
								"& .MuiSvgIcon-root": {
									color: "#fff",
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#fff",
								},
								"& .MuiOutlinedInput-notchedOutline": {
									borderColor: "#fff!important",
								},
							}}
							disablePortal
							options={searchOptions}
							noOptionsText="No Results"
							autoHighlight
							renderInput={(params) => <TextField {...params} label="Search" />}
							getOptionLabel={(option) => option.label}
						/>
					</Grid>
					<Grid item xs={2} style={{ paddingTop: "10px" }}>
						<Account />
					</Grid>
				</Grid>
				<Grid
					container
					className={classes.content}
					sx={{
						height: "auto",
					}}
				>
					<Switch>
						<Route exact path="/">
							<VideoCardsList />
						</Route>
						<Route exact path="/earnings">
							{!isAuthenticated ? authErrorMessage() : <>Coming soon</>}
						</Route>
						<Route exact path="/mychannel">
							{!isAuthenticated ? authErrorMessage() : <>Coming soon</>}
						</Route>
						<Route exact path="/swap">
							{!isAuthenticated ? authErrorMessage() : <>Coming soon</>}
						</Route>
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
};

export default App;
