import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const ListItem = ({ actions, keypressHandler, itemKey, text, isCompleted }) => {
  const [value, setValue] = useState(text);
  const [isBeingEdited, setIsBeingEdited] = useState();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { // don't run on first mount
      mounted.current = true;
      return () => {}; // no need for cleanup
    }

    const timeout = setTimeout(() => { // debounce changes
      actions.updateItemByKey(value, itemKey);
    }, 800);

    return () => clearTimeout(timeout);
  }, [value, itemKey]);

  return (
    <li key={itemKey} className={styles.listItem}>
      <input
        type="text"
        id={itemKey}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={keypressHandler}
        onFocus={() => setIsBeingEdited(true)}
        onBlur={() => setTimeout(() => setIsBeingEdited(false), 90)}
        data-testid={`edit-item-${text}`}
      />
      {' '}
      {isBeingEdited ? (
        <>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => actions.deleteItemByKey(itemKey)}
            role="button"
            aria-label={`Delete item: ${text}`}
            data-testid={`delete-item-${text}`}
            tabIndex={0}
            className={styles.deleteIcon}
          />
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faCheckCircle}
            onClick={() => actions.toggleCompletionByKey(itemKey)}
            role="button"
            aria-label={`Added item: ${text}`}
            data-testid={`complete-item-${text}`}
            tabIndex={0}
            className={isCompleted ? (styles.completedIcon) : (styles.completeIcon)}
          />
        </>
      )}
    </li>
  );
};

export default ListItem;
