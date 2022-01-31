import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

const VideoCard = (props) => {
	const { imgSrc, content, altTag } = props;
	return (
		<Card
			sx={{
				maxWidth: 345,
				height: "260px",
				":hover": {
					cursor: "pointer",
					boxShadow: "0 10px 10px #c4c4c4",
				},
			}}
		>
			<CardMedia component="img" image={imgSrc} alt={altTag} />
			{content && (
				<CardContent>
					<Typography>{content}</Typography>
				</CardContent>
			)}
		</Card>
	);
};

export default VideoCard;
