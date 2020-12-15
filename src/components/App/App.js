import React, { useEffect } from 'react';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useAppState from '../../hooks/useAppState';
import { selectItems, selectListName, selectList, selectLists } from '../../hooks/useAppState/selectors';
import getPageTitle from '../../utils/getPageTitle';

const App = () => {
  const [state, actions] = useAppState();

  useEffect(() => {
    const name = selectListName(state);
    document.title = getPageTitle(name);
  }, [state]);

  return (
    <>
      <ListHeader list={selectList(state)} items={selectItems(state)} />
      <ShoppingList items={selectItems(state)} actions={actions} />
      <ListSelector lists={selectLists(state)} selectedIndex={state.index} actions={actions} />
    </>
  );
};

export default App;
