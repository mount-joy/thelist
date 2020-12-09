import { types } from './reducer';

const getActions = (dispatch) => ({
  setState: (state) => dispatch({ type: types.SET_STATE, data: { state } }),
  switchList: (newIndex) => dispatch({ type: types.SWITCH_LIST, data: { newIndex } }),
  newItem: (text, id) => dispatch({ type: types.NEW_ITEM, data: { text, id, key: `${Date.now()}` } }),
  newList: (name, id) => dispatch({ type: types.NEW_LIST, data: { name, id, key: `${Date.now()}` } }),
  deleteItemByKey: (key) => dispatch({ type: types.DELETE_ITEM_BY_KEY, data: { key } }),
  updateItemByKey: (text, key) => dispatch({ type: types.UPDATE_ITEM_BY_KEY, data: { key, text } }),
  toggleCompletionByKey: (key) => dispatch({ type: types.TOGGLE_COMPLETION_BY_KEY, data: { key } }),
});

export default getActions;
