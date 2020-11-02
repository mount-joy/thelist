/* eslint-disable no-console */
import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import useUpdateEffect from './useUpdateEffect';
import apiDeleteItem from '../api/apiDeleteItem';
import apiCreateItem from '../api/apiCreateItem';
import apiGetItems from '../api/apiGetItems';

const IDB_KEY = 'items';
const LIST_ID = '5f6765d5-d9d3-4fb3-8344-718ddd83ed9f';

const SET_VALUE = 'useItems/SET_VALUE';
const NEW_VALUE = 'useItems/NEW_VALUE';
const DELETE_VALUE_BY_KEY = 'useItems/DELETE_VALUE_BY_KEY';
const DELETE_VALUE_BY_ID = 'useItems/DELETE_VALUE_BY_ID';
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

    case DELETE_VALUE_BY_ID:
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, data: newValue });
  };

  const newItem = (text, id = undefined) => {
    dispatch({ type: NEW_VALUE, data: { text, id } });
  };

  const deleteItem = (key) => {
    const itemToRemove = state.items.find((item) => item.key === key);
    if (itemToRemove) {
      apiDeleteItem(LIST_ID, itemToRemove.id);
    }
    dispatch({ type: DELETE_VALUE_BY_KEY, data: { key } });
  };

  const deleteItemById = (id) => {
    apiDeleteItem(LIST_ID, id);
    dispatch({ type: DELETE_VALUE_BY_ID, data: { id } });
  };

  const storeId = (key, id) => {
    dispatch({ type: STORE_ID, data: { key, id } });
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        console.log('localVal', val);
        setValue(val);
      }
      const knownIds = new Set(val ? val.map(({ id }) => id) : []);
      const remoteVal = await apiGetItems(LIST_ID);
      console.log('knownIds', knownIds);
      console.log('remoteVal', remoteVal);
      remoteVal.forEach((item) => {
        if (knownIds.has(item.id)) {
          knownIds.delete(item.id);
        } else {
          newItem(item.text, item.id);
        }
      });
      console.log('remove', knownIds);
      knownIds.forEach((id) => deleteItemById(id));
    })();

    return () => { mounted = false; };
  }, []);

  useUpdateEffect(() => {
    console.log('items changed', state.items);
    (async () => {
      const items = await Promise.all(state.items.map(async (item) => {
        if (item.id) {
          return item;
        }
        const id = await apiCreateItem(LIST_ID, item.text);
        storeId(item.key, id);
        return {
          ...item,
          id,
        };
      }));
      console.log(items);
      set(IDB_KEY, items);
    })();
  }, [state.items]);

  return [state.items, newItem, deleteItem];
};

export default useItems;
