import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import useItems from '../../hooks/useItems';
import ListItems from '../ListItems';
import styles from './styles.module.css';

const ShoppingList = () => {
  const [items, setItems] = useItems();
  const [text, setText] = useState('');

  const addItem = (e) => {
    e.preventDefault();

    if (text !== '') {
      const newItem = {
        text,
        key: Date.now(),
        isCompleted: false,
      };

      setItems(items.concat(newItem));
      setText('');
    }
  };

  const deleteItem = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);
  };

  const updateItem = (edit, key) => {
    const updatedItems = items.map((item) => {
      const newItem = item;
      if (item.key === key) {
        newItem.text = edit;
      }
      return newItem;
    });
    setItems(updatedItems);
  };

  const completeItem = (key) => {
    const completedItems = items.map((item) => {
      const newItem = item;
      if (item.key === key) {
        return {
          ...item,
          isCompleted: true,
        };
      }
      return newItem;
    });
    setItems(completedItems);
  };

  return (
    <div className={styles.listElements}>
      <form onSubmit={addItem} className={styles.newItem}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Item Name" />
        <button type="submit" aria-label="Add item"><FontAwesomeIcon icon={faPlusCircle} /></button>
      </form>
      <ListItems
        entries={items}
        deleteItem={deleteItem}
        updateItem={updateItem}
        completeItem={completeItem}
      />
    </div>
  );
};

export default ShoppingList;
