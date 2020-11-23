import { types } from './reducer';

const getActions = (dispatch) => ({
  setListId: (listId) => dispatch({ type: types.SET_LIST_ID, data: { listId } }),
  setItems: (items) => dispatch({ type: types.SET_ITEMS, data: { items } }),
  newItem: (text, id) => dispatch({ type: types.NEW_ITEM, data: { text, id, key: `${Date.now()}` } }),
  deleteItemByKey: (key) => dispatch({ type: types.DELETE_ITEM_BY_KEY, data: { key } }),
  updateItemByKey: (text, key) => dispatch({ type: types.UPDATE_ITEM_BY_KEY, data: { key, text } }),
  toggleCompletionByKey: (key) => dispatch({ type: types.TOGGLE_COMPLETION_BY_KEY, data: { key } }),
});

export default getActions;
