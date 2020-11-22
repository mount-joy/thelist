export const selectItems = (state) => state.items[state.index] ?? [];
export const selectLists = (state) => state.lists ?? [];
export const selectListId = (state) => state.lists[state.index]?.id ?? null;
