import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import { Button } from "@mui/material";

const styles = {
	account: {
		height: "42px",
		padding: "0 15px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "fit-content",
		borderRadius: "12px",
		backgroundColor: "rgb(244, 244, 244)",
		cursor: "pointer",
	},
	text: {
		color: "#e84042",
	},
};

function Account() {
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { walletAddress } = useMoralisDapp();

	if (!isAuthenticated) {
		return (
			<Button
				size="large"
				variant="contained"
				style={{
					background: "#e84142",
					color: "#fff",
				}}
				onClick={() =>
					authenticate({ signingMessage: "Sign here to connect to Watch To Earn dApp" })
				}
			>
				Connect Wallet
			</Button>
		);
	}

	return (
		<div style={styles.account} onClick={() => logout()}>
			<p style={styles.text}>{getEllipsisTxt(walletAddress, 6)}</p>
		</div>
	);
}

export default Account;
