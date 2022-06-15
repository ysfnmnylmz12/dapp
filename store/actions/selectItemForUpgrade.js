import { SELECT_ITEM_FOR_UPGRADE } from "../types";

export const selectItemForUpgrade = (dispatch, payload) => {
  try {
    dispatch({ type: SELECT_ITEM_FOR_UPGRADE, payload });
  } catch (err) {
    return err;
  }
};
