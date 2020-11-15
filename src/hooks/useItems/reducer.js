export const types = {
  SET_LIST_ID: 'SET_LIST_ID',
  SET_ITEMS: 'SET_ITEMS',
  NEW_ITEM: 'NEW_ITEM',
  DELETE_ITEM_BY_KEY: 'DELETE_ITEM_BY_KEY',
  UPDATE_ITEM_BY_KEY: 'UPDATE_ITEM_BY_KEY',
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

    case types.UPDATE_ITEM_BY_KEY: {
      const { key, text } = data;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.key !== key) {
            return item;
          }
          return {
            ...item,
            text,
          };
        }),
      };
    }

    default:
      throw new Error(`Action not recognised: ${type}`);
  }
};

export default reducer;
