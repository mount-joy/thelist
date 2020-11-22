import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import useListId from './useListId';
import getActions from './actions';
import reducer, { initialState } from './reducer';
import applyMiddleware from './middleware';

export const IDB_KEY = 'thelist-state';

const useAppState = () => {
  const listId = useListId();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = getActions(applyMiddleware(dispatch, () => state));

  useEffect(() => {
    actions.setListId(listId);
  }, [listId]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        actions.setState(val);
      }
    })();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    set(IDB_KEY, state);
  }, [state]);

  return [state, actions];
};

export default useAppState;
