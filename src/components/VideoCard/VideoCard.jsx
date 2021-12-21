import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

const VideoCard = (props) => {
	const { imgSrc, content, altTag } = props;
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia component="img" image={imgSrc} alt={altTag} />
			<CardContent>
				<Typography>{content}</Typography>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
