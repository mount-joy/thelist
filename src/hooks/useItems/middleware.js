import apiCreateItem from '../../api/apiCreateItem';
import apiDeleteItem from '../../api/apiDeleteItem';
import apiGetItems from '../../api/apiGetItems';

import { types } from './reducer';

const applyMiddleware = (dispatch, getState) => (action) => {
  const { type, data } = action;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log({ type }, { data });
  }

  switch (type) {
    case types.DELETE_ITEM_BY_KEY: {
      const state = getState();
      const itemToRemove = state.items.find((item) => item.key === data.key);
      if (itemToRemove) {
        apiDeleteItem(state.listId, itemToRemove.id);
      }
      break;
    }

    case types.NEW_ITEM: {
      const { key, text } = data;
      const state = getState();
      apiCreateItem(state.listId, text)
        .then((id) => dispatch({ type: types.STORE_ID, data: { key, id } }));
      break;
    }

    case types.SET_LIST_ID: {
      if (!data.listId) return;
      apiGetItems(data.listId)
        .then((items) => dispatch({ type: types.MERGE_ITEMS, data: { items } }));
      break;
    }

    default:
  }

  dispatch(action);
};

export default applyMiddleware;
