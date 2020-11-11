import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListHeader = () => (
    <div className={styles.listHeader}>
        <h1>thelist.app</h1>
        <h2>Put it on the list!</h2>
        <FontAwesomeIcon icon={faShareAlt} />
    </div>
);

export default ListHeader;
