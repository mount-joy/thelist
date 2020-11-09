import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import useListId from './useListId';
import useUpdateEffect from './useUpdateEffect';
import apiDeleteItem from '../api/apiDeleteItem';
import apiCreateItem from '../api/apiCreateItem';

const IDB_KEY = 'items';

const SET_VALUE = 'useItems/SET_VALUE';
const NEW_VALUE = 'useItems/NEW_VALUE';
const DELETE_VALUE_BY_KEY = 'useItems/DELETE_VALUE_BY_KEY';
const STORE_ID = 'useItems/STORE_ID';

const initialState = { items: [] };

const reducer = (state, { type, data }) => {
  switch (type) {
    case SET_VALUE:
      return { items: data };

    case NEW_VALUE: {
      const newItem = { text: data.text, id: data.id, key: Date.now() };
      return { items: [...state.items, newItem] };
    }
    case DELETE_VALUE_BY_KEY:
      return { items: state.items.filter(({ key }) => key !== data.key) };

    case STORE_ID: {
      const items = state.items.map((item) => {
        if (item.key !== data.key) {
          return item;
        }
        return {
          ...item,
          id: data.id,
        };
      });
      return { items };
    }

    default:
      throw new Error('Action not recognised');
  }
};

const useItems = () => {
  const listId = useListId();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, data: newValue });
  };

  const newItem = (text, id = undefined) => {
    dispatch({ type: NEW_VALUE, data: { text, id } });
  };

  const deleteItemByKey = (key) => {
    const itemToRemove = state.items.find((item) => item.key === key);
    if (itemToRemove) {
      apiDeleteItem(listId, itemToRemove.id);
    }
    dispatch({ type: DELETE_VALUE_BY_KEY, data: { key } });
  };

  const storeId = (key, id) => {
    dispatch({ type: STORE_ID, data: { key, id } });
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        setValue(val);
      }
    })();

    return () => { mounted = false; };
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const items = await Promise.all(state.items.map(async (item) => {
        if (item.id) {
          return item;
        }
        const id = await apiCreateItem(listId, item.text);
        storeId(item.key, id);
        return {
          ...item,
          id,
        };
      }));
      set(IDB_KEY, items);
    })();
  }, [state.items]);

  return [state.items, newItem, deleteItemByKey];
};

export default useItems;
