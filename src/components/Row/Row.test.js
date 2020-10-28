import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons';

import Row from './Row';

describe('Row component', () => {
  let instance;
  const iconOnClick = jest.fn();

  beforeEach(() => {
    instance = render(
      <Row
        icon={faBasketballBall}
        iconClassName="iconClassName"
        iconLabel="iconLabel"
        iconOnClick={iconOnClick}
        iconTestId="iconTestId"
      >
        <p>Content</p>
      </Row>,
    );
  });

  it('renders the content', () => {
    const { getByText } = instance;

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('calls iconOnClick when icon pressed', () => {
    const { getByLabelText } = instance;

    const icon = getByLabelText('iconLabel');
    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
    fireEvent.click(icon);
    expect(iconOnClick).toHaveBeenCalled();
  });
});
