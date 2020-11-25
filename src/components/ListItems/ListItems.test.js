/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

const actions = {
  deleteItemByKey: jest.fn(),
  updateItemByKey: jest.fn(),
  toggleCompletionByKey: jest.fn(),
};

const props = { entries: ENTRIES, actions, keypressHandler: jest.fn() };

describe('ListItems', () => {
  it('renders each item', () => {
    const { getByDisplayValue } = render(<ListItems {...props} />);

    expect(getByDisplayValue(/Grapes/)).toBeInTheDocument();
    expect(getByDisplayValue(/Apples/)).toBeInTheDocument();
    expect(getByDisplayValue(/Oranges/)).toBeInTheDocument();
  });

  it('calls deleteItem when the trash icon is clicked', () => {
    const { getByTestId } = render(
      <ListItems {...props} />,
    );

    fireEvent.click(getByTestId('edit-item-Oranges'));
    fireEvent.click(getByTestId('delete-item-Oranges'));

    expect(actions.deleteItemByKey).toHaveBeenCalledTimes(1);
    expect(actions.deleteItemByKey).toHaveBeenCalledWith('item-2');
  });

  it('calls updateItem when item input is altered', async () => {
    const { getByTestId } = render(
      <ListItems {...props} />,
    );

    const inputBox = getByTestId('edit-item-Grapes');

    fireEvent.change(inputBox, { target: { value: 'Bananas' } });

    await waitFor(() => {
      expect(actions.updateItemByKey).toHaveBeenCalledTimes(1);
      expect(actions.updateItemByKey).toHaveBeenCalledWith('Bananas', 'item-0');
    }, { timeout: 2000 });
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
    const { getByTestId } = render(<ListItems {...props} />);

    fireEvent.click(getByTestId('complete-item-Apples'));

    expect(actions.toggleCompletionByKey).toHaveBeenCalledTimes(1);
    expect(actions.toggleCompletionByKey).toHaveBeenCalledWith('item-1');
  });
});
