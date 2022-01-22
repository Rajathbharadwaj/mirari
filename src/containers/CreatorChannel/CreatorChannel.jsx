import React, { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Approval from "../../components/Approval/Approval";
import Blank from "../../video-thumbnails/blank.png";

const CreatorChannel = ({ selectedCreator }) => {
	const { creatorName, lpToken, avatarSrc } = selectedCreator;
	const { tokenName, tokenAddress } = lpToken;

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
			<Grid item xs={12} sx={{ marginTop: "24px" }}>
				<Approval />
				{/* <VideoCardsList videoData={channelVideos} /> */}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	selectedCreator: state.selectedCreator,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CreatorChannel);
