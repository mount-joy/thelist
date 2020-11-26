import createList from './createList';

describe('createList', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({ json: async () => ({ Id: 'new-list-id' }) }));
    global.fetch = mockFetch;
  });

  it('makes request when invoked', async () => {
    const res = await createList('list-name');

    expect(res).toEqual('new-list-id');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists',
      { body: '{"Name":"list-name"}', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );
  });
});
