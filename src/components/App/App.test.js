import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  let instance;
  beforeEach(() => {
    instance = render(<App />);
  });

  it('renders the title', () => {
    expect(instance.getByText('Shopping List')).toBeInTheDocument();
  });

  it('renders the number of items on the list', () => {
    expect(instance.getByText(/[0-9]+ items/)).toBeInTheDocument();
  });

  // it('renders the logo', () => {
  //   expect(instance.getByTitle('Logo')).toBeInTheDocument();
  // });

  // it('renders the share icon', () => {
  //   expect(instance.getByLabelText('Share this list')).toBeInTheDocument();
  // });

  it('renders the box to enter new items', () => {
    expect(instance.getByPlaceholderText('Item Name')).toBeInTheDocument();
  });
});
