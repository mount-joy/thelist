import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListItems from './ListItems';

const ENTRIES = [
  {
    key: 'item-0',
    text: 'Grapes',
  },
  {
    key: 'item-1',
    text: 'Apples',
  },
  {
    key: 'item-2',
    text: 'Oranges',
  },
];

describe('ListItems', () => {
  it('renders each item', () => {
    const { getByDisplayValue } = render(
      <ListItems entries={ENTRIES} deleteItem={jest.fn()} updateItem={jest.fn()} />,
    );

    expect(getByDisplayValue(/Grapes/)).toBeInTheDocument();
    expect(getByDisplayValue(/Apples/)).toBeInTheDocument();
    expect(getByDisplayValue(/Oranges/)).toBeInTheDocument();
  });

  it('calls deleteItem when the trash icon is clicked', () => {
    const deleteItem = jest.fn();
    const { getByTestId } = render(
      <ListItems entries={ENTRIES} deleteItem={deleteItem} updateItem={jest.fn()} />,
    );

    fireEvent.click(getByTestId('delete-item-Oranges'));

    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith('item-2');
  });

  it('calls updateItem when item input is altered', () => {
    const updateItem = jest.fn();
    const { getByTestId } = render(
      <ListItems entries={ENTRIES} deleteItem={jest.fn()} updateItem={updateItem} />,
    );

    const inputBox = getByTestId('edit-item-Grapes');

    fireEvent.change(inputBox, { target: { value: 'Bananas' } });

    expect(updateItem).toHaveBeenCalledTimes(1);
    expect(updateItem).toHaveBeenCalledWith('Bananas', 'item-0');
  });
});
