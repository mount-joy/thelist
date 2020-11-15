import deleteItem from './deleteItem';

describe('deleteItem', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({ json: async () => null }));
    global.fetch = mockFetch;
  });

  it('makes request when invoked', async () => {
    const res = await deleteItem('list-id', 'item-id');

    expect(res).toEqual(null);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items/item-id',
      { method: 'DELETE' },
    );
  });
});
