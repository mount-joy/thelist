import React from 'react';

import styles from './styles.module.css';
import ListItem from '../ListItem';

const ListItems = ({
  entries, actions, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.filter(({ isCompleted }) => !isCompleted).map(({ key, text, isCompleted }) => (
      <ListItem
        actions={actions}
        isCompleted={isCompleted}
        itemKey={key}
        key={key}
        keypressHandler={keypressHandler}
        text={text}
      />
    ))}
    <h3>Added items</h3>
    {entries.filter(({ isCompleted }) => isCompleted).map(({ key, text, isCompleted }) => (
      <ListItem
        actions={actions}
        isCompleted={isCompleted}
        itemKey={key}
        key={key}
        keypressHandler={keypressHandler}
        text={text}
      />
    ))}
  </ul>
);

export default ListItems;
