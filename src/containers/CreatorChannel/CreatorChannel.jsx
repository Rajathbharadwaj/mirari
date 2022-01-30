import React, { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
// import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Account from "../../components/Account";
import { setSelectedCreator } from "../../actions/AppActions";
import Blank from "../../video-thumbnails/blank.png";
import Stake from "../../components/Stake/Stake";

const ChannelLayout = ({ creatorName, avatarSrc, children }) => (
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
		{children}
	</Grid>
);

const CreatorChannel = ({ selectedCreator, currentWallet, channelsList, selectedPool }) => {
	const { creatorName, avatarSrc } = selectedCreator;
	const { name } = selectedPool;
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
	if (currentWallet === null) {
		return (
			<ChannelLayout creatorName={creatorName} avatarSrc={avatarSrc}>
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
			</ChannelLayout>
		);
	}

	if (currentWallet !== null && name === "") {
		return (
			<ChannelLayout creatorName={creatorName} avatarSrc={avatarSrc}>
				<Grid item xs={12} sx={{ marginTop: "24px" }}>
					<Typography variant="h4" textAlign="center" sx={{ marginTop: "24px" }}>
						No LP Token and Content found for this creator!
						<br />
						Choose another channel from sidebar.
					</Typography>
				</Grid>
			</ChannelLayout>
		);
	}
	if (currentWallet !== null && name !== "") {
		return (
			<ChannelLayout creatorName={creatorName} avatarSrc={avatarSrc}>
				<Grid item xs={12} sx={{ marginTop: "24px" }}>
					<Stake />
					{/* <VideoCardsList videoData={channelVideos} /> */}
				</Grid>
			</ChannelLayout>
		);
	}
};

const mapStateToProps = (state) => ({
	selectedCreator: state.selectedCreator,
	currentWallet: state.currentWallet,
	channelsList: state.channelsList,
	selectedPool: state.selectedPool,
});

const mapDispatchToProps = {
	setSelectedCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorChannel);
