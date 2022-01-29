import BigNumber from "bignumber.js";

const config = {
	rinkeby: {
		MasterChef: "0x10c2CB822a5c9B130a59BeCc1607598710073307",
		Router: "0xF2AE55c9469B48823Be119976e6606A6aA1DB3b2",
		Factory: "0xaF615e38574F46E4185b1B25CD8274f173113A08",
		networks: 3,
	},
	fuji: {
		MasterChef: "0xabBfe036805e2876e74B15F80B4E455802ac57aA",
		Router: "0xf9547b35e36B1C7e2D12CC8a65c33666e03C19A9",
		Factory: "0xc149fCDD8Aa4E8D7b9DAD5B1844441aE08473c3a",
		JLP: "0x98d8BDF64d5e49196c0fE1CBA337807D211d323a",
		DapperTest: "0x78C1d411fbEe31a9FAF548F3392b9A7623b3a1cB",
		DapperLP: "0x615c111c012b0f56b3ee0fb058882dbbcb045443",
		W2E: "0xCc4fC4DB88792F8be63454d3AAF71F34559203B5",
		NFTMarket: "0xc46092531E0159392B31E4149C3f27C4bE71dAD1",
		NFTContent: "0x46c5ae5e3609f6B164831684CF73146D22BE45b7",
		networks: 43113,
		pid: 0,
	},
	avax: {
		MasterChef: "",
		Router: "",
		Factory: "",
		networks: 43114,
	},
	approve: BigNumber(100000000000000000000000000000000000),
	decimal: 35,
	decimals: BigNumber(1000000000000000000),
};

export default config;
