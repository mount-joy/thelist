export const types = {
  SET_LIST_ID: 'SET_LIST_ID',
  SET_ITEMS: 'SET_ITEMS',
  NEW_ITEM: 'NEW_ITEM',
  DELETE_ITEM_BY_KEY: 'DELETE_ITEM_BY_KEY',
  UPDATE_ITEM_BY_KEY: 'UPDATE_ITEM_BY_KEY',
  TOGGLE_COMPLETION_BY_KEY: 'TOGGLE_COMPLETION_BY_KEY',
  TOGGLE_EDIT_MODE_BY_KEY: 'TOGGLE_EDIT_MODE_BY_KEY',
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
      const newItem = {
        id,
        isCompleted: false,
        isEditable: false,
        key,
        text,
      };
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

    case types.TOGGLE_COMPLETION_BY_KEY: {
      const { key } = data;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.key !== key) {
            return item;
          }
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }),
      };
    }

    case types.TOGGLE_EDIT_MODE_BY_KEY: {
      const { key } = data;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.key !== key) {
            return {
              ...item,
              isEditable: false,
            };
          }
          return {
            ...item,
            isEditable: true,
          };
        }),
      };
    }

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
        .map((item) => ({ ...item, key: item.id }));
      return { ...state, items: [...state.items, ...unknownItems] };
    }

    default:
      throw new Error(`Action not recognised: ${type}`);
  }
};

export default reducer;
