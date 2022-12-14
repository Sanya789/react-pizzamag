import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, SortPropertyEnum, TSort } from './types';

const initialState: IFilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности(desc)', sortProperty: SortPropertyEnum.RATING_DESC },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
