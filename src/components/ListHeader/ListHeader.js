import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faCopy, faPencilAlt, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../static/logo.svg';

import styles from './styles.module.css';

const ListHeader = () => {
  const [listDetailsShown, showListDetails] = useState();

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
          onClick={() => showListDetails(!listDetailsShown)}
        />
      </div>
      <div className={styles.headerRow}>
        <h3>
          Shopping List
          <FontAwesomeIcon
            icon={faPencilAlt}
            className={styles.pencilIcon}
            title="Edit list name"
            tabIndex={0}
          />
        </h3>
        <h4>15 items</h4>
      </div>
      {listDetailsShown ? (
        <>
          <div className={styles.subheadingRow}>
            <h4>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.clockIcon}
              />
              Created 1st Jan 2020
            </h4>
          </div>
          <div className={styles.copyList}>
            <h5>Copy -</h5>
            <input
              type="text"
              spellCheck="false"
              value="https:thelist.app"
              id="listText"
              onClick={shareList}
            />
            <FontAwesomeIcon
              icon={faCopy}
              className={styles.copyIcon}
              title="Copy list"
              tabIndex={0}
              onClick={shareList}
            />
          </div>
          <div
            className={styles.deleteList}
            title="Delete list"
          >
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.deleteListIcon}
            />
            Delete List
          </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default ListHeader;
