import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ListItems from '../ListItems';
import { visuallyHidden } from '../../style/common.module.css';

import styles from './styles.module.css';

const ShoppingList = ({ actions, items }) => {
  const [text, setText] = useState('');

  const addItem = (e) => {
    e.preventDefault();

    if (text !== '') {
      actions.newItem(text);
      setText('');
    }
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
          actions={actions}
          keypressHandler={keypressHandler}
        />
      </div>
    </div>
  );
};

export default ShoppingList;
