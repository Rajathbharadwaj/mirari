import React from "react";
import { connect } from "react-redux";
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
import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { setSelectedCreator } from "../../actions/AppActions";

const useStyles = createUseStyles({
	link: {
		textDecoration: "none",
		fontSize: "14px",
		color: "#fff",
		"&:hover": {
			color: "inherit",
		},
	},
});

const Sidebar = ({ channelsList, setSelectedCreator }) => {
	const styles = useStyles();

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
					<NavLink className={styles.link} to={`/creator/${channel.name}`}>
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
							onClick={() => {
								setSelectedCreator({
									creatorName: channel.name,
									avatarSrc: channel.img,
									lpToken: {
										tokenName: channel.tokenName,
										tokenAddress: channel.tokenAddress,
									},
								});
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
					</NavLink>
				))}
			</List>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	channelsList: state.channelsList,
});

const mapDispatchToProps = {
	setSelectedCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
