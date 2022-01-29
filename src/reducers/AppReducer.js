import { SET_SELECTED_CREATOR, SET_WALLET_ADDRESS } from "../actions/AppActions";
import supportedPools from "../contracts/supportedPools";
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
			tokenSymbol: "MRLS",
		},
		{
			img: AvalancheOfficial,
			name: "Avalanche",
			live: false,
			tokenSymbol: "",
		},
		{
			img: MKBHD,
			name: "Marques Brownlee",
			live: true,
			tokenSymbol: "MRKS",
		},
		{
			img: Avalaunch,
			name: "Avalaunch",
			live: false,
			tokenSymbol: "",
		},
		{
			img: AlexBecker,
			name: "Alex Becker",
			live: true,
			tokenSymbol: "ABEKR",
		},
		{
			img: FrogRadio,
			name: "Frog Radio",
			live: false,
			tokenSymbol: "",
		},
		{
			img: CryptoCred,
			name: "Crypto Cred",
			live: true,
			tokenSymbol: "",
		},
		{
			img: TheDefiant,
			name: "The Defiant",
			live: false,
			tokenSymbol: "",
		},
	],
	selectedCreator: {
		creatorName: "",
		avatarSrc: "",
		tokenSymbol: "",
	},
	pools: supportedPools,
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
