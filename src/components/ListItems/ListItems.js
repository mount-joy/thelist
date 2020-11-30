import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';
import ListItem from '../ListItem';

const ListItems = ({
  entries, actions, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.filter(({ isCompleted }) => !isCompleted).map(({
      key, text, isCompleted }) => (
        <ListItem
          actions={actions}
          isCompleted={isCompleted}
          itemKey={key}
          key={key}
          keypressHandler={keypressHandler}
          text={text}
        />
    ))}
    <div className={styles.completedWrapper}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        className={styles.completedIcon}
      />
      <FontAwesomeIcon
        icon={faCheckCircle}
        className={styles.completedIcon}
      />
      <h4 className={styles.completedHeading}>Completed</h4>
    </div>
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
