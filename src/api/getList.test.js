import getList from './getList';

describe('getList', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(async () => ({
      json: async () => ({ Id: 'list-1', Name: 'Shopping List' }),
    }));
    global.fetch = mockFetch;
  });
  it('makes request when invoked', async () => {
    const res = await getList('list-id');

    expect(res).toEqual({ id: 'list-1', name: 'Shopping List' });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thelist.app/lists/list-id',
      { method: 'GET' },
    );
  });
});
