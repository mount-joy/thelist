import reducer from './reducer';

const INITIAL_STATE = {
  lists: [
    { items: [{ id: 'e171e2da', text: 'Beans', key: '1234' }, { id: undefined, text: 'Carrots', key: '1235' }], id: '4434389c', deletedItems: [] },
    { items: [{ id: 'e171e2da', text: 'Rice', key: '5678' }], id: 'c82a3b87', deletedItems: [] },
  ],
  index: 0,
};

describe('reducer', () => {
  describe('Merge Items', () => {
    it('adds new items and uses the key as the ID', () => {
      const action = {
        type: 'MERGE_ITEMS',
        data: {
          listId: '4434389c',
          items: [
            { id: 'e171e2da', text: 'Beans' },
            { id: '7a276778', text: 'Mushrooms' },
          ],
        },
      };

      expect(reducer(INITIAL_STATE, action)).toEqual({
        lists: [
          {
            id: '4434389c',
            items: [
              { id: 'e171e2da', text: 'Beans', key: '1234' },
              { id: undefined, text: 'Carrots', key: '1235' },
              { id: '7a276778', text: 'Mushrooms', key: '7a276778' },
            ],
            deletedItems: [],
          },
          { items: [{ id: 'e171e2da', text: 'Rice', key: '5678' }], id: 'c82a3b87', deletedItems: [] },
        ],
        index: 0,
      });
    });

    it('removes deleted items', () => {
      const action = {
        type: 'MERGE_ITEMS',
        data: {
          listId: 'c82a3b87',
          items: [
            { id: 'd940a81d', text: 'Miso' },
            { id: '7a276778', text: 'Mushrooms' },
          ],
        },
      };

      expect(reducer(INITIAL_STATE, action)).toEqual({
        lists: [
          {
            items: [
              { id: 'e171e2da', text: 'Beans', key: '1234' },
              { id: undefined, text: 'Carrots', key: '1235' },
            ],
            id: '4434389c',
            deletedItems: [],
          },
          {
            items: [
              { id: 'd940a81d', text: 'Miso', key: 'd940a81d' },
              { id: '7a276778', text: 'Mushrooms', key: '7a276778' },
            ],
            id: 'c82a3b87',
            deletedItems: [{ id: 'e171e2da', text: 'Rice', key: '5678' }],
          },
        ],
        index: 0,
      });
    });
  });
});
