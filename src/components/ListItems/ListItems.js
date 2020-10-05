import React from 'react';

const ListItems = ({ entries }) => (
  <ul>
    {entries.map(item => (
      <li key={item.key}>{item.text}</li>
    ))}
  </ul>
);

export default ListItems;
