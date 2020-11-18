import React from 'react';

import styles from './styles.module.css';
import ListItem from '../ListItem';

const ListItems = ({
  entries, deleteItem, updateItem, completeItem, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.filter(({ isCompleted }) => !isCompleted).map(({ key, text, isCompleted }) => (
      <ListItem
        deleteItem={deleteItem}
        updateItem={updateItem}
        keypressHandler={keypressHandler}
        completeItem={completeItem}
        itemKey={key}
        key={key}
        text={text}
        isCompleted={isCompleted}
      />
    ))}
    <h4 className={styles.completedHeading}>Completed</h4>
    {entries.filter(({ isCompleted }) => isCompleted).map(({ key, text, isCompleted }) => (
      <ListItem
        deleteItem={deleteItem}
        updateItem={updateItem}
        keypressHandler={keypressHandler}
        completeItem={completeItem}
        itemKey={key}
        key={key}
        text={text}
        isCompleted={isCompleted}
      />
    ))}
  </ul>
);

export default ListItems;
