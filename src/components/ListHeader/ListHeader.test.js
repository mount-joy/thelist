/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import ListHeader from './ListHeader';

const NINE_INCOMPLETE_ITEMS = [
  { isCompleted: true, text: 'thing', key: '1234' },
  { isCompleted: false, text: 'd', key: '2' },
  { isCompleted: false, text: 's', key: '3' },
  { isCompleted: false, text: 'f', key: '4' },
  { isCompleted: false, text: 'k', key: '5' },
  { isCompleted: false, text: 'a', key: '12634' },
  { isCompleted: false, text: 'e', key: '6' },
  { isCompleted: false, text: 'v', key: '7' },
  { isCompleted: false, text: 'y', key: '8' },
  { isCompleted: false, text: 'hj', key: '9' },
];

describe('ListHeader', () => {
  it('Correctly displays number of incomplete items', () => {
    const { getByText } = render(<ListHeader items={NINE_INCOMPLETE_ITEMS} />);

    expect(getByText(/9 items/));
  });
});
