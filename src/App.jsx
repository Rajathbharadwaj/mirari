import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Account from "components/Account";
import { Autocomplete, Grid, Typography, TextField } from "@mui/material";
import { createUseStyles } from "react-jss";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Sidebar from "containers/Sidebar/Sidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MyChannel from "containers/MyChannel/MyChannel";
import { setWalletAddress } from "./actions/AppActions";
import Logo from "./Logo.png";
import CreatorChannel from "containers/CreatorChannel/CreatorChannel";

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
		paddingLeft: "14px",
	},
	header: {
		position: "fixed",
		paddingTop: "8px",
		background: "#2e2e2e",
		flexWrap: "nowrap",
		justifyContent: "space-between",
		zIndex: 8,
	},
	headerItem: { paddingTop: "22px" },
	nav: {
		display: "flex",
		justifyContent: "space-evenly",
	},
	searchBar: {
		paddingTop: "8px",
	},
	content: {
		display: "flex",
		justifyContent: "center",
		color: "#c4c4c4",
		paddingTop: "100px",
		marginLeft: "150px",
		marginBottom: "50px",
	},
	link: {
		textDecoration: "none",
		fontSize: "14px",
		color: "#fff",
		"&:hover": {
			color: "#E84042",
		},
	},
});
const App = ({ setWalletAddress }) => {
	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
	const { walletAddress } = useMoralisDapp();
	const classes = useStyles();
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.only("xs"));
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
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
			enableWeb3();
			setWalletAddress(walletAddress);
		}
		if (!isAuthenticated) {
			setWalletAddress(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled, walletAddress]);

	return (
		<Router>
			<Grid container className={classes.root}>
				<Grid container alignItems="center" className={classes.header} spacing={1}>
					<Grid
						item
						xs={1}
						sx={{
							minWidth: "150px",
							maxWidth: "150px",
						}}
					>
						<NavLink to="/" className={classes.logoLink}>
							<img alt="Watch To Earn Logo" className={classes.logo} src={Logo} />
						</NavLink>
					</Grid>
					<Grid item xs={4} className={classes.headerItem}>
						<nav className={classes.nav}>
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
						</nav>
					</Grid>
					{!isXs && (
						<Grid item sm={2} md={3} className={classes.searchBar}>
							<Autocomplete
								id="video-search"
								sx={{
									"& .MuiInputLabel-root": {
										color: "#fff",
										fontSize: "14px",
									},
									"& .MuiOutlinedInput-input": {
										color: "#fff",
										fontSize: "14px",
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
					)}
					<Grid
						item
						xs={4}
						sm={2}
						md="auto"
						style={{
							paddingTop: "10px",
							paddingRight: "30px",
							width: {
								xs: 250,
								sm: 400,
								md: "100%",
							},
						}}
					>
						<Account />
					</Grid>
				</Grid>
				<Sidebar />
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
							{!isAuthenticated ? (
								authErrorMessage()
							) : (
								<MyChannel currentWallet address={walletAddress} />
							)}
						</Route>
						<Route exact path="/swap">
							{!isAuthenticated ? authErrorMessage() : <>Coming soon</>}
						</Route>
						<Route
							path="/creator/:creatorName"
							children={<CreatorChannel address={walletAddress} />}
						></Route>
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
};

const mapDispatchToProps = {
	setWalletAddress,
};

export default connect(null, mapDispatchToProps)(App);
