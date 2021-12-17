import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Account from "components/Account";
import Wallet from "components/Wallet";
import { Grid, Stack, Typography } from "@mui/material";
import Logo from "./Logo.png";

const styles = {
	root: { height: "100vh", background: "#000000", color: "#fff", fontFamily: "Roboto, sans-serif" },
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
		background: "#121212",
	},
	headerItem: { paddingTop: "22px" },
	content: {
		display: "flex",
		justifyContent: "center",
		color: "#6e6e6e",
		paddingTop: "10%",
	},
	link: {
		textDecoration: "none",
		color: "#fff",
		"&:hover": {
			cursor: "pointer",
		},
	},
};
const App = () => {
	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

	const authErrorMessage = () => (
		<Typography style={{ color: "#e84142" }} align="center">
			Please login using the "Connect Wallet" button
		</Typography>
	);

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	return (
		<Router>
			<Grid container style={styles.root}>
				<Grid container item alignItems="flex-start" style={styles.header}>
					<Grid item xs={2}>
						<NavLink to="/" style={styles.logoLink}>
							<img alt="Watch To Earn Logo" style={styles.logo} src={Logo} />
						</NavLink>
					</Grid>
					<Grid item xs={4} style={styles.headerItem}>
						<Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={6}>
							<NavLink style={styles.link} to="/">
								Home
							</NavLink>
							<NavLink style={styles.link} to="/marketplace">
								Marketplace
							</NavLink>
							<NavLink style={styles.link} to="/subscriptions">
								Subscriptions
							</NavLink>
							<NavLink style={styles.link} to="/wallet">
								Wallet
							</NavLink>
						</Stack>
					</Grid>
					<Grid item xs={4} style={styles.headerItem}>
						Search bar goes here
					</Grid>
					<Grid item xs={2} style={{ paddingTop: "6px" }}>
						<Account />
					</Grid>
				</Grid>
				<Grid container style={styles.content}>
					<Switch>
						<Route path="/wallet">
							<Wallet isAuthenticated={isAuthenticated} authErrorMessage={authErrorMessage} />
						</Route>
						<Route path="/">{!isAuthenticated && authErrorMessage()}</Route>
						<Route path="/subscriptions">{!isAuthenticated && authErrorMessage()}</Route>
						<Route path="/marketplace">{!isAuthenticated && authErrorMessage()}</Route>
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
};

export default App;
