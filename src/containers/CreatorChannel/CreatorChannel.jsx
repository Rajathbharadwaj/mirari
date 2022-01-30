/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import VideoCardsList from "../../containers/VideoCardsList/VideoCardsList";
import Account from "../../components/Account";
import { setSelectedCreator } from "../../actions/AppActions";
import Blank from "../../video-thumbnails/blank.png";
import Stake from "../../components/Stake/Stake";
import HundredX from "../../video-thumbnails/100x.png";
import Tech22 from "../../video-thumbnails/2022tech.png";
import Bubbles from "../../video-thumbnails/bubbles.png";
import Future from "../../video-thumbnails/future.png";
import Gainz from "../../video-thumbnails/gainz.png";
import OnePlus from "../../video-thumbnails/OnePlus10Pro.png";

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

const CreatorChannel = ({
	selectedCreator,
	currentWallet,
	channelsList,
	hasUserStaked,
	selectedPool,
}) => {
	const { creatorName, avatarSrc } = selectedCreator;
	const { name } = selectedPool;
	const [channelVideos, setChannelVidoes] = useState([
		{
			imgSrc: Blank,
			altTag: "no video",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "",
			content: "",
		},
		{
			imgSrc: Blank,
			altTag: "",
			content: "",
		},
	]);
	const beckerVideos = [
		{
			imgSrc: Gainz,
			altTag: "These 5 NEW NFTs Will 50x Next Week (HUGE DROP LIST)",
			content: "These 5 NEW NFTs Will 50x Next Week (HUGE DROP LIST)",
		},
		{
			imgSrc: Future,
			altTag: "Why I Only Invest In Crypto Gaming",
			content: "Why I Only Invest In Crypto Gaming",
		},
		{
			imgSrc: HundredX,
			altTag: "Easy 100x",
			content: "Easy 100x",
		},
	];
	const mkbhdVideos = [
		{
			imgSrc: <Tech22 />,
			altTag: "2022 Tech",
			content: "2022 Tech I'm Ready For",
		},
		{
			imgSrc: <Bubbles />,
			altTag: "Blue Bubbles vs Green Bubbles: Explained",
			content: "Blue Bubbles vs Green Bubbles: Explained",
		},
		{
			imgSrc: <OnePlus />,
			altTag: "OnePlus 10 Pro Impressions: What Happened?",
			content: "OnePlus 10 Pro Impressions: What Happened?",
		},
	];

	useEffect(() => {
		if (creatorName === "Marques Brownlee") {
			setChannelVidoes(mkbhdVideos);
		} else if (creatorName === "Alex Becker") {
			setChannelVidoes(beckerVideos);
		}
	}, [creatorName]);

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
					<br />
					{hasUserStaked && <VideoCardsList videoData={channelVideos} />}
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
	hasUserStaked: state.hasUserStaked,
});

const mapDispatchToProps = {
	setSelectedCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorChannel);
