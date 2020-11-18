import createItem from '../../api/createItem';
import deleteItem from '../../api/deleteItem';
import getItems from '../../api/getItems';
import updateItem from '../../api/updateItem';

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
        deleteItem(state.listId, itemToRemove.id);
      }
      break;
    }

    case types.UPDATE_ITEM_BY_KEY: {
      const state = getState();
      const itemToUpdate = state.items.find((item) => item.key === data.key);
      if (itemToUpdate) {
        updateItem(state.listId, itemToUpdate.id, data.text);
      }
      break;
    }

    case types.NEW_ITEM: {
      const { key, text } = data;
      const state = getState();
      createItem(state.listId, text)
        .then((id) => dispatch({ type: types.STORE_ID, data: { key, id } }));
      break;
    }

    case types.SET_LIST_ID: {
      if (!data.listId) return;
      getItems(data.listId)
        .then((items) => dispatch({ type: types.MERGE_ITEMS, data: { items } }));
      break;
    }

    default:
  }

  dispatch(action);
};

export default applyMiddleware;
