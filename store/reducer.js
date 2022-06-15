import * as types from "./types";

export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_CONTRACT":
      return { ...state, contract: payload };
    case types.SET_ITEMS:
      return { ...state, ItemList: { ...state.ItemList, ...payload } };
    case types.SET_ITEMS:
      return {
        ...state,
        ItemList: { ...state.ItemList, Collectibles: { ...state.ItemList.Collectibles, ...payload } },
      };
    case types.SELECT_ITEM_FOR_UPGRADE:
      return { ...state, UpgradeTable: { ...state.UpgradeTable, item: payload } };
    case types.SELECT_SCROLL_FOR_UPGRADE:
      return { ...state, UpgradeTable: { ...state.UpgradeTable, scroll: payload } };
    default:
      return state;
  }
}
