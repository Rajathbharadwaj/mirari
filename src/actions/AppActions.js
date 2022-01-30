export const SET_SELECTED_CREATOR = "SET_SELECTED_CREATOR";
export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";
export const SET_LP_BALANCE = "SET_LP_BALANCE";
export const SET_REWARD = "SET_REWARD";
export const SET_STAKED_BALANCE = "SET_STAKED_BALANCE";
export const SET_STAKING_MODAL_STATE = "SET_STAKING_MODAL_STATE";
export const SET_LP_APPROVED = "SET_LP_APPROVED";

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

export const setLpBalance = (data) => {
	return {
		type: SET_LP_BALANCE,
		payload: data,
	};
};

export const setReward = (data) => {
	return {
		type: SET_REWARD,
		payload: data,
	};
};

export const setStakingModalState = (data) => {
	return {
		type: SET_STAKING_MODAL_STATE,
		payload: data,
	};
};

export const setLpApproved = (data) => {
	return {
		type: SET_LP_APPROVED,
		payload: data,
	};
};
