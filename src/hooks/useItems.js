import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

const IDB_KEY = 'items';
const SET_VALUE = 'useItems/SET_VALUE';

const initialState = { items: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VALUE:
      return { items: action.data };
    default:
      throw new Error('Action not recognised');
  }
};

const useItems = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setValue = (newValue) => {
    dispatch({ type: SET_VALUE, data: newValue });
    return set(IDB_KEY, newValue);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        dispatch({ type: SET_VALUE, data: val });
      }
    })();

    return () => { mounted = false; };
  }, []);

  return [state.items, setValue];
};

export default useItems;
