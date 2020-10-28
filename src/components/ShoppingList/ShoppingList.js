import React, { useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import useItems from '../../hooks/useItems';
import ListItems from '../ListItems';
import styles from './styles.module.css';
import Row from '../Row';

const ShoppingList = () => {
  const [items, setItems] = useItems();
  const [text, setText] = useState('');

  const addItem = (e) => {
    e.preventDefault();

    if (text !== '') {
      const newItem = {
        text,
        key: Date.now(),
      };

      setItems(items.concat(newItem));
      setText('');
    }
  };

  const deleteItem = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);
  };

  return (
    <div className={styles.listElements}>
      <form onSubmit={addItem}>
        <Row icon={faPlusCircle} iconClassName={styles.newItemIcon} iconLabel="Add item" iconOnClick={addItem}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Item Name" />
        </Row>
      </form>
      <ListItems entries={items} deleteItem={deleteItem} />
    </div>
  );
};

export default ShoppingList;
