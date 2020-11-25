import React from 'react';

import ListHeader from '../ListHeader';
import ShoppingList from '../ShoppingList';
import ListSelector from '../ListSelector';
import useItems from '../../hooks/useItems';

const App = () => {
  const [items, actions] = useItems();

  return (
    <>
      <ListHeader />
      <ShoppingList items={items} actions={actions} />
      <ListSelector />
    </>
  );
};

export default App;
