import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../static/logo.svg';

import styles from './styles.module.css';

const ListHeader = () => (
  <div className={styles.listHeader}>
    <div className={styles.headerRow}>
      <Logo className={styles.logo} title="Logo" />
      <FontAwesomeIcon
        icon={faShareAlt}
        className={styles.shareIcon}
        title="Share this list"
        tabIndex={0}
      />
    </div>
    <div className={styles.headerRow}>
      <h3>Shopping List</h3>
      <h4>15 items</h4>
    </div>
  </div>
);

export default ListHeader;
