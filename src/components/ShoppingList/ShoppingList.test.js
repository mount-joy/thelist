import React from 'react';
import { render } from '@testing-library/react';
import ShoppingList from './ShoppingList';

const ITEMS = [];
const ACTIONS = {
  setListId: jest.fn(),
  setItems: jest.fn(),
  newItem: jest.fn(),
  deleteItemByKey: jest.fn(),
  updateItemByKey: jest.fn(),
  toggleCompletionByKey: jest.fn(),
};

describe('ShoppingList', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ json: jest.fn(() => ({})) });
  });

  it('renders the add button', () => {
    const { getByLabelText } = render(<ShoppingList items={ITEMS} actions={ACTIONS} />);
    const addButton = getByLabelText(/Add/);

    expect(addButton).toBeInTheDocument();
    expect(addButton.nodeName).toEqual('BUTTON');
    expect(addButton.type).toEqual('submit');
  });
});
