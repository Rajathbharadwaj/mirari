import React from "react";
import {
	Box,
	Divider,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	ListItemIcon,
} from "@mui/material";
import AvalancheOfficial from "../../avatars/avalanche.jpeg";
import Avalaunch from "../../avatars/avalaunch.jpeg";
import AlexBecker from "../../avatars/becker.jpeg";
import CryptoCred from "../../avatars/cred.jpeg";
import TheDefiant from "../../avatars/defiant.jpeg";
import FrogRadio from "../../avatars/frog-radio.jpeg";
import MKBHD from "../../avatars/mkbhd.jpeg";
import MoralisWeb3 from "../../avatars/moralis.jpeg";

const Sidebar = () => {
	const channelsList = [
		{
			img: MoralisWeb3,
			name: "Moralis Web 3",
			live: true,
		},
		{
			img: AvalancheOfficial,
			name: "Avalanche",
			live: false,
		},
		{
			img: MKBHD,
			name: "Marques Brownlee",
			live: true,
		},
		{
			img: Avalaunch,
			name: "Avalaunch",
			live: false,
		},
		{
			img: AlexBecker,
			name: "Alex Becker",
			live: true,
		},
		{
			img: FrogRadio,
			name: "Frog Radio",
			live: false,
		},
		{
			img: CryptoCred,
			name: "Crypto Cred",
			live: true,
		},
		{
			img: TheDefiant,
			name: "The Defiant",
			live: false,
		},
	];

	return (
		<Box
			sx={{
				position: "fixed",
				top: "88px",
				left: 0,
				bottom: 0,
				display: "flex",
				width: "150px",
				background: "#2e2e2e",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<Divider variant="middle" sx={{ borderColor: "#c4c4c4" }} />
			<Typography align="center" sx={{ fontSize: "12px", paddingTop: "12px" }}>
				Followed Channels
			</Typography>
			<List>
				{channelsList.map((channel) => (
					<ListItem
						key={channel.img}
						sx={{
							":hover": {
								cursor: "pointer",
								border: "1px solid #c4c4c4",
								borderRadius: "8%",
								backdropFilter: "brightness(0.1)",
							},
						}}
					>
						<ListItemAvatar>
							<Avatar src={channel.img} />
						</ListItemAvatar>
						<ListItemText
							sx={{
								"& .MuiTypography-root": { fontSize: "12px" },
							}}
							primary={channel.name}
						/>
						{channel.live && (
							<ListItemIcon>
								<div
									style={{
										position: "absolute",
										top: "42%",
										left: "84%",
										display: "block",
										width: "8px",
										height: "8px",
										borderRadius: "50%",
										background: "#E84042",
									}}
								></div>
							</ListItemIcon>
						)}
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
