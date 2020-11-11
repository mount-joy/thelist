import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListHeader = () => (
    <div className={styles.listHeader}>
        <div className={styles.headerRow}>
            <FontAwesomeIcon
                icon={faShareAlt}
                className={styles.shareIcon}
            />
            <FontAwesomeIcon
                icon={faShareAlt}
                className={styles.shareIcon}
            />
        </div>
        <div className={styles.headerRow}>
            <h3>Shopping List</h3>
            <h4>15 items</h4>
        </div>
    </div>
);

export default ListHeader;
