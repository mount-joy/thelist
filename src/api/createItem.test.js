import createItem from './createItem';

describe('createItem', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({ json: async () => ({ Id: 'new-item-id' }) }));
    global.fetch = mockFetch;
  });

  it('makes request when invoked', async () => {
    const res = await createItem('list-id', 'item-name');

    expect(res).toEqual('new-item-id');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items',
      { body: '{"Name":"item-name"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );
  });
});
