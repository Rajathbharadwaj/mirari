import { SET_SELECTED_CREATOR, SET_WALLET_ADDRESS } from "../actions/AppActions";
import AvalancheOfficial from "../avatars/avalanche.jpeg";
import Avalaunch from "../avatars/avalaunch.jpeg";
import AlexBecker from "../avatars/becker.jpeg";
import CryptoCred from "../avatars/cred.jpeg";
import TheDefiant from "../avatars/defiant.jpeg";
import FrogRadio from "../avatars/frog-radio.jpeg";
import MKBHD from "../avatars/mkbhd.jpeg";
import MoralisWeb3 from "../avatars/moralis.jpeg";

const initialState = {
	channelsList: [
		{
			img: MoralisWeb3,
			name: "Moralis Web 3",
			live: true,
			tokenName: "MKBHD-AVAX LP",
			tokenAddress: "",
		},
		{
			img: AvalancheOfficial,
			name: "Avalanche",
			live: false,
			tokenName: "MKBHD-AVAX LP",
			tokenAddress: "",
		},
		{
			img: MKBHD,
			name: "Marques Brownlee",
			live: true,
			tokenName: "MKBHD-AVAX LP",
			tokenAddress: "",
		},
		{
			img: Avalaunch,
			name: "Avalaunch",
			live: false,
			tokenName: "MKBHD-AVAX LP",
			tokenAddress: "",
		},
		{
			img: AlexBecker,
			name: "Alex Becker",
			live: true,
			tokenName: "Becker-AVAX LP",
			tokenAddress: "",
		},
		{
			img: FrogRadio,
			name: "Frog Radio",
			live: false,
			tokenName: "FrogNation-AVAX LP",
			tokenAddress: "",
		},
		{
			img: CryptoCred,
			name: "Crypto Cred",
			live: true,
			tokenName: "CRED-AVAX LP",
			tokenAddress: "",
		},
		{
			img: TheDefiant,
			name: "The Defiant",
			live: false,
			tokenName: "MKBHD-AVAX LP",
			tokenAddress: "",
		},
	],
	selectedCreator: {
		creatorName: "",
		avatarSrc: "",
		lpToken: {
			tokenName: "",
			tokenAddress: "",
		},
	},
	currentWallet: null,
};

const appReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_SELECTED_CREATOR:
			return {
				...state,
				selectedCreator: payload,
			};
		case SET_WALLET_ADDRESS:
			return {
				...state,
				currentWallet: payload,
			};
		default:
			return state;
	}
};

export default appReducer;
