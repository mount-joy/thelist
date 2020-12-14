export const selectItems = (state) => state.lists[state.index]?.items ?? [];
export const selectLists = (state) => state.lists ?? [];
export const selectList = (state) => state.lists[state.index] ?? null;
export const selectListId = (state) => selectList(state)?.id ?? null;
