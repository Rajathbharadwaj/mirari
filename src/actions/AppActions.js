export const SET_SELECTED_CREATOR = "SET_SELECTED_CREATOR";
export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";
export const SET_STAKED_BALANCE = "SET_STAKED_BALANCE";
export const SET_STAKING_MODAL_STATE = "SET_STAKING_MODAL_STATE";

export const setSelectedCreator = (data) => {
	return {
		type: SET_SELECTED_CREATOR,
		payload: data,
	};
};

export const setWalletAddress = (data) => {
	return {
		type: SET_WALLET_ADDRESS,
		payload: data,
	};
};

export const setStakedBalance = (data) => {
	return {
		type: SET_STAKED_BALANCE,
		payload: data,
	};
};

export const setStakingModalState = (data) => {
	return {
		type: SET_STAKING_MODAL_STATE,
		payload: data,
	};
};
