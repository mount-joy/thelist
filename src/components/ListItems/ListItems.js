import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListItems = ({
  entries, deleteItem, updateItem, completeItem, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.filter(({ isCompleted }) => !isCompleted).map(({ key, text, isCompleted }) => (
      <li key={key} className={styles.listItem}>
        <input
          type="text"
          id={key}
          value={text}
          onChange={(e) => updateItem(e.target.value, key)}
          style={{ textDecoration: isCompleted ? 'line-through' : '' }}
          onKeyDown={keypressHandler}
          data-testid={`edit-item-${text}`}
        />
        {' '}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteItem(key)}
          role="button"
          aria-label={`Delete item: ${text}`}
          data-testid={`delete-item-${text}`}
          tabIndex={0}
          className={styles.deleteIcon}
        />
        <FontAwesomeIcon
          icon={faCheckCircle}
          onClick={() => completeItem(key)}
          role="button"
          aria-label={`Added item: ${text}`}
          data-testid={`complete-item-${text}`}
          tabIndex={0}
          className={isCompleted ? (styles.completedIcon) : (styles.completeIcon)}
        />
      </li>
    ))}
    <h3>Added items</h3>
    {entries.filter(({ isCompleted }) => isCompleted).map(({ key, text, isCompleted }) => (
      <li key={key} className={styles.listItem}>
        <input
          type="text"
          id={key}
          value={text}
          onChange={(e) => updateItem(e.target.value, key)}
          style={{ textDecoration: isCompleted ? 'line-through' : '' }}
        />
        {' '}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteItem(key)}
          role="button"
          aria-label={`Delete item: ${text}`}
          data-testid={`delete-item-${text}`}
          tabIndex={0}
          className={styles.deleteIcon}
        />
        <FontAwesomeIcon
          icon={faCheckCircle}
          onClick={() => completeItem(key)}
          role="button"
          aria-label={`Added item: ${text}`}
          data-testid={`complete-item-${text}`}
          tabIndex={0}
          className={isCompleted ? (styles.completedIcon) : (styles.completeIcon)}
        />
      </li>
    ))}
  </ul>
);

export default ListItems;
