import React from "react";
import { Grid } from "@mui/material";
import VideoCard from "components/VideoCard/VideoCard";
import Ama from "../../video-thumbnails/ama.png";
import AvaxTutorial from "../../video-thumbnails/avax-tutorial.png";
import Crabada from "../../video-thumbnails/crabada.png";
import Influencer from "../../video-thumbnails/crypto-influencer.png";
import Imperium from "../../video-thumbnails/imperium.png";
import DownBad from "../../video-thumbnails/influencer-lol.png";
import Infura from "../../video-thumbnails/infura.png";
import NftBro from "../../video-thumbnails/nft-influencer.png";
import Ultra from "../../video-thumbnails/ultra.png";

const VideoCardsList = (props) => {
	const { videoData } = props;
	const videos = videoData
		? videoData
		: [
				{
					imgSrc: Influencer,
					altTag: "Crypto Influencer reveals 1000x Alt coins",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: Infura,
					altTag: "Infura Alternative",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: NftBro,
					altTag: "Nfts holy shit!!!",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: Ama,
					altTag: "Spell AMA with Daniele Siesta",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: DownBad,
					altTag: "Oh No! Whales are dumping!!",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: AvaxTutorial,
					altTag: "Avax Tutorial",
					content: "Watch this video to earn 10 WTE tokens",
				},
				{
					imgSrc: Crabada,
					altTag: "Crabada Overview",
					content: "Watch this video to earn 10 WTE tokens",
				},

				{
					imgSrc: Imperium,
					altTag: "Imperium IGO Overview",
					content: "Watch this video to earn 10 WTE tokens",
				},

				{
					imgSrc: Ultra,
					altTag: "Ultra CEO interview",
					content: "Watch this video to earn 10 WTE tokens",
				},
		  ];
	return (
		<Grid
			container
			spacing={{
				xs: 2,
				md: 3,
			}}
			sx={{
				marginLeft: "0!important",
			}}
			justifyContent="flex-start"
			alignItems="baseline"
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{videos.map((video, index) => (
				<Grid item key={index}>
					<VideoCard
						imgSrc={video.imgSrc}
						altTag={video.altTag}
						content={video.content ? video.content : null}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default VideoCardsList;
