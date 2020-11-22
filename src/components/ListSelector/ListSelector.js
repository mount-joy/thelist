import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListSelector = ({ lists, selectedIndex }) => (
  <div className={styles.listSelector}>
    <div className={styles.selectorWrapper}>
      <ul>
        {lists.map((list, index) => (
          <li
            className={index === selectedIndex ? styles.active : ''}
            key={list.key}
            data-testid="list-name"
          >
            {list.name}
          </li>
        ))}
      </ul>
      <button type="submit" aria-label="Add list">
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={styles.addListIcon}
        />
      </button>
    </div>
  </div>
);

export default ListSelector;
