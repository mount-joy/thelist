import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListItem = ({
  deleteItem, updateItem, completeItem, keypressHandler, itemKey, text, isCompleted,
}) => (
  <li key={itemKey} className={styles.listItem}>
    <input
      type="text"
      id={itemKey}
      value={text}
      onChange={(e) => updateItem(e.target.value, itemKey)}
      onKeyDown={keypressHandler}
      data-testid={`edit-item-${text}`}
    />
    {' '}
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => deleteItem(itemKey)}
      role="button"
      aria-label={`Delete item: ${text}`}
      data-testid={`delete-item-${text}`}
      tabIndex={0}
      className={styles.deleteIcon}
    />
    <FontAwesomeIcon
      icon={faCheckCircle}
      onClick={() => completeItem(itemKey)}
      role="button"
      aria-label={`Added item: ${text}`}
      data-testid={`complete-item-${text}`}
      tabIndex={0}
      className={isCompleted ? (styles.completedIcon) : (styles.completeIcon)}
    />
  </li>
);

export default ListItem;
