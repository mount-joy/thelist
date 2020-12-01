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

describe('useAppState', () => {
  let mockFetch;

  beforeEach(async () => {
    jest.clearAllMocks();
    await clearDB();

    mockFetch = jest.fn().mockImplementation((url, config) => {
      switch (url) {
        case 'https://api.thelist.app/lists':
          return Promise.resolve({ json: async () => ({ Id: 'list-id' }) });

        case 'https://api.thelist.app/lists/list-id/items': {
          if (config.method === 'POST') {
            return Promise.resolve({ json: async () => ({ Id: 'new-item-id' }) });
          }
          return Promise.resolve({
            json: async () => [
              { Id: 's-1234', Name: 'Apples', ListId: 'list-id' },
              { Id: 's-5678', Name: 'Bananas', ListId: 'list-id' },
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

    expect(getState(instance)).toEqual({ items: [], listId: null });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists',
        { body: '{"Name":"Shopping List"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      );
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists/list-id/items',
        { method: 'GET' },
      );
    });

    expect(getState(instance)).toEqual({
      items: [
        { id: 's-1234', key: 's-1234', text: 'Apples' },
        { id: 's-5678', key: 's-5678', text: 'Bananas' },
      ],
      listId: 'list-id',
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
      expect(mockFetch).toHaveBeenCalledWith(...getItemsArgs);
    }, { timeout: 4000 });

    jest.clearAllMocks();
    render(<WrapperComponent />);

    // Second time it is not, the old ID is re-used
    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalledWith(...createListArgs);
      expect(mockFetch).toHaveBeenCalledWith(...getItemsArgs);
    });
  });

  it('when setItems is called the value is updated', async () => {
    const ref = React.createRef();
    const instance = render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.setState({ items: [{ item: 'A' }], listId: null });
    });

    expect(getState(instance)).toEqual({ items: [{ item: 'A' }], listId: null });
  });

  it('uses the previous value the next time', async () => {
    const ref = React.createRef();
    render(<WrapperComponent ref={ref} />);

    await act(async () => {
      await ref.current.actions.setState({ items: [{ item: 'A' }] });
    });

    const instance = render(<WrapperComponent />);

    await waitFor(() => {
      expect(getState(instance).items).toEqual(
        expect.arrayContaining([{ item: 'A' }]),
      );
    });
  });

  describe('updateItemByKey', () => {
    it('when called the item is updated', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', 's-1234');
      });

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Carrots' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists/list-id/items/s-1234',
        { body: '{"Name":"Carrots"}', method: 'PATCH', headers: { 'Content-Type': 'application/json' } },
      );
    });

    it('when called with an invalid key, no item is updated', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      await act(async () => {
        await ref.current.actions.updateItemByKey('Carrots', 's-other');
      });

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      // No patch methods
      expect(mockFetch).not.toHaveBeenCalledWith(expect.any(String), { method: 'PATCH', body: expect.any(String) });
    });
  });

  describe('deleteItemByKey', () => {
    it('when called the item is removed', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      await act(async () => {
        await ref.current.actions.deleteItemByKey('s-5678');
      });

      expect(getState(instance)).toEqual({
        items: [
          { id: 's-1234', key: 's-1234', text: 'Apples' },
        ],
        listId: 'list-id',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.thelist.app/lists/list-id/items/s-5678',
        { method: 'DELETE' },
      );
    });

    it('when called with an invalid key, no item is removed', async () => {
      const ref = React.createRef();
      const instance = render(<WrapperComponent ref={ref} />);

      await waitFor(() => {
        expect(getState(instance)).toEqual({
          items: [
            { id: 's-1234', key: 's-1234', text: 'Apples' },
            { id: 's-5678', key: 's-5678', text: 'Bananas' },
          ],
          listId: 'list-id',
        });
      });

      await act(async () => {
        await ref.current.actions.deleteItemByKey('s-unknown');
      });

      expect(getState(instance)).toEqual({
        items: [
          { id: 's-1234', key: 's-1234', text: 'Apples' },
          { id: 's-5678', key: 's-5678', text: 'Bananas' },
        ],
        listId: 'list-id',
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
    });

    await act(async () => {
      await ref.current.actions.newItem('Carrots');
    });

    expect(getState(instance)).toEqual({
      items: [
        { id: 's-1234', key: 's-1234', text: 'Apples' },
        { id: 's-5678', key: 's-5678', text: 'Bananas' },
        { id: 'new-item-id', key: expect.any(String), text: 'Carrots', isCompleted: false },
      ],
      listId: 'list-id',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items',
      { body: '{"Name":"Carrots"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );
  });
});
