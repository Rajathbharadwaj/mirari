import Transfer from "./components/Transfer";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import Assets from "./components/Assets";
import Blockie from "../Blockie";
import { Grid, Typography } from "@mui/material";

const styles = {
	title: {
		fontSize: "30px",
		fontWeight: "600",
	},
	header: {
		paddingTop: "20px",
		fontWeight: "700",
		fontSize: "18px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	card: {
		width: "450px",
		background: "#FFFFFF",
		boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
		marginBottom: "20px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	navLinks: {
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
		marginTop: "20px",
		paddingBottom: "20px",
		borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
	},
	navLink: {
		textDecoration: "none",
		fontWeight: "700",
		color: "#4b5552",
	},
	activeLink: {
		color: "#21BF96",
	},
};

const Wallet = (props) => {
	const { isAuthenticated, authErrorMessage } = props;
	if (isAuthenticated) {
		return (
			<Grid container flexDirection="column" alignItems="center" justifyContent="center">
				<Typography style={styles.title}>Your Wallet</Typography>
				<div style={styles.card}>
					<div style={styles.header}>
						<Blockie size={10} avatar currentWallet />
						<Address size="6" copyable />
						<NativeBalance />
					</div>
					<div style={styles.navLinks}>
						<NavLink to="/wallet/transfer" style={styles.navLink} activeStyle={styles.activeLink}>
							Transfer
						</NavLink>
						<NavLink to="/wallet/assets" style={styles.navLink} activeStyle={styles.activeLink}>
							Assets
						</NavLink>
					</div>
					<Switch>
						<Route path="/wallet/transfer">
							<Transfer />
						</Route>
						<Route path="/wallet/assets">
							<Assets />
						</Route>
						<Redirect to="/wallet/transfer" />
					</Switch>
				</div>
			</Grid>
		);
	} else {
		return authErrorMessage();
	}
};

export default Wallet;
