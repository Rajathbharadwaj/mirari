import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
// import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Approval from "../../components/Approval/Approval";
import Withdraw from "../../components/Withdraw/Withdraw";
import Account from "../../components/Account";
import { setSelectedCreator } from "../../actions/AppActions";
import Blank from "../../video-thumbnails/blank.png";
import FullWidthTabs from "../../components/FullWidthTabs/FullWidthTabs";

const CreatorChannel = ({ selectedCreator, currentWallet, channelsList }) => {
	const location = useLocation();
	const { creatorName, avatarSrc } = selectedCreator;
	const tabs = [
		{
			label: "Deposit LP Tokens",
			content: <Approval />,
		},
		{
			label: "Harvest/Withdraw LP Tokens",
			content: <Withdraw />,
		},
	];

	const channelVideos = [
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
	];

	// update selectedCreator on navigation
	useEffect(() => {
		if (location.pathname.split("/")[2]) {
			const creatorFromUrl = decodeURI(location.pathname.split("/")[2]);
			if (creatorFromUrl && creatorName !== creatorFromUrl) {
				const channelObj = channelsList.filter((item) => item.name === creatorFromUrl)[0];
				if (channelObj) {
					setSelectedCreator({
						creatorName: channelObj.name,
						avatarSrc: channelObj.img,
						lpToken: {
							tokenSymbol: channelObj.tokenSymbol,
							tokenAddress: channelObj.tokenAddress,
						},
					});
				}
			}
		}
	}, [location, creatorName, channelsList]);

	return (
		<Grid
			container
			sx={{
				paddingTop: "24px",
				paddingLeft: "64px",
				paddingRight: "64px",
			}}
		>
			<Grid container item xs={12} justifyContent="space-between" alignItems="center">
				<Grid item>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Avatar
							sx={{
								height: 64,
								width: 64,
								marginRight: "18px",
							}}
							src={avatarSrc}
						/>
						<Typography>{creatorName}</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{
						marginRight: "6%",
					}}
				></Grid>
			</Grid>
			<Grid item xs={12} sx={{ marginTop: "24px" }}>
				<Divider variant="fullWidth" sx={{ borderColor: "#c4c4c4" }} />
			</Grid>
			{currentWallet !== null && (
				<Grid item xs={12} sx={{ marginTop: "24px" }}>
					<FullWidthTabs tabs={tabs} />
					{/* <VideoCardsList videoData={channelVideos} /> */}
				</Grid>
			)}
			{currentWallet === null && (
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						marginTop: "120px",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Account />
				</Grid>
			)}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	selectedCreator: state.selectedCreator,
	currentWallet: state.currentWallet,
	channelsList: state.channelsList,
});

const mapDispatchToProps = {
	setSelectedCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorChannel);
