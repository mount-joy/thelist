import React from 'react';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useAppState from '../../hooks/useAppState';

const App = () => {
  const [state, actions] = useAppState();

  return (
    <>
      <ListHeader />
      <ShoppingList items={state.items} actions={actions} />
      <ListSelector />
    </>
  );
};

export default App;
