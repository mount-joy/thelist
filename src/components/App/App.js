import React from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useAppState from '../../hooks/useAppState';
import { selectItems, selectLists } from '../../hooks/useAppState/selectors';

const App = () => {
  const [state, actions] = useAppState();

  return (
    <>
      <ListHeader />
      <ShoppingList items={selectItems(state)} actions={actions} />
      <ListSelector lists={selectLists(state)} selectedIndex={state.index} actions={actions} />
      <NotificationContainer />
    </>
  );
};

export default App;
