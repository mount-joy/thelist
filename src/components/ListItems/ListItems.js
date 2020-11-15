import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListItems = ({
  entries, actions, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.map(({ key, text }) => (
      <li key={key} className={styles.listItem}>
        <input
          type="text"
          id={key}
          value={text}
          onChange={(e) => actions.updateItemByKey(e.target.value, key)}
          onKeyDown={keypressHandler}
          data-testid={`edit-item-${text}`}
        />
        {' '}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => actions.deleteItemByKey(key)}
          role="button"
          aria-label={`Delete item: ${text}`}
          data-testid={`delete-item-${text}`}
          tabIndex={0}
          className={styles.deleteIcon}
        />
      </li>
    ))}
  </ul>
);

export default ListItems;
