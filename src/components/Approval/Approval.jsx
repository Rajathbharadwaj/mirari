/* eslint-disable react-hooks/exhaustive-deps */
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
import useInterval from "../../hooks/useInterval";

const Approval = ({ currentWallet, selectedPool }) => {
	const web3 = new Web3(window.web3.currentProvider);
	const backgroundColor = "#000000";
	const color = "#ffffff";
	const { icon, name, symbol, tokenSymbol, lpAddresses, tokenAddresses, pid } = selectedPool;
	const [balance, setBalance] = useState(0);
	const [isApproved, setIsApproved] = useState(false);
	const [dval, setDval] = useState(0);
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState("info");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertDetails, setAlertDetails] = useState("");

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	let approveValue = web3.utils.toWei("100000000000000000");

	//this is liqudity pool address, not jlp's address
	const LPabi = LPInfo.abi;
	const LPAddress = lpAddresses[4];
	const LPContract = new web3.eth.Contract(LPabi, LPAddress);
	//MasterChef
	const Masterabi = MasterInfo.abi;
	const masterChefAddress = config.fuji.MasterChef;
	const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);

	function Deposit(value) {
		let key = web3.utils.toWei(value);
		console.info("key", key);
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
				setAlertType("success");
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

	useInterval(() => checkApproval(), 1500);

	return (
		<Box sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
			<Card
				sx={{
					width: "32%",
					marginTop: "32px",
					height: "400px",
					borderRadius: "16px",
					color: color,
					backgroundColor: backgroundColor,
				}}
			>
				<CardContent>
					<Box>
						<div
							style={{
								display: "flex",
								background: "#2e2e2e",
								fontSize: "36px",
								height: "80px",
								width: "80px",
								borderRadius: "40px",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 16px",
								boxShadow: "inset 4px 4px 8px #ff0000, inset -6px -6px 12px #a0a0a0",
							}}
						>
							{icon}
						</div>
						<Typography marginBottom="16px" textAlign="center" variant="h4">
							{name}
						</Typography>
						<Typography marginBottom="16px" textAlign="center">
							Deposit {symbol}
							<br />
							Earn DAP
						</Typography>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{isApproved === false ? (
								<Button
									variant="contained"
									sx={{ backgroundColor: "#e84042" }}
									onClick={() => Approval()}
								>
									Approve {symbol}
								</Button>
							) : (
								<>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042" }}
										onClick={() => Deposit(dval)}
									>
										Deposit {symbol}
									</Button>
									<TextField
										id="mytext1"
										onChange={(e) => {
											const val = e.target.value.replace(/\D/, "");
											setDval(val);
										}}
										placeholder="0"
										value={dval}
										inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
										InputProps={{
											sx: {
												color: color,
												backgroundColor: "#2e2e2e",
											},
											endAdornment: (
												<Button
													variant="text"
													sx={{ width: "100%" }}
													onClick={() => setDval(balance)}
													align="center"
												>
													Deposit Max {symbol.replace("LP", "")}
												</Button>
											),
										}}
										sx={{ marginTop: "16px" }}
									/>
								</>
							)}
						</div>
						<div style={{ marginTop: "16px" }}>
							Balance In Your Wallet : {balance} {symbol}
						</div>
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
	selectedPool: state.selectedPool,
});

export default connect(mapStateToProps, null)(Approval);
