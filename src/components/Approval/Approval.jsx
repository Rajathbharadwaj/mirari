import { connect } from "react-redux";
import {
	Button,
	Snackbar,
	Alert,
	Typography,
	Card,
	CardContent,
	Box,
	TextField,
} from "@mui/material";
import { useState } from "react";
import LPInfo from "../../contracts/abis/fuji/JLP.json";
import MasterInfo from "../../contracts/abis/fuji/MasterChef.json";
import Web3 from "web3";
import config from "../../contracts/config";

const Approval = ({ currentWallet, pools, creatorTokenSymbol }) => {
	const web3 = new Web3(window.web3.currentProvider);
	const backgroundColor = "#e84042";
	const color = "#fff";

	const [balance, setBalance] = useState(0);
	const [isApproved, setIsApproved] = useState(false);
	const [dval, setDval] = useState(0);
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState("info");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertDetails, setAlertDetails] = useState("");

	const selectedCreatorPool = pools.filter((item) => item.tokenSymbol === creatorTokenSymbol);
	console.info("selectedCreatorPool", selectedCreatorPool);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	let approveValue = web3.utils.toWei("100000000000000000");
	//this is liqudity pool address, no jlp's address
	const LPabi = LPInfo.abi;
	const LPAddress = config.fuji.JLP;
	const LPContract = new web3.eth.Contract(LPabi, LPAddress);
	//MasterChef
	const Masterabi = MasterInfo.abi;
	const masterChefAddress = config.fuji.MasterChef;
	const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);
	const pid = config.fuji.pid;

	function Deposit(value) {
		//write contract
		// setDval(document.querySelector('input').value)
		let key = web3.utils.toWei(value);
		// let key=BigNumber(value *config.decimals)
		MasterContract.methods.deposit(pid, key).send({ from: currentWallet }, function (err, res) {
			if (err) {
				setAlertType("error");
				setAlertMessage("Deposit Transaction failed!");
				setAlertDetails(`📃 Tx Hash: ${err.toString()}`);
				setOpen(true);
				console.log("An error occured", err);
				return;
			} else {
				setAlertType("info");
				setAlertMessage("🔊 New Transaction");
				setAlertDetails(`📃 Tx Hash: ${res.toString()}`);
				setOpen(true);
				console.log("Hash of the transaction: " + res);
			}
		});
	}

	function Approval() {
		//write contract
		LPContract.methods
			.approve(masterChefAddress, approveValue)
			.send({ from: currentWallet }, function (err, res) {
				if (err) {
					setAlertType("error");
					setAlertMessage("Approval failed!");
					setAlertDetails(`📃 Tx Hash: ${err.toString()}`);
					setOpen(true);
					console.log("An error occured", err);
					return;
				} else {
					setAlertType("info");
					setAlertMessage("🔊 New Transaction");
					setAlertDetails(`📃 Tx Hash: ${res.toString()}`);
					setOpen(true);
					console.log("Hash of the transaction: " + res);
				}
			});
	}

	function checkApproval() {
		// ----------------------------------------------------------------
		// Read function
		LPContract.methods.allowance(currentWallet, masterChefAddress).call(function (err, res) {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			console.log("The allowance is: ", res);
			if (res === approveValue) {
				setIsApproved(true);
			} else {
				setIsApproved(false);
			}
		});

		LPContract.methods.balanceOf(currentWallet).call(function (err, res) {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			console.log("The balances are: ", res);
			// let key =BigNumber(res/config.decimals)
			setBalance(res / config.decimals);
		});
		//
	}

	return (
		<Box sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
			<Card
				sx={{
					width: "52%",
					marginTop: "32px",
					height: "300px",
					borderRadius: "16px",
					color: color,
					backgroundColor: backgroundColor,
				}}
			>
				<CardContent>
					<Box>
						<Typography marginBottom="16px" textAlign="center" variant="h4">
							DEPOSIT LP
						</Typography>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{!isApproved && (
								<Button
									sx={{ marginBottom: "10px" }}
									variant="contained"
									onClick={() => checkApproval()}
								>
									Check Your Approval
								</Button>
							)}
							{isApproved === false ? (
								<Button variant="contained" onClick={() => Approval()}>
									Approve
								</Button>
							) : (
								<>
									<Button variant="contained" onClick={() => Deposit(dval)}>
										Deposit
									</Button>
									<TextField
										id="mytext1"
										onChange={(e) => setDval(e.target.value)}
										placeholder="0"
										value={dval}
										inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
										InputProps={{
											endAdornment: (
												<Button
													variant="text"
													sx={{ width: "100%" }}
													onClick={() => setDval(balance)}
													align="center"
												>
													Deposit Max LP
												</Button>
											),
										}}
										sx={{ marginTop: "16px" }}
									/>
								</>
							)}
						</div>
						<div style={{ marginTop: "16px" }}>Balance In Your Wallet : {balance} LP</div>
					</Box>
				</CardContent>
			</Card>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
					<Typography>{alertMessage}</Typography>
					<Typography>{alertDetails}</Typography>
				</Alert>
			</Snackbar>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	currentWallet: state.currentWallet,
	pools: state.pools,
	creatorTokenSymbol: state.selectedCreator.tokenSymbol,
});

export default connect(mapStateToProps, null)(Approval);
