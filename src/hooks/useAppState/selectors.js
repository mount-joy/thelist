export const selectItems = (state) => state.lists[state.index]?.items ?? [];
export const selectLists = (state) => state.lists ?? [];
export const selectListId = (state) => state.lists[state.index]?.id ?? null;
export const selectListName = (state) => state.lists[state.index]?.name ?? null;
