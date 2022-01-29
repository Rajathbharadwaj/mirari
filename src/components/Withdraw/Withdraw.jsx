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
import MasterInfo from "../../contracts/abis/fuji/MasterChef.json";
import Web3 from "web3";
import config from "../../contracts/config";
import useInterval from "../../hooks/useInterval";

const Withdraw = ({ currentWallet, selectedPool }) => {
	const web3 = new Web3(window.web3.currentProvider);
	const backgroundColor = "#000000";
	const color = "#ffffff";
	const { icon, name, symbol, tokenSymbol, lpAddresses, tokenAddresses } = selectedPool;
	//MasterChef
	const Masterabi = MasterInfo.abi;
	const masterChefAddress = config.fuji.MasterChef;
	const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);

	const [balance, setBalance] = useState(0);
	const [participate, setParticipate] = useState(false);
	const [wval, setWval] = useState(0);
	const [reward, setReward] = useState(0);
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState("info");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertDetails, setAlertDetails] = useState("");
	const pid = config.fuji.pid;

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	function Deposit(value) {
		//write contract

		MasterContract.methods.deposit(pid, value).send({ from: currentWallet }, function (err, res) {
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

	function WithdrawFunds(value) {
		let key = web3.utils.toWei(value);
		MasterContract.methods.withdraw(pid, key).send({ from: currentWallet }, (err, res) => {
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

	function Participate() {
		// ----------------------------------------------------------------
		// Read function
		MasterContract.methods.userInfo(pid, currentWallet).call((err, res) => {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			console.log("Staked: ", res);
			if (res.amount !== 0) {
				setParticipate(true);
				setBalance(res.amount / config.decimals);
			} else {
				setParticipate(false);
			}
		});
	}

	setInterval(function () {
		MasterContract.methods.pendingSushi(pid, currentWallet).call((err, res) => {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			console.log("Reward is: ", res);

			setReward(web3.utils.fromWei(res));
		});
	}, 8000);

	useInterval(() => Participate(), 1500);

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
						<div style={{ display: "flex", flexDirection: "column" }}>
							{participate === false ? (
								<Typography>Please Deposit {symbol} Token First</Typography>
							) : (
								<>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042" }}
										onClick={() => WithdrawFunds(wval)}
									>
										Withdraw {symbol}
									</Button>
									<TextField
										id="mytext1"
										onChange={(e) => setWval(e.target.value)}
										placeholder="0"
										value={wval}
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
													onClick={() => setWval(balance)}
												>
													Withdraw Max {symbol.replace("LP", "")}
												</Button>
											),
										}}
										sx={{ marginTop: "16px" }}
									/>
									<div
										style={{
											display: "flex",
											marginTop: "16px",
											alignItems: "center",
											justifyContent: "left",
										}}
									>
										Reward Earned : {reward} DAP
										<Button
											variant="contained"
											sx={{ backgroundColor: "#e84042", marginLeft: "16px" }}
											onClick={() => Deposit(0)}
										>
											Harvest
										</Button>
									</div>
									<div style={{ marginTop: "16px" }}>
										Staked Balance : {balance} {symbol}
									</div>
								</>
							)}
						</div>
					</Box>
				</CardContent>
			</Card>

			<Snackbar
				open={open}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
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

export default connect(mapStateToProps, null)(Withdraw);
