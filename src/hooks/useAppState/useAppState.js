import { useEffect, useReducer } from 'react';
import { get, set } from 'idb-keyval';

import getActions from './actions';
import reducer, { initialState } from './reducer';
import applyMiddleware from './middleware';
import getList from '../../api/getList';

export const IDB_KEY = 'thelist-state';

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = getActions(applyMiddleware(dispatch, () => state));

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (mounted) {
        actions.setState(val);

        const urlParams = new URLSearchParams(window.location.search);
        const sharedListId = urlParams.get('list_id');
        if (sharedListId && val?.lists?.find((list) => list.id === sharedListId) == null) {
          getList(sharedListId)
            .then(({ name }) => actions.newList(`${name} (Shared)`, sharedListId));
        }
        window.history.replaceState(null, document.title, window.location.pathname);
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
