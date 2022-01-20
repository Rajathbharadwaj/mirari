export const SET_SELECTED_CREATOR = "SET_SELECTED_CREATOR";

export const setSelectedCreator = (data) => {
	return {
		type: SET_SELECTED_CREATOR,
		payload: data,
	};
};
