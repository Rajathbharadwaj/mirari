import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Account from "components/Account";
import Wallet from "components/Wallet";
import { Grid, Stack, Typography } from "@mui/material";

const styles = {
	root: { height: "100vh", background: "#000000", color: "#fff", fontFamily: "Roboto, sans-serif" },
	header: {
		position: "fixed",
		paddingTop: "8px",
		background: "#121212",
	},
	headerItem: { paddingTop: "8px" },
	content: {
		display: "flex",
		justifyContent: "center",
		color: "#6e6e6e",
		paddingTop: "6%",
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
						<Logo />
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
					<Grid item xs={2}>
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

export const Logo = () => (
	<svg width="80" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
			fill="#E84142"
		/>
		<path
			d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
			fill="white"
		/>
	</svg>
);

export default App;
