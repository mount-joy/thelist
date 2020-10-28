import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';
import Row from '../Row';

const ListItems = ({ entries, deleteItem }) => (
  <ul className={styles.list}>
    {entries.map(({ key, text }) => (
      <li key={key}>
        <Row
          icon={faTrash}
          iconOnClick={() => deleteItem(key)}
          iconLabel={`Delete item: ${text}`}
          iconTestId={`delete-item-${text}`}
        >
          <span className={styles.listItem}>
            {text}
          </span>
        </Row>
      </li>
    ))}
  </ul>
);

export default ListItems;
