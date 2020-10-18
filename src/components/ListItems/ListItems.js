import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListItems = ({ entries, deleteItem }) => (
  <ul>
    {entries.map(({ key, text }) => (
      <li key={key}>
        {text}
        {' '}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteItem(key)}
          className={styles.deleteIcon}
        />
      </li>
    ))}
  </ul>
);

export default ListItems;
