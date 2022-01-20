export const SET_SELECTED_CREATOR = "SET_SELECTED_CREATOR";
export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";

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
