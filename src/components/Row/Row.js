import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';

const Row = ({
  children,
  icon,
  iconClassName,
  iconLabel,
  iconOnClick,
  iconTestId,
}) => (
  <div className={styles.row}>
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.icon}>
      <FontAwesomeIcon
        icon={icon}
        onClick={iconOnClick}
        role="button"
        aria-label={iconLabel}
        data-testid={iconTestId}
        tabIndex={0}
        className={iconClassName}
      />
    </div>
  </div>
);

export default Row;
