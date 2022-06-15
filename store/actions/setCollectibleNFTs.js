import { SET_COLLECTIBLE_NFTs } from "../types";

export const setCollectibleNFTs = (dispatch, payload) => {
  try {
    dispatch({ type: SET_COLLECTIBLE_NFTs, payload });
  } catch (err) {
    return err;
  }
};
