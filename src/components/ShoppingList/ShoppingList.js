import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import useItems from '../../hooks/useItems';
import ListItems from '../ListItems';
import styles from './styles.module.css';

const ShoppingList = () => {
  const [items, newItem, deleteItem] = useItems();
  const [text, setText] = useState('');

  const addItem = (e) => {
    e.preventDefault();

    if (text !== '') {
      newItem(text);
      setText('');
    }
  };

  return (
    <div className={styles.listElements}>
      <form onSubmit={addItem} className={styles.newItem}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Item Name" />
        <button type="submit" aria-label="Add item"><FontAwesomeIcon icon={faPlusCircle} /></button>
      </form>
      <ListItems entries={items} deleteItem={deleteItem} />
    </div>
  );
};

export default ShoppingList;
