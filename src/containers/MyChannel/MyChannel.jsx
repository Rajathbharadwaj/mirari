import React, { useState } from "react";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import VideoCardsList from "containers/VideoCardsList/VideoCardsList";
import Blank from "../../video-thumbnails/blank.png";
import CreateTokenModal from "containers/CreateTokenModal/CreateTokenModal";

const MyChannel = (props) => {
	const { address } = props;
	const [open, setOpen] = useState(false);

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
						/>
						<Typography>
							{address.slice(0, 6)}...{address.slice(36)}
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{
						marginRight: "6%",
					}}
				>
					<Button
						size="large"
						variant="contained"
						style={{
							background: "#e84142",
							color: "#fff",
						}}
						onClick={() => setOpen(true)}
					>
						Create Token
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={12} sx={{ marginTop: "24px" }}>
				<Divider variant="fullWidth" sx={{ borderColor: "#c4c4c4" }} />
			</Grid>
			<Grid item sx={{ marginTop: "24px" }}>
				<VideoCardsList videoData={channelVideos} />
			</Grid>
			<CreateTokenModal open={open} handleClose={() => setOpen(false)} />
		</Grid>
	);
};

export default MyChannel;
