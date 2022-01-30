import {
	SET_SELECTED_CREATOR,
	SET_STAKED_BALANCE,
	SET_WALLET_ADDRESS,
	SET_STAKING_MODAL_STATE,
	SET_LP_BALANCE,
	SET_REWARD,
	SET_LP_APPROVED,
} from "../actions/AppActions";
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
	selectedPool: {
		pid: 0,
		lpAddresses: null,
		tokenAddresses: null,
		name: "",
		symbol: "",
		tokenSymbol: "",
		icon: "",
	},
	lpBalance: "0",
	stakedBalance: "0",
	reward: "0",
	lpApproved: false,
	stakingModalState: {
		open: false,
		closeModal: () => {},
		title: "",
		maxValue: "0",
		symbol: "",
		onConfirm: () => {},
	},
};

const setSelectedPool = (payload, state) => {
	const correctPool = state.pools.filter((item) => item.tokenSymbol === payload.tokenSymbol)[0];
	if (correctPool) {
		return correctPool;
	} else {
		return initialState.selectedPool;
	}
};

const appReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_SELECTED_CREATOR:
			return {
				...state,
				selectedCreator: payload,
				selectedPool: setSelectedPool(payload, state),
				lpBalance: "0",
				reward: "0",
				stakedBalance: "0",
				lpApproved: false,
				stakingModalState: { ...initialState.stakingModalState },
			};
		case SET_WALLET_ADDRESS:
			return {
				...state,
				currentWallet: payload,
			};
		case SET_STAKED_BALANCE:
			return {
				...state,
				stakedBalance: payload,
			};
		case SET_LP_BALANCE:
			return {
				...state,
				lpBalance: payload,
			};
		case SET_REWARD:
			return {
				...state,
				reward: payload,
			};
		case SET_LP_APPROVED:
			return {
				...state,
				lpApproved: payload,
			};
		case SET_STAKING_MODAL_STATE:
			return {
				...state,
				stakingModalState: {
					...state.stakingModalState,
					...payload,
				},
			};
		default:
			return state;
	}
};

export default appReducer;
