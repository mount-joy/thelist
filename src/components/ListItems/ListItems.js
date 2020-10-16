import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListItems = ({ entries, delete }) => (
  <ul>
    {entries.map(({ key, text }) => (
      <li key={key}>{text} <FontAwesomeIcon icon={faTrash} onClick={() => delete(key)} /></li>
    ))}
  </ul>
);

export default ListItems;
