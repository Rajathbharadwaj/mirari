/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Avatar, Grid, Modal, Box, Typography, Divider } from "@mui/material";
import { useEffect } from "react";

const CreateTokenModal = (props) => {
	const { open, handleClose } = props;
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		height: "60vh",
		width: "36vw",
		maxWidth: "600px",
		backgroundColor: "#2e2e2e",
		color: "#c4c4c4",
		boxShadow: 24,
		textAlign: "center",
		p: 4,
	};
	const inputStyle = {
		color: "#c4c4c4",
		width: 167,
		borderBottom: "2px solid #c4c4c4",
		":after": {
			display: "none",
		},
	};
	const [channelImage, setChannelImage] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileUpload = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const filesArr = Array.from(e.target.files);
		const reader = new FileReader();
		reader.onloadend = () => {
			setChannelImage(reader.result);
		};
		reader.readAsDataURL(filesArr[0]);
	};

	useEffect(() => {
		const fileInput = document.getElementById("channel-image");
		if (open && fileInput) {
			// bind listeners
			fileInput.addEventListener("change", handleFileUpload);
		}
	}, [open]);

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Typography id="transition-modal-title" variant="h4">
					Create Token
				</Typography>
				<Divider sx={{ borderColor: "#c4c4c4" }} />
				<Grid
					container
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginTop: "16px",
					}}
				>
					<Grid
						item
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							paddingTop: "16px",
						}}
					>
						<Avatar
							src={channelImage}
							sx={{
								height: 64,
								width: 64,
								":hover": {
									cursor: "pointer",
								},
							}}
							onClick={() => fileInputRef.current.click()}
						/>
						<input
							type="file"
							id="channel-image"
							onChange={handleFileUpload}
							ref={fileInputRef}
							style={{ display: "none" }}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="name"
							label="Token Name"
							type="text"
							fullWidth
							variant="standard"
							InputProps={{
								style: inputStyle,
							}}
							InputLabelProps={{
								style: {
									color: "#c4c4c4",
								},
							}}
						/>
					</Grid>
					<Grid item sx={{ marginTop: "16px" }}>
						<TextField
							id="name"
							label="Token Symbol"
							type="text"
							fullWidth
							variant="standard"
							InputProps={{
								style: inputStyle,
							}}
							InputLabelProps={{
								style: {
									color: "#c4c4c4",
								},
							}}
							inputProps={{
								style: {
									textTransform: "uppercase",
								},
							}}
						/>
					</Grid>
					<Grid item sx={{ marginTop: "16px" }}>
						<TextField
							id="name"
							label="Total Tokens To Mint"
							type="number"
							fullWidth
							variant="standard"
							InputProps={{
								style: inputStyle,
							}}
							inputProps={{
								min: 0,
								max: 10000,
							}}
							InputLabelProps={{
								style: {
									color: "#c4c4c4",
								},
							}}
						/>
					</Grid>
					<Grid item sx={{ marginTop: "16px" }}>
						<Typography sx={{ fontSize: "12px", fontWeight: 900 }}>
							Total Price: 12.233 AVAX
						</Typography>
					</Grid>
					<Grid item sx={{ marginTop: "16px" }}>
						<Button
							size="large"
							sx={{
								background: "#e84142",
								color: "#c4c4c4",
								":hover": {
									backgroundColor: "#e84142",
									filter: "drop-shadow(2px 4px 6px black)",
								},
							}}
							onClick={handleClose}
						>
							Confirm
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
};

export default CreateTokenModal;
