export const types = {
  SET_LIST_ID: 'SET_LIST_ID',
  SET_ITEMS: 'SET_ITEMS',
  NEW_ITEM: 'NEW_ITEM',
  DELETE_ITEM_BY_KEY: 'DELETE_ITEM_BY_KEY',
  UPDATE_ITEM_BY_KEY: 'UPDATE_ITEM_BY_KEY',
  STORE_ID: 'STORE_ID',
  MERGE_ITEMS: 'MERGE_ITEMS',
};

export const initialState = { items: [], listId: null };

const reducer = (state, { type, data }) => {
  switch (type) {
    case types.SET_LIST_ID:
      return { ...state, listId: data.listId };

    case types.SET_ITEMS:
      return { ...state, items: data.items };

    case types.NEW_ITEM: {
      const { text, id, key } = data;
      const newItem = { text, id, key };
      return { ...state, items: [...state.items, newItem] };
    }

    case types.DELETE_ITEM_BY_KEY:
      return { ...state, items: state.items.filter(({ key }) => key !== data.key) };

    case types.STORE_ID: {
      const items = state.items.map((item) => {
        if (item.key !== data.key) {
          return item;
        }
        return {
          ...item,
          id: data.id,
        };
      });
      return { ...state, items };
    }

    case types.MERGE_ITEMS: {
      const existingIds = state.items.map((item) => item.id);
      const unknownItems = data.items
        .filter((item) => !existingIds.includes(item.id))
        .map((item) => ({ ...item, key: Date.now() }));
      return { ...state, items: [...state.items, ...unknownItems] };
    }

    default:
      throw new Error(`Action not recognised: ${type}`);
  }
};

export default reducer;
