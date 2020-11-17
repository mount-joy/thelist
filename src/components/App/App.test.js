import React from 'react';
import { getNodeText, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  let instance;
  beforeEach(() => {
    instance = render(<App />);
  });

  it('renders the title', () => {
    const title = instance.getAllByRole('heading')
      .map((heading) => getNodeText(heading))
      .find((text) => text === 'Shopping List');
    expect(title).toBeDefined();
  });

  it('renders the number of items on the list', () => {
    expect(instance.getByText(/[0-9]+ items/)).toBeInTheDocument();
  });

  it('renders the logo', () => {
    expect(instance.getByTitle('Logo')).toBeInTheDocument();
  });

  it('renders the share icon', () => {
    expect(instance.getByLabelText('Share this list')).toBeInTheDocument();
  });

  it('renders the box to enter new items', () => {
    expect(instance.getByPlaceholderText('Item Name')).toBeInTheDocument();
  });
});
