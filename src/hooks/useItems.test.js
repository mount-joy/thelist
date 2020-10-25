import React, { forwardRef, useImperativeHandle } from 'react';
import { render, waitFor, act } from '@testing-library/react';

import useItems from './useItems';

const WrapperComponent = forwardRef((props, ref) => {
  const [items, setItems] = useItems();

  useImperativeHandle(ref, () => ({
    setItems,
  }));

  return <div data-testid="items">{JSON.stringify(items)}</div>;
});

const getItems = (instance) => JSON.parse(instance.container.children[0].innerHTML);

describe('useItems', () => {
  it('uses the default value the first time', () => {
    const instance = render(<WrapperComponent />);

    expect(getItems(instance)).toEqual([]);
  });

  it('when setItems is called the value is updated', async () => {
    const ref = React.createRef();
    const instance = render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.setItems([{ item: 'A' }]);
    });

    expect(getItems(instance)).toEqual([{ item: 'A' }]);
  });

  it('uses the previous value the next time', async () => {
    const ref = React.createRef();
    render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.setItems([{ item: 'A' }]);
    });

    const instance = render(<WrapperComponent />);

    await waitFor(() => {
      expect(getItems(instance)).toEqual([{ item: 'A' }]);
    });
  });
});
