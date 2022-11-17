import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TFetchPizzasArgs = {
  sortBy: string; 
  order: string; 
  category: string; 
  search: string; 
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: TFetchPizzasArgs) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<TPizzaBlock[]>(
    `https://635d6c8ab13fd8c8607d9d23.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as TPizzaBlock[];
});

type TPizzaBlock = {
  id: string;
  title: string;
  price: number;
  imageUrl: string; 
  sizes: number[]; 
  types: number[];
  rating: number;
}

enum Status {
LOADING = 'loading',
SUCCESS = 'success',
ERROR = 'error',
}

interface IPizzaSliceState {
  items: TPizzaBlock[];
  status: Status;
}

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
