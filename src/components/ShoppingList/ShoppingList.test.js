import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShoppingList from './ShoppingList';

describe('ShoppingList', () => {
  it('renders the add button', () => {
    const { getByText } = render(<ShoppingList />);
    const addButton = getByText(/Add/);

    expect(addButton).toBeInTheDocument();
    expect(addButton.nodeName).toEqual('BUTTON');
    expect(addButton.type).toEqual('submit');
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
