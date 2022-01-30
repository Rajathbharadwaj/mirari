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
import { useEffect, useState } from "react";
import LPInfo from "../../contracts/abis/fuji/JLP.json";
import MasterInfo from "../../contracts/abis/fuji/MasterChef.json";
import Web3 from "web3";
import config from "../../contracts/config";
import { setStakedBalance, setStakingModalState } from "../../actions/AppActions";
import useInterval from "../../hooks/useInterval";
import StakingModal from "components/StakingModal/StakingModal";

const Stake = ({
	currentWallet,
	selectedPool,
	balance,
	setStakedBalance,
	stakingModalState,
	setStakingModalState,
}) => {
	const web3 = new Web3(window.web3.currentProvider);
	const backgroundColor = "#000000";
	const color = "#ffffff";
	const { icon, name, symbol, tokenSymbol, lpAddresses, tokenAddresses, pid } = selectedPool;
	const [dval, setDval] = useState(0);
	const [open, setOpen] = useState(false);
	const [isApproved, setIsApproved] = useState(false);
	const [hasUserStaked, setHasUserStaked] = useState(false);
	const [participate, setParticipate] = useState(false);
	const [wval, setWval] = useState(0);
	const [reward, setReward] = useState(0);
	const [alertType, setAlertType] = useState("info");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertDetails, setAlertDetails] = useState("");
	const closeModal = () => setStakingModalState({ open: false });
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const approveValue = web3.utils.toWei("100000000000000000");

	//this is liqudity pool address, not jlp's address
	const LPabi = LPInfo.abi;
	const LPAddress = lpAddresses[4];
	const LPContract = new web3.eth.Contract(LPabi, LPAddress);
	//MasterChef
	const Masterabi = MasterInfo.abi;
	const masterChefAddress = config.fuji.MasterChef;
	const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);

	function Deposit(value) {
		let amountInWei = web3.utils.toWei(value.toString());
		MasterContract.methods
			.deposit(pid, amountInWei)
			.send({ from: currentWallet }, function (err, res) {
				if (err) {
					setAlertType("error");
					setAlertMessage("Deposit Transaction failed!");
					setAlertDetails(`📃 Tx Hash: ${err.message}`);
					setOpen(true);
					console.log("An error occured", err);
				} else {
					setAlertType("success");
					setAlertMessage("🔊 New Transaction");
					setAlertDetails(`📃 Tx Hash: ${res.toString()}`);
					setOpen(true);
					console.log("Hash of the transaction: " + res);
				}
			})
			.on("transactionHash", (tx) => {
				setAlertType("success");
				setAlertMessage("🔊 New Transaction");
				setAlertDetails(`📃 Tx Hash: ${tx}`);
				setOpen(true);
				console.log("Hash of the transaction: " + tx);
				setHasUserStaked(true);
				if (value === 0) {
					closeModal();
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
					setAlertDetails(`📃 Tx Hash: ${err.message}`);
					setOpen(true);
					console.log("An error occured", err);
				} else {
					setAlertType("info");
					setAlertMessage("🔊 New Transaction");
					setAlertDetails(`📃 Tx Hash: ${res.toString()}`);
					setOpen(true);
					console.log("Hash of the transaction: " + res);
				}
			})
			.on("transactionHash", (tx) => {
				setAlertType("success");
				setAlertMessage("🔊 Approved");
				setAlertDetails(`📃 Tx Hash: ${tx}`);
				setOpen(true);
				console.log("Hash of the transaction: " + tx);
				setIsApproved(true);
			});
	}

	function withdrawFunds(value) {
		let amountInWei = web3.utils.toWei(value.toString());
		MasterContract.methods.withdraw(pid, amountInWei).send({ from: currentWallet }, (err, res) => {
			if (err) {
				setAlertType("error");
				setAlertMessage("Approval failed!");
				setAlertDetails(`📃 Tx Hash: ${err.message}`);
				setOpen(true);
				console.log("An error occured", err);
			} else {
				setAlertType("info");
				setAlertMessage("🔊 New Transaction");
				setAlertDetails(`📃 Tx Hash: ${res.toString()}`);
				setOpen(true);
				console.log("Hash of the transaction: " + res);
			}
		});
	}

	function fetchStakedBalanceFromMasterChef() {
		MasterContract.methods.userInfo(pid, currentWallet).call((err, res) => {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			if (res.amount !== 0 && hasUserStaked) {
				setParticipate(true);
				setStakedBalance(res.amount / config.decimals);
			} else {
				setParticipate(false);
			}
		});
	}

	function checkApproval() {
		LPContract.methods.allowance(currentWallet, masterChefAddress).call(function (err, res) {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			if (res === approveValue) {
				setIsApproved(true);
			} else {
				setIsApproved(false);
			}
		});

		if (!hasUserStaked) {
			LPContract.methods.balanceOf(currentWallet).call(function (err, res) {
				if (err) {
					console.log("An error occured", err);
					return;
				}
				const bal = res / config.decimals;
				setStakedBalance(bal);
				if (bal > 0) {
					setHasUserStaked(true);
				}
			});
		}
	}

	useInterval(() => checkApproval(), 1500);

	useInterval(() => fetchStakedBalanceFromMasterChef(), 1500);

	useInterval(function () {
		if (hasUserStaked) {
			MasterContract.methods.pendingSushi(pid, currentWallet).call((err, res) => {
				if (err) {
					console.log("An error occured", err);
					return;
				}
				setReward(web3.utils.fromWei(res));
			});
		}
	}, 8000);

	useEffect(() => {
		if (hasUserStaked) {
			fetchStakedBalanceFromMasterChef();
		}
	}, [hasUserStaked]);

	return (
		<Box sx={{ alignItems: "baseline", display: "flex", justifyContent: "center" }}>
			{hasUserStaked && (
				<Card
					sx={{
						width: "32%",
						marginTop: "32px",
						marginRight: "32px",
						height: "100%",
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
							<Typography marginBottom="16px" textAlign="center" variant="h5">
								DAPPER Earned
							</Typography>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									variant="h5"
									textAlign="center"
									sx={{ fontSize: "32px", color: "#e84042" }}
								>
									{reward} DAP
								</Typography>
								<Button
									variant="contained"
									sx={{ backgroundColor: "#e84042", marginLeft: "16px", marginTop: "16px" }}
									onClick={() => {
										setStakingModalState({
											...stakingModalState,
											open: true,
											symbol,
											closeModal,
											title: "Harvest Dapper Earnings",
											value: wval,
											setValue: setWval,
											onConfirm: () => {
												Deposit(0);
											},
										});
									}}
								>
									Harvest
								</Button>
							</div>
						</Box>
					</CardContent>
				</Card>
			)}
			<Card
				sx={{
					width: "32%",
					marginTop: "32px",
					height: "100%",
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
						<Typography marginBottom="16px" textAlign="center" variant="h5">
							{name}
						</Typography>
						{!hasUserStaked && (
							<Typography marginBottom="16px" textAlign="center">
								Deposit {symbol}
								<br />
								Earn DAP
							</Typography>
						)}
						<div style={{ display: "flex", flexDirection: "column" }}>
							{!isApproved && (
								<Button
									variant="contained"
									sx={{ backgroundColor: "#e84042" }}
									onClick={() => Approval()}
								>
									Approve {symbol}
								</Button>
							)}
							{isApproved && !hasUserStaked && (
								<>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042" }}
										onClick={() => {
											setStakingModalState({
												...stakingModalState,
												open: true,
												symbol,
												closeModal,
												title: `Deposit ${symbol}`,
												value: dval,
												setValue: setDval,
												onConfirm: () => {
													Deposit(dval);
												},
											});
										}}
									>
										Deposit {symbol}
									</Button>
									<div style={{ marginTop: "16px" }}>
										Balance In Your Wallet : {balance} {symbol}
									</div>
								</>
							)}
						</div>
						{isApproved && participate && (
							<div style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									variant="h5"
									textAlign="center"
									sx={{ fontSize: "32px", color: "#e84042" }}
								>
									{balance} {symbol} Staked
								</Typography>
								<Box
									sx={{
										display: "flex",
										width: "100%",
										justifyContent: "space-evenly",
										marginTop: "16px",
									}}
								>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042", width: "200px" }}
										onClick={() => {
											setStakingModalState({
												...stakingModalState,
												open: true,
												symbol,
												closeModal,
												title: `Withdraw ${symbol}`,
												value: wval,
												setValue: setWval,
												onConfirm: () => {
													withdrawFunds(wval);
												},
											});
										}}
									>
										Withdraw
									</Button>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042", width: "200px" }}
										onClick={() => {
											setStakingModalState({
												...stakingModalState,
												open: true,
												symbol,
												closeModal,
												title: `Deposit ${symbol}`,
												value: dval,
												setValue: setDval,
												onConfirm: () => {
													Deposit(dval);
												},
											});
										}}
									>
										Deposit
									</Button>
								</Box>
							</div>
						)}
					</Box>
				</CardContent>
			</Card>

			<StakingModal {...stakingModalState} />

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
	balance: state.stakedBalance,
	stakingModalState: state.stakingModalState,
});

const mapDispatchToProps = {
	setStakedBalance: setStakedBalance,
	setStakingModalState: setStakingModalState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stake);
