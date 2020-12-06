import React from 'react';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useAppState from '../../hooks/useAppState';
import { selectItems, selectList, selectLists } from '../../hooks/useAppState/selectors';

const App = () => {
  const [state, actions] = useAppState();

  return (
    <>
      <ListHeader list={selectList(state)} />
      <ShoppingList items={selectItems(state)} actions={actions} />
      <ListSelector lists={selectLists(state)} selectedIndex={state.index} actions={actions} />
    </>
  );
};

export default App;
