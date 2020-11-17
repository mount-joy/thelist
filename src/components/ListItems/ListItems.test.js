/* eslint-disable react/jsx-props-no-spreading */
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

const props = {
  entries: ENTRIES, deleteItem: jest.fn(), updateItem: jest.fn(), completeItem: jest.fn(),
};

describe('ListItems', () => {
  it('renders each item', () => {
    const { getByDisplayValue } = render(<ListItems {...props} />);

    expect(getByDisplayValue(/Grapes/)).toBeInTheDocument();
    expect(getByDisplayValue(/Apples/)).toBeInTheDocument();
    expect(getByDisplayValue(/Oranges/)).toBeInTheDocument();
  });

  it('calls deleteItem when the trash icon is clicked', () => {
    const deleteItem = jest.fn();
    const { getByTestId } = render(
      <ListItems {...props} deleteItem={deleteItem} />,
    );

    fireEvent.click(getByTestId('delete-item-Oranges'));

    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith('item-2');
  });

  it('calls updateItem when item input is altered', () => {
    const updateItem = jest.fn();
    const { getByTestId } = render(
      <ListItems {...props} updateItem={updateItem} />,
    );

    const inputBox = getByTestId('edit-item-Grapes');

    fireEvent.change(inputBox, { target: { value: 'Bananas' } });

    expect(updateItem).toHaveBeenCalledTimes(1);
    expect(updateItem).toHaveBeenCalledWith('Bananas', 'item-0');
  });

  it('calls keypressHandler when a key is pressed', () => {
    const keypressHandler = jest.fn();
    const { getByTestId } = render(
      <ListItems {...props} keypressHandler={keypressHandler} />,
    );

    const inputBox = getByTestId('edit-item-Grapes');

    fireEvent.keyDown(inputBox, { key: '13' });

    expect(keypressHandler).toHaveBeenCalledTimes(1);
  });

  it('calls completeItem when check icon is pressed', () => {
    const completeItem = jest.fn();
    const { getByTestId } = render(
      <ListItems {...props} completeItem={completeItem} />,
    );

    fireEvent.click(getByTestId('complete-item-Apples'));

    expect(completeItem).toHaveBeenCalledTimes(1);
    expect(completeItem).toHaveBeenCalledWith('item-1');
  });
});
