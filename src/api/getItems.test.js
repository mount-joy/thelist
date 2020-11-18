import getItems from './getItems';

describe('getItems', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({
      json: async () => [
        { Id: 'item-1', Name: 'Apples' },
        { Id: 'item-2', Name: 'Bananas' },
      ],
    }));
    global.fetch = mockFetch;
  });
  it('makes request when invoked', async () => {
    const res = await getItems('list-id');

    expect(res).toEqual([
      { id: 'item-1', text: 'Apples' },
      { id: 'item-2', text: 'Bananas' },
    ]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items',
      { method: 'GET' },
    );
  });
});
