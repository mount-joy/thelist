export const types = {
  NEW_LIST: 'NEW_LIST',
  SET_STATE: 'SET_STATE',
  NEW_ITEM: 'NEW_ITEM',
  DELETE_ITEM_BY_KEY: 'DELETE_ITEM_BY_KEY',
  UPDATE_ITEM_BY_KEY: 'UPDATE_ITEM_BY_KEY',
  TOGGLE_COMPLETION_BY_KEY: 'TOGGLE_COMPLETION_BY_KEY',
  STORE_ID: 'STORE_ID',
  STORE_LIST_ID: 'STORE_LIST_ID',
  MERGE_ITEMS: 'MERGE_ITEMS',
};

export const initialState = { items: [], lists: [], index: 0 };

const reducer = (state, { type, data }) => {
  switch (type) {
    case types.NEW_LIST: {
      const { key, name } = data;
      return {
        ...state,
        items: [...state.items, []],
        lists: [...state.lists, { key, name }],
      };
    }

    case types.SET_STATE:
      return data.state != null ? data.state : state;

    case types.NEW_ITEM: {
      const { text, id, key } = data;
      const newItem = {
        id,
        isCompleted: false,
        key,
        text,
      };
      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== state.index) {
            return items;
          }
          return [...items, newItem];
        }),
      };
    }

    case types.DELETE_ITEM_BY_KEY:
      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== state.index) {
            return items;
          }
          return items.filter(({ key }) => key !== data.key);
        }),
      };

    case types.UPDATE_ITEM_BY_KEY: {
      const { key, text } = data;
      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== state.index) {
            return items;
          }
          return items.map((item) => {
            if (item.key !== key) {
              return item;
            }
            return {
              ...item,
              text,
            };
          });
        }),
      };
    }

    case types.TOGGLE_COMPLETION_BY_KEY: {
      const { key } = data;
      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== state.index) {
            return items;
          }
          return items.map((item) => {
            if (item.key !== key) {
              return item;
            }
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };
          });
        }),
      };
    }

    case types.STORE_ID: {
      const { key, id } = data;
      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== state.index) {
            return items;
          }
          return items.map((item) => {
            if (item.key !== key) {
              return item;
            }
            return {
              ...item,
              id,
            };
          });
        }),
      };
    }

    case types.STORE_LIST_ID: {
      const { key, id } = data;
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.key !== key) {
            return list;
          }
          return {
            ...list,
            id,
          };
        }),
      };
    }

    case types.MERGE_ITEMS: {
      const { listId } = data;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      const existingIds = state.items[listIndex]?.map((item) => item.id);
      const unknownItems = data.items
        .filter((item) => !existingIds.includes(item.id))
        .map((item) => ({ ...item, key: item.id }));

      return {
        ...state,
        items: state.items.map((items, index) => {
          if (index !== listIndex) {
            return items;
          }
          return [...items, ...unknownItems];
        }),
      };
    }

    default:
      throw new Error(`Action not recognised: ${type}`);
  }
};

export default reducer;
