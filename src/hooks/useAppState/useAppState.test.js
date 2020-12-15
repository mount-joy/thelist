import React, { forwardRef, useImperativeHandle } from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { del, keys } from 'idb-keyval';

import useAppState from './useAppState';

const WrapperComponent = forwardRef((props, ref) => {
  const [state, actions] = useAppState();

  useImperativeHandle(ref, () => ({ actions }));

  return <div data-testid="state">{JSON.stringify(state)}</div>;
});

const getState = (instance) => JSON.parse(instance.container.children[0].innerHTML);
const clearDB = async () => Promise.all((await keys()).map((key) => del(key)));

const renderAndHydrateComponent = async () => {
  const ref = React.createRef();
  const instance = render(<WrapperComponent ref={ref} />);
  await waitFor(() => {
    expect(instance.getByText(/Shopping List/)).toBeInTheDocument();
  });

  const state = {
    index: 0,
    lists: [{
      id: 'list-id',
      key: 'list-key',
      name: 'Shopping List',
      items: [
        { id: 's-1234', key: 's-1234', text: 'Apples' },
        { id: 's-5678', key: 's-5678', text: 'Bananas' },
      ],
    }],
  };

  await act(async () => {
    await ref.current.actions.setState(state);
  });

  await waitFor(() => {
    expect(getState(instance)).toEqual(state);
  });

  return { ref, instance };
};

