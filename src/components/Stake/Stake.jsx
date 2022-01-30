/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Button, Snackbar, Alert, Typography, Card, CardContent, Box } from "@mui/material";
import { useEffect, useState } from "react";
import LPInfo from "../../contracts/abis/fuji/JLP.json";
import MasterInfo from "../../contracts/abis/fuji/MasterChef.json";
import Web3 from "web3";
import config from "../../contracts/config";
import {
	setStakedBalance,
	setStakingModalState,
	setLpBalance,
	setLpApproved,
	setReward,
} from "../../actions/AppActions";
import StakingModal from "components/StakingModal/StakingModal";
import { useERC20Balance } from "../../hooks/useERC20Balance";

const Stake = ({
	currentWallet,
	selectedPool,
	lpBalance,
	stakedBalance,
	reward,
	lpApproved,
	setStakedBalance,
	setStakingModalState,
	stakingModalState,
	setLpBalance,
	setLpApproved,
	setReward,
}) => {
	const { fetchERC20Balance, assets } = useERC20Balance({ chain: "avalanche testnet" });
	const web3 = new Web3(window.web3.currentProvider);
	const backgroundColor = "#000000";
	const color = "#ffffff";
	const { icon, name, symbol, tokenSymbol, lpAddresses, tokenAddresses, pid } = selectedPool;
	const [open, setOpen] = useState(false);
	const [hasUserStaked, setHasUserStaked] = useState(false);
	const [alertType, setAlertType] = useState("info");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertDetails, setAlertDetails] = useState("");
	const closeModal = () => setStakingModalState({ open: false });
	const getERC20Balances = async () => {
		await fetchERC20Balance();
	};
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
				if (value === "0") {
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
				setLpApproved(true);
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
			if (res.amount !== "0") {
				setHasUserStaked(true);
				setStakedBalance(res.amount / config.decimals);
			} else {
				setHasUserStaked(false);
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
				setLpApproved(true);
			} else {
				setLpApproved(false);
			}
		});
	}

	function getLpBalance() {
		LPContract.methods.balanceOf(currentWallet).call(function (err, res) {
			if (err) {
				console.log("An error occured", err);
				return;
			}
			const bal = res / config.decimals;
			setLpBalance(bal);
		});
	}

	// fetch balances once
	useEffect(() => {
		getERC20Balances();
	}, []);

	// fetch latest lpBalance
	useEffect(() => {
		if (lpApproved && lpBalance === "0" && assets && assets.length && assets.length > 0) {
			const balance = assets.filter((item) => item.token_address === LPAddress)[0];
			if (balance) {
				setLpBalance(balance / config.decimals);
			}
		}
	}, [assets, lpApproved, lpBalance]);

	// fetch lpBalance on approval
	useEffect(() => {
		if (!lpApproved) {
			checkApproval();
		} else if (lpApproved) {
			getLpBalance();
		}
	}, [lpApproved]);

	// fetch latest staked balance
	useEffect(() => {
		if (lpApproved && lpBalance > "0" && stakedBalance === "0") {
			fetchStakedBalanceFromMasterChef();
		}
	}, [lpApproved, lpBalance, stakedBalance]);

	// fecth latest reward
	useEffect(() => {
		if (lpApproved && lpBalance > "0" && stakedBalance > "0") {
			MasterContract.methods.pendingSushi(pid, currentWallet).call((err, res) => {
				if (err) {
					console.log("An error occured", err);
					return;
				}
				setReward(web3.utils.fromWei(res));
			});
		}
	}, [lpApproved, lpBalance, stakedBalance]);

	return (
		<Box sx={{ alignItems: "baseline", display: "flex", justifyContent: "center" }}>
			{lpApproved && hasUserStaked && (
				<Card
					sx={{
						width: "32%",
						marginTop: "32px",
						marginRight: "32px",
						height: "100%",
						minHeight: "300px",
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
								💰
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
											maxValue: Number(reward),
											onConfirm: () => {
												Deposit("0");
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
					minHeight: "300px",
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
							{!lpApproved && (
								<Button
									variant="contained"
									sx={{ backgroundColor: "#e84042" }}
									onClick={() => Approval()}
								>
									Approve {symbol}
								</Button>
							)}
							{lpApproved && !hasUserStaked && (
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
												maxValue: Number(lpBalance),
												onConfirm: (value) => {
													Deposit(value);
												},
											});
										}}
									>
										Deposit {symbol}
									</Button>
									<div style={{ marginTop: "16px" }}>
										Balance In Your Wallet : {lpBalance} {symbol}
									</div>
								</>
							)}
						</div>
						{lpApproved && hasUserStaked && (
							<div style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									variant="h5"
									textAlign="center"
									sx={{ fontSize: "32px", color: "#e84042" }}
								>
									{stakedBalance} {symbol} Staked
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
										sx={{ backgroundColor: "#e84042", width: "160px" }}
										onClick={() => {
											setStakingModalState({
												...stakingModalState,
												open: true,
												symbol,
												closeModal,
												title: `Withdraw ${symbol}`,
												maxValue: Number(stakedBalance),
												onConfirm: (value) => {
													withdrawFunds(value);
												},
											});
										}}
									>
										Withdraw
									</Button>
									<Button
										variant="contained"
										sx={{ backgroundColor: "#e84042", width: "160px" }}
										onClick={() => {
											setStakingModalState({
												...stakingModalState,
												open: true,
												symbol,
												closeModal,
												title: `Deposit ${symbol}`,

												onConfirm: (value) => {
													Deposit(value);
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
	lpBalance: state.lpBalance,
	stakedBalance: state.stakedBalance,
	reward: state.reward,
	lpApproved: state.lpApproved,
	stakingModalState: state.stakingModalState,
});

const mapDispatchToProps = {
	setStakedBalance,
	setStakingModalState,
	setLpBalance,
	setLpApproved,
	setReward,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stake);
