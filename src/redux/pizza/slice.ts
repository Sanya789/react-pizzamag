import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFetchPizzasArgs, TPizzaBlock, IPizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: TFetchPizzasArgs) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<TPizzaBlock[]>(
    `https://635d6c8ab13fd8c8607d9d23.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as TPizzaBlock[];
});

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaBlock[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
          state.status = Status.LOADING;
          state.items = []; 
      });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS; 
      });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = []; 
       });
  }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
