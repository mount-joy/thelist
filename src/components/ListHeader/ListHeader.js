import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../static/logo.svg';

import styles from './styles.module.css';

const ListHeader = () => {
  const shareList = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share Your List!',
        url: 'https:thelist.app',
      });
    } else {
      const listText = document.getElementById('listText');
      listText.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className={styles.listHeader}>
      <div className={styles.headerRow}>
        <Logo className={styles.logo} title="Logo" />
        <FontAwesomeIcon
          icon={faShareAlt}
          className={styles.shareIcon}
          title="Share this list"
          tabIndex={0}
          onClick={shareList}
        />
      </div>
      <input
        type="text"
        value="https:thelist.app"
        id="listText"
        onClick={shareList}
      />
      <div className={styles.headerRow}>
        <h3>Shopping List</h3>
        <h4>15 items</h4>
      </div>
    </div>
  );
};

export default ListHeader;
