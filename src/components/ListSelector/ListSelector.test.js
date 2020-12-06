import React from 'react';
import { render } from '@testing-library/react';
import ListSelector from './ListSelector';

const LISTS = [
  { key: '1234', name: 'My List' },
  { key: '5678', name: 'Shared List' },
  { key: 'abcd', name: 'Another List' },
];

describe('ListSelector', () => {
  let instance;
  beforeEach(() => {
    instance = render(<ListSelector lists={LISTS} selectedIndex={0} />);
  });

  it('renders the add button', () => {
    const addButton = instance.getByLabelText(/Add/);

    expect(addButton).toBeInTheDocument();
    expect(addButton.nodeName).toEqual('BUTTON');
    expect(addButton.type).toEqual('submit');
  });

  it('displays example lists', async () => {
    const listItems = await instance.findAllByText(/List/);
    expect(listItems.length).toEqual(3);
  });
});
