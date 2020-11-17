import React from 'react';
import { render, fireEvent, getNodeText } from '@testing-library/react';
import ShoppingList from './ShoppingList';

describe('ShoppingList', () => {
  it('renders the add button', () => {
    const { getByLabelText } = render(<ShoppingList />);
    const addButton = getByLabelText(/Add/);

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
      expect(instance.getByDisplayValue(/Oranges/)).toBeInTheDocument();
      expect(instance.getByDisplayValue(/Apples/)).toBeInTheDocument();
      expect(inputBox.value).toBe('');
    });

    it('removes the item when delete is pressed', () => {
      const deleteButton = instance.getByTestId('delete-item-Oranges');
      fireEvent.click(deleteButton);

      expect(instance.queryByDisplayValue(/Oranges/)).toBeNull();
      expect(instance.queryByDisplayValue(/Apples/)).not.toBeNull();
    });

    it('edits item text when input field is edited', () => {
      const applesInputBox = instance.getByTestId('edit-item-Apples');

      fireEvent.change(applesInputBox, { target: { value: 'Bananas' } });

      expect(instance.queryByDisplayValue(/Oranges/)).not.toBeNull();
      expect(instance.queryByDisplayValue(/Bananas/)).not.toBeNull();
      expect(instance.queryByDisplayValue(/Apples/)).toBeNull();
    });

    it('blurs input element when keypressHandler is called', () => {
      const applesInputBox = instance.getByTestId('edit-item-Apples');
      applesInputBox.focus();
      expect(document.activeElement).toEqual(applesInputBox);
      fireEvent.keyDown(applesInputBox, { keyCode: '13' });

      expect(document.activeElement).not.toEqual(applesInputBox);
    });

    it('completes item move to bottom when completeItem is pressed', async () => {
      const completeButton = instance.getByTestId('complete-item-Oranges');
      const itemsBefore = await instance.findAllByDisplayValue(/(Oranges|Apples)/);
      expect(itemsBefore.map((item) => item.value)).toEqual(['Oranges', 'Apples']);
      fireEvent.click(completeButton);
      const itemsAfter = await instance.findAllByDisplayValue(/(Oranges|Apples)/);
      expect(itemsAfter.map((item) => item.value)).toEqual(['Apples', 'Oranges']);
    });
  });
});
