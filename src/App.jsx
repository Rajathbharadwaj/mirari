import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Account from "components/Account";
import { Autocomplete, Grid, Stack, Typography, TextField } from "@mui/material";
import { createUseStyles } from "react-jss";
import Logo from "./Logo.png";

const useStyles = createUseStyles({
	root: {
		height: "100vh",
		background: "radial-gradient(100% 6959.67% at 0% 49.32%, #E84042 0%, #171717 89.79%)",
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
							autoHighlight
							renderInput={(params) => <TextField {...params} label="Search" />}
							getOptionLabel={(option) => option.label}
						/>
					</Grid>
					<Grid item xs={2} className={{ paddingTop: "6px" }}>
						<Account />
					</Grid>
				</Grid>
				<Grid container className={classes.content}>
					<Switch>
						<Route path="/">{!isAuthenticated && authErrorMessage()}</Route>
						<Route path="/earnings">{!isAuthenticated && authErrorMessage()}</Route>
						<Route path="/mychannel">{!isAuthenticated && authErrorMessage()}</Route>
						<Route path="/swap">{!isAuthenticated && authErrorMessage()}</Route>
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
};

export default App;
