import { SELECT_SCROLL_FOR_UPGRADE } from "../types";

export const selectScrollForUpgrade = (dispatch, payload) => {
  try {
    dispatch({ type: SELECT_SCROLL_FOR_UPGRADE, payload });
  } catch (err) {
    return err;
  }
};
