import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';
import ListItem from '../ListItem';

const ListItems = ({
  entries, actions, keypressHandler,
}) => (
  <ul className={styles.list}>
    {entries.map(({ key, text }) => (
      <li key={key} className={styles.listItem}>
        <ListItem
          itemKey={key}
          text={text}
          actions={actions}
          keypressHandler={keypressHandler}
          testId={`edit-item-${text}`}
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
