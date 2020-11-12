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
    const { getByDisplayValue } = render(<ListItems entries={ENTRIES} deleteItem={jest.fn()} updateItem={jest.fn()} />);

    expect(getByDisplayValue(/Grapes/)).toBeInTheDocument();
    expect(getByDisplayValue(/Apples/)).toBeInTheDocument();
    expect(getByDisplayValue(/Oranges/)).toBeInTheDocument();
  });

  it('calls deleteItem when the trash icon is clicked', () => {
    const deleteItem = jest.fn();
    const { getByTestId } = render(<ListItems entries={ENTRIES} deleteItem={deleteItem} updateItem={jest.fn()} />);

    fireEvent.click(getByTestId('delete-item-Oranges'));

    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith('item-2');
  });

  it('edits item text when item input is altered', () => {
    let inputBox;
    const updateItem = jest.fn();
    const { getByTestId } = render(<ListItems entries={ENTRIES} deleteItem={jest.fn()} updateItem={updateItem} />);

    inputBox = getByTestId('edit-item-Grapes');

    fireEvent.change(inputBox, { target: { value: 'Bananas' } });
    expect(inputBox.value).toBe('Bananas');

    expect(getByTestId('edit-item-Bananas')).toBeInTheDocument();
    expect(getByTestId('edit-item-Grapes')).toBeInTheDocument();
  });
});
