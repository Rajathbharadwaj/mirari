import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

const StakingModal = ({ open, closeModal, title, value, setValue, symbol, onConfirm }) => {
	const handleClose = () => {
		closeModal(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Box sx={{ width: "500px", height: "250px", backgroundColor: "#222222", color: "#e84042" }}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<TextField
						id="mytext1"
						onChange={(e) => {
							const val = e.target.value.replace(/\D/, "");
							setValue(val);
						}}
						placeholder="0"
						value={value}
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						InputProps={{
							sx: {
								color: "#e84042",
								backgroundColor: "#2e2e2e",
							},
							endAdornment: (
								<Button variant="text" sx={{ width: "100%" }} onClick={() => setValue(value)}>
									Withdraw Max {symbol.replace("LP", "")}
								</Button>
							),
						}}
						sx={{ marginTop: "16px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Box
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: "space-evenly",
						}}
					>
						<Button
							variant="contained"
							sx={{ backgroundColor: "#e84042", width: "200px" }}
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							sx={{ backgroundColor: "#e84042", width: "200px" }}
							onClick={() => {
								onConfirm();
							}}
						>
							Confirm
						</Button>
					</Box>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default StakingModal;
