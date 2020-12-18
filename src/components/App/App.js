import React, { useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useAppState from '../../hooks/useAppState';
import { selectItems, selectListName, selectList, selectLists } from '../../hooks/useAppState/selectors';
import getPageTitle from '../../utils/getPageTitle';
import useServiceWorker from '../../hooks/useServiceWoker';

const App = () => {
  const [state, actions] = useAppState();
  const [updateAvailable, updateServiceWorker] = useServiceWorker();

  useEffect(() => {
    const name = selectListName(state);
    document.title = getPageTitle(name);
  }, [state]);

  useEffect(() => {
    if (updateAvailable) {
      NotificationManager.info('App update available', 'Tap to update', 10000, updateServiceWorker);
    }
  }, [updateAvailable]);

  return (
    <>
      <ListHeader list={selectList(state)} />
      <ShoppingList items={selectItems(state)} actions={actions} />
      <ListSelector lists={selectLists(state)} selectedIndex={state.index} actions={actions} />
      <NotificationContainer />
    </>
  );
};

export default App;
