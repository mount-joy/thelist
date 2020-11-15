import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import getActions from './actions';
import reducer, { initialState } from './reducer';

export const IDB_KEY = 'items';

const useItems = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = getActions(dispatch);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        actions.setItems(val);
      }
    })();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    set(IDB_KEY, state.items);
  }, [state.items]);

  return [state.items, actions];
};

export default useItems;
