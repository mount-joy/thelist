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
    const { getByText } = render(<ListItems entries={ENTRIES} deleteItem={jest.fn()} />);

    expect(getByText(/Grapes/)).toBeInTheDocument();
    expect(getByText(/Apples/)).toBeInTheDocument();
    expect(getByText(/Oranges/)).toBeInTheDocument();
  });

  it('calls deleteItem when the trash icon is clicked', () => {
    const deleteItem = jest.fn();
    const { getByTestId } = render(<ListItems entries={ENTRIES} deleteItem={deleteItem} />);

    fireEvent.click(getByTestId('delete-item-Oranges'));

    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith('item-2');
  });
});
