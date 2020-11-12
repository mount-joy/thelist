import { types } from './reducer';

const useActions = (dispatch) => ({
  setListId: (listId) => dispatch({ type: types.SET_LIST_ID, data: { listId } }),
  setItems: (items) => dispatch({ type: types.SET_ITEMS, data: { items } }),
  newItem: (text, id) => dispatch({ type: types.NEW_ITEM, data: { text, id, key: Date.now() } }),
  deleteItemByKey: (key) => dispatch({ type: types.DELETE_ITEM_BY_KEY, data: { key } }),
  updateItemByKey: (key) => dispatch({ type: types.UPDATE_ITEM_BY_KEY, data: { key } }),
  storeId: (key, id) => dispatch({ type: types.STORE_ID, data: { key, id } }),
});

export default useActions;
