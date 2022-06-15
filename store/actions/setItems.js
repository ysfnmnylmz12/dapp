import { SET_ITEMS } from "../types";

export const setItems = (dispatch, payload) => {
  try {
    dispatch({ type: SET_ITEMS, payload });
  } catch (err) {
    return err;
  }
};
