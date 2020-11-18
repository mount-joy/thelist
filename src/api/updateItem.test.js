import updateItem from './updateItem';

describe('updateItem', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({
      json: async () => ({ Id: 'item-id', Name: 'Carrots', ListId: 'list-id' }),
    }));
    global.fetch = mockFetch;
  });

  it('makes request when invoked', async () => {
    const res = await updateItem('list-id', 'item-id', 'Carrots');

    expect(res).toEqual('item-id');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id/items/item-id',
      { body: '{"Name":"Carrots"}', method: 'PATCH', headers: { 'Content-Type': 'application/json' } },
    );
  });
});