describe('useAppState', () => {
  let mockFetch;

  beforeEach(async () => {
    jest.clearAllMocks();
    await clearDB();

    mockFetch = jest.fn().mockImplementation((url, config) => {
      switch (url) {
        case 'https://api.thelist.app/lists':
          return Promise.resolve({ json: async () => ({ Id: 'list-id' }) });

        case 'https://api.thelist.app/lists/shared-list-id':
          return Promise.resolve({ json: async () => ({ Id: 'shared-list-id', Name: 'Shopping List' }) });

        case 'https://api.thelist.app/lists/list-id/items': {
          if (config.method === 'POST') {
            return Promise.resolve({ json: async () => ({ Id: 'new-item-id' }) });
          }
          return Promise.resolve({
            json: async () => [
              { Id: 's-1234', Name: 'Apples' },
              { Id: 's-5678', Name: 'Bananas' },
            ],
          });
        }

        case 'https://api.thelist.app/lists/shared-list-id/items': {
          return Promise.resolve({
            json: async () => [
              { Id: 's-abcd', Name: 'Pears' },
              { Id: 's-wxyz', Name: 'Oranges' },
            ],
          });
        }

        case 'https://api.thelist.app/lists/list-id/items/s-1234':
        case 'https://api.thelist.app/lists/list-id/items/s-5678': {
          if (config.method === 'DELETE') {
            return Promise.resolve({ json: async () => null });
          }
          return Promise.resolve({ json: async () => ({ Id: '1234-5678' }) });
        }

        default:
          throw new Error(`I don't know what to do with the URL: ${url}`);
      }
    });
    global.fetch = mockFetch;
  });

  it('uses the default value the first time and creates a list', async () => {
    const instance = render(<WrapperComponent />);

    expect(getState(instance)).toEqual({ lists: [], index: 0 });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists',
        { body: '{"Name":"Shopping List"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      );
    });

    expect(getState(instance)).toEqual({
      index: 0,
      lists: [{ id: 'list-id', key: expect.any(String), name: 'Shopping List', items: [] }],
    });
  });

  it('re-uses the previous listId', async () => {
    render(<WrapperComponent />);

    const createListArgs = [
      'https://api.thelist.app/lists',
      { body: '{"Name":"Shopping List"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    ];
    const getItemsArgs = [
      'https://api.thelist.app/lists/list-id/items',
      { method: 'GET' },
    ];

    // First time a list is created
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(...createListArgs);
      expect(mockFetch).not.toHaveBeenCalledWith(...getItemsArgs);
    }, { timeout: 4000 });

    jest.clearAllMocks();
    render(<WrapperComponent />);

    // Second time it is not, the old ID is re-used
    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalledWith(...createListArgs);
      expect(mockFetch).toHaveBeenCalledWith(...getItemsArgs);
    });
  });

  it('uses the previous value the next time', async () => {
    const ref = React.createRef();
    render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.setState({ items: [[{ item: 'A' }]], lists: [] });
    });

    const instance = render(<WrapperComponent />);

    await waitFor(() => {
      expect(getState(instance)).toEqual({ items: [[{ item: 'A' }]], lists: [] });
    });
  });

  describe('updateItemByKey', () => {
    it('when called the item is updated', async () => {
      const { ref, instance } = await renderAndHydrateComponent();

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', 's-1234');
      });

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          index: 0,
          lists: [{
            id: 'list-id',
            key: expect.any(String),
            name: 'Shopping List',
            items: [
              { id: 's-1234', key: 's-1234', text: 'Carrots' },
              { id: 's-5678', key: 's-5678', text: 'Bananas' },
            ],
          }],
        });
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists/list-id/items/s-1234',
        { body: '{"Name":"Carrots"}', method: 'PATCH', headers: { 'Content-Type': 'application/json' } },
      );
    });

    it('when called with an invalid key, no item is updated', async () => {
      const { ref, instance } = await renderAndHydrateComponent();

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', 's-other');
      });

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          index: 0,
          lists: [{
            id: 'list-id',
            key: expect.any(String),
            name: 'Shopping List',
            items: [
              { id: 's-1234', key: 's-1234', text: 'Apples' },
              { id: 's-5678', key: 's-5678', text: 'Bananas' },
            ],
          }],
        });
      });

      // No patch methods
      expect(mockFetch).not.toHaveBeenCalledWith(expect.any(String), { method: 'PATCH', body: expect.any(String) });
    });
  });

  describe('deleteItemByKey', () => {
    it('when called the item is removed', async () => {
      const { ref, instance } = await renderAndHydrateComponent();

      await act(async () => {
        await ref.current.actions.deleteItemByKey('s-5678');
      });

      expect(getState(instance)).toEqual({
        index: 0,
        lists: [{
          id: 'list-id',
          key: expect.any(String),
          name: 'Shopping List',
          items: [{ id: 's-1234', key: 's-1234', text: 'Apples' }],
        }],
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists/list-id/items/s-5678',
        { method: 'DELETE' },
      );
    });

    it('when called with an invalid key, no item is removed', async () => {
      const { ref, instance } = await renderAndHydrateComponent();

      await act(async () => {
        await ref.current.actions.deleteItemByKey('s-unknown');
      });

      expect(getState(instance)).toEqual({
        index: 0,
        lists: [{
          id: 'list-id',
          key: expect.any(String),
          name: 'Shopping List',
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
        }],
      });
    });
  });

  it('when newItem is called the item is added', async () => {
    const ref = React.createRef();
    const instance = render(<WrapperComponent ref={ref} />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists',
        { body: '{"Name":"Shopping List"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      );

      expect(getState(instance)).toEqual({
        index: 0,
        lists: [{ id: 'list-id', key: expect.any(String), name: 'Shopping List', items: [] }],
      });
    });

    await act(async () => {
      await ref.current.actions.newItem('Carrots');
    });

    expect(getState(instance)).toEqual({
      index: 0,
      lists: [{
        id: 'list-id',
        key: expect.any(String),
        name: 'Shopping List',
        items: [{ id: 'new-item-id', key: expect.any(String), text: 'Carrots', isCompleted: false }],
      }],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items',
      { body: '{"Name":"Carrots"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );
  });

  it('when accessing a shared list URL, the shared list is displayed', async () => {
    const { location } = global.window;
    delete global.window.location;
    global.window.location = new URL('https://example.com?list_id=shared-list-id');
    const instance = render(<WrapperComponent />);

    await waitFor(() => {
      expect(getState(instance)).toEqual({
        index: 1,
        lists: [
          {
            id: 'list-id',
            key: expect.any(String),
            name: 'Shopping List',
            items: [],
          },
          {
            id: 'shared-list-id',
            key: expect.any(String),
            name: 'Shopping List (Shared)',
            items: [
              { id: 's-abcd', key: 's-abcd', text: 'Pears' },
              { id: 's-wxyz', key: 's-wxyz', text: 'Oranges' },
            ],
          },
        ],
      });
    }, { timeout: 4500 });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/shared-list-id',
      { method: 'GET' },
    );

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/shared-list-id/items',
      { method: 'GET' },
    );

    global.window.location = location;
  });
});
