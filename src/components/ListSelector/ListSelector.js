import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListSelector = ({ lists, selectedIndex, actions }) => (
  <div className={styles.listSelector}>
    <div className={styles.selectorWrapper}>
      <ul>
        {lists.map((list, index) => (
          <button
            className={`${styles.listSelectorItem} ${index === selectedIndex ? styles.active : ''}`}
            key={list.key}
            data-testid="list-name"
            onClick={() => actions.switchList(index)}
            type="button"
            aria-label="Select list"
          >
            {list.name}
          </button>
        ))}
      </ul>
      <button type="submit" aria-label="Add list">
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={styles.addListIcon}
          onClick={() => actions.newList(`Shopping List ${lists.length + 1}`)}
        />
      </button>
    </div>
  </div>
);

export default ListSelector;
