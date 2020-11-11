import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListSelector = () => (
  <div className={styles.listSelector}>
      <ul>
        <li className={styles.active}>Shopping List</li>
        <li>To Do List</li>
      </ul>
      <FontAwesomeIcon
        icon={faPlusCircle}
        className={styles.addListIcon}
      />
  </div>
);

export default ListSelector;
