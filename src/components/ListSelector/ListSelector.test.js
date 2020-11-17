import React from 'react';
import { render } from '@testing-library/react';
import ListSelector from './ListSelector';

describe('ListSelector', () => {
  let instance;
  beforeEach(() => {
    instance = render(<ListSelector />);
  });

  it('renders the add button', () => {
    const addButton = instance.getByLabelText(/Add/);

    expect(addButton).toBeInTheDocument();
    expect(addButton.nodeName).toEqual('BUTTON');
    expect(addButton.type).toEqual('submit');
  });

  it('displays example lists', () => {
    expect(instance.findAllByText(/List/)).not.toBeNull();
  });
});
