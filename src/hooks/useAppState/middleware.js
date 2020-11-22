import createItem from '../../api/createItem';
import createList from '../../api/createList';
import deleteItem from '../../api/deleteItem';
import getItems from '../../api/getItems';
import updateItem from '../../api/updateItem';

import { types } from './reducer';
import { selectItems, selectListId } from './selectors';

const applyMiddleware = (dispatch, getState) => (action) => {
  const { type, data } = action;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log({ type }, { data });
  }

  switch (type) {
    case types.DELETE_ITEM_BY_KEY: {
      const state = getState();
      const itemToRemove = selectItems(state).find((item) => item.key === data.key);
      if (itemToRemove) {
        deleteItem(selectListId(state), itemToRemove.id);
      }
      break;
    }

    case types.UPDATE_ITEM_BY_KEY: {
      const state = getState();
      const itemToUpdate = selectItems(state).find((item) => item.key === data.key);
      if (itemToUpdate) {
        updateItem(selectListId(state), itemToUpdate.id, data.text);
      }
      break;
    }

    case types.NEW_ITEM: {
      const { key, text } = data;
      const state = getState();
      createItem(selectListId(state), text)
        .then((id) => dispatch({ type: types.STORE_ID, data: { key, id } }));
      break;
    }

    case types.SET_STATE: {
      const lists = data.state?.lists ?? [];
      if (lists?.length === 0) {
        const name = 'Shopping List';
        const key = `${Date.now()}`;
        dispatch({ type: types.NEW_LIST, data: { key, name } });
        createList(name)
          .then((id) => dispatch({ type: types.STORE_LIST_ID, data: { key, id } }));
      } else {
        lists.forEach(({ id }) => {
          getItems(id)
            .then((items) => dispatch({ type: types.MERGE_ITEMS, data: { items, listId: id } }));
        });
      }
      break;
    }

    default:
  }

  dispatch(action);
};

export default applyMiddleware;
