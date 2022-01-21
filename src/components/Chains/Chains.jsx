import { useEffect, useState } from "react";
import useChain from "hooks/useChain";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Box, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { AvaxLogo, ETHLogo } from "./Logos";

const styles = {
	item: {
		display: "flex",
		alignItems: "center",
		height: "42px",
		fontWeight: "500",
		fontFamily: "Roboto, sans-serif",
		fontSize: "14px",
		padding: "0 10px",
	},
	form: {
		border: "2px solid rgb(231, 234, 243)",
		borderRadius: "12px",
	},
};

const menuItems = [
	{
		key: "0xa86a",
		value: "Avalanche",
		icon: <AvaxLogo />,
	},
	{
		key: "0x3",
		value: "Ropsten",
		icon: <ETHLogo />,
	},
	{
		key: "0xa869",
		value: "Fuji",
		icon: <AvaxLogo />,
	},
];

function Chains() {
	const { switchNetwork } = useChain();
	const { chainId } = useMoralisDapp();
	const [selected, setSelected] = useState({});

	useEffect(() => {
		const newSelected = menuItems.find((item) => item.key === chainId);
		setSelected(newSelected);
		console.log("current chainId: ", chainId);
	}, [chainId]);

	const handleMenuClick = (event) => {
		const value = event.target.value;
		console.log("switch to: ", value.value);
		setSelected(value);
		switchNetwork(value.key);
	};

	return (
		<Select
			labelId="network-select-label"
			id="network-select"
			value={selected}
			placeholder="Select Network"
			onChange={handleMenuClick}
			sx={{
				width: "100%",
				border: "1px solid white",
				color: "white",
			}}
		>
			{menuItems.map((item) => (
				<MenuItem value={item} key={item.key} style={styles.item}>
					<span>{item.icon}</span>
					<span style={{ marginLeft: "5px" }}>{item.value}</span>
				</MenuItem>
			))}
		</Select>
	);
}

export default Chains;
