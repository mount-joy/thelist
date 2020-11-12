import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import useItems from '../../hooks/useItems';
import ListItems from '../ListItems';
import { visuallyHidden } from '../../style/common.module.css';

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

  const updateItem = (updatedValue, key) => {
    const updatedItems = items.map((item) => {
      const newItem = item;
      if (item.key === key) {
        return {
          ...item,
          text: updatedValue,
        };
      }
      return newItem;
    });
    setItems(completedItems);
  });

  const completeItem = (key) => {
    const completedItems = items.map((item) => {
      const newItem = item;
      if (item.key === key) {
        if (item.isCompleted === false) {
          return {
            ...item,
            isCompleted: true,
          };
        }

        return {
          ...item,
          isCompleted: false,
        };
      }
      return newItem;
    });
    setItems(completedItems);
  };

  const keypressHandler = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.listElements}>
        <form onSubmit={addItem} className={styles.newItem}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Item Name" id="item-name" />
          <label htmlFor="item-name" className={visuallyHidden}>Item Name</label>
          <button type="submit" aria-label="Add item"><FontAwesomeIcon icon={faPlusCircle} /></button>
        </form>
        <ListItems
          entries={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
          keypressHandler={keypressHandler}
          completeItem={completeItem}
        />
      </div>
    </div>
  );
};

export default ShoppingList;
