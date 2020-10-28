import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShoppingList from './ShoppingList';

describe('ShoppingList', () => {
  it('renders the add button', () => {
    const { getByLabelText } = render(<ShoppingList />);
    const addButton = getByLabelText(/Add/);

    expect(addButton).toBeInTheDocument();
    expect(addButton.attributes.role.value).toEqual('button');
  });

  it('adds an item to the list when the add icon is pressed', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(<ShoppingList />);

    const inputBox = getByPlaceholderText('Item Name');
    fireEvent.change(inputBox, { target: { value: 'Peaches' } });

    const addButton = getByLabelText(/Add/);
    fireEvent.click(addButton);
    expect(getByText(/Peaches/)).toBeInTheDocument();
  });

  describe('when an item is added to the list', () => {
    let instance;
    let inputBox;

    beforeEach(() => {
      instance = render(<ShoppingList />);
      const { getByPlaceholderText, container } = instance;

      inputBox = getByPlaceholderText('Item Name');
      const form = container.querySelector('form');

      fireEvent.change(inputBox, { target: { value: 'Oranges' } });
      expect(inputBox.value).toBe('Oranges');
      fireEvent.submit(form);
      fireEvent.change(inputBox, { target: { value: 'Apples' } });
      fireEvent.submit(form);
    });

    it('displays the new items', () => {
      expect(instance.getByText(/Oranges/)).toBeInTheDocument();
      expect(instance.getByText(/Apples/)).toBeInTheDocument();
      expect(inputBox.value).toBe('');
    });

    it('removes the item when delete is pressed', () => {
      const deleteButton = instance.getByTestId('delete-item-Oranges');
      fireEvent.click(deleteButton);

      expect(instance.queryByText(/Oranges/)).toBeNull();
      expect(instance.queryByText(/Apples/)).not.toBeNull();
    });
  });
});
