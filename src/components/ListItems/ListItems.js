import React from 'react';

import styles from './styles.module.css';
import ListItem from '../ListItem';

const ListItems = ({
  entries, actions, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.filter(({ isCompleted }) => !isCompleted).map(({ key, text, isCompleted, isEditable }) => (
      <ListItem
        actions={actions}
        isCompleted={isCompleted}
        isEditable={isEditable}
        itemKey={key}
        key={key}
        keypressHandler={keypressHandler}
        text={text}
      />
    ))}
    <h4 className={styles.completedHeading}>Completed</h4>
    {entries.filter(({ isCompleted }) => isCompleted).map(({ key, text, isCompleted, isEditable }) => (
      <ListItem
        actions={actions}
        isCompleted={isCompleted}
        isEditable={isEditable}
        itemKey={key}
        key={key}
        keypressHandler={keypressHandler}
        text={text}
      />
    ))}
  </ul>
);

export default ListItems;
