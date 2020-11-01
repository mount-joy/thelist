import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import useUpdateEffect from './useUpdateEffect';

const IDB_KEY = 'items';
const SET_VALUE = 'useItems/SET_VALUE';
const NEW_VALUE = 'useItems/NEW_VALUE';
const DELETE_VALUE = 'useItems/DELETE_VALUE';

const initialState = { items: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VALUE:
      return { items: action.data };
    case NEW_VALUE: {
      const newItem = { text: action.data.text, key: Date.now() };
      return { items: [...state.items, newItem] };
    }
    case DELETE_VALUE:
      return { items: state.items.filter(({ key }) => key !== action.data.key) };
    default:
      throw new Error('Action not recognised');
  }
};

const useItems = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, data: newValue });
  };

  const newItem = (text) => {
    dispatch({ type: NEW_VALUE, data: { text } });
  };

  const deleteItem = (key) => {
    dispatch({ type: DELETE_VALUE, data: { key } });
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
    // eslint-disable-next-line no-console
    console.log('items changed', state.items);
    set(IDB_KEY, state.items);
  }, [state.items]);

  return [state.items, newItem, deleteItem];
};

export default useItems;
