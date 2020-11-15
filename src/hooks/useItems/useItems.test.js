import React, { forwardRef, useImperativeHandle } from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { del, keys } from 'idb-keyval';

import useItems from './useItems';

const WrapperComponent = forwardRef((props, ref) => {
  const [items, actions] = useItems();

  useImperativeHandle(ref, () => ({
    actions,
  }));

  return <div data-testid="items">{JSON.stringify(items)}</div>;
});

const getItems = (instance) => JSON.parse(instance.container.children[0].innerHTML);
const clearDB = async () => Promise.all((await keys()).map((key) => del(key)));

describe('useItems', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await clearDB();
  });

  it('uses the default value the first time', async () => {
    const instance = render(<WrapperComponent />);

    expect(getItems(instance)).toEqual([]);
  });

  it('when setItems is called the value is updated', async () => {
    const ref = React.createRef();
    const instance = render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.setItems([{ item: 'A' }]);
    });

    expect(getItems(instance)).toEqual([{ item: 'A' }]);
  });

  it('uses the previous value the next time', async () => {
    const ref = React.createRef();
    render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.setItems([{ item: 'A' }]);
    });

    const instance = render(<WrapperComponent />);

    await waitFor(() => {
      expect(getItems(instance)).toEqual([{ item: 'A' }]);
    });
  });

  describe('updateItemByKey', () => {
    it('when called the item is updated', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await act(async () => {
        await ref.current.actions.setItems([
          { id: '1234', key: '1234', text: 'Apples' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', '1234');
      });

      await waitFor(() => {
        expect(getItems(instance)).toEqual([
          { id: '1234', key: '1234', text: 'Carrots' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });
    });

    it('when called with an invalid key, no item is updated', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await act(async () => {
        await ref.current.actions.setItems([
          { id: '1234', key: '1234', text: 'Apples' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', 's-other');
      });

      await waitFor(() => {
        expect(getItems(instance)).toEqual([
          { id: '1234', key: '1234', text: 'Apples' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });
    });
  });

  describe('deleteItemByKey', () => {
    it('when called the item is removed', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await act(async () => {
        await ref.current.actions.setItems([
          { id: '1234', key: '1234', text: 'Apples' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });

      await act(async () => {
        await ref.current.actions.deleteItemByKey('5678');
      });

      expect(getItems(instance)).toEqual([
        { id: '1234', key: '1234', text: 'Apples' },
      ]);
    });

    it('when called with an invalid key, no item is removed', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await act(async () => {
        await ref.current.actions.setItems([
          { id: '1234', key: '1234', text: 'Apples' },
          { id: '5678', key: '5678', text: 'Bananas' },
        ]);
      });

      await act(async () => {
        await ref.current.actions.deleteItemByKey('unknown');
      });

      expect(getItems(instance)).toEqual([
        { id: '1234', key: '1234', text: 'Apples' },
        { id: '5678', key: '5678', text: 'Bananas' },
      ]);
    });
  });

  it('when newItem is called the item is added', async () => {
    const ref = React.createRef();
    const instance = render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.newItem('Carrots');
    });

    expect(getItems(instance)).toEqual([
      { id: undefined, key: expect.any(String), text: 'Carrots' },
    ]);
  });
});
