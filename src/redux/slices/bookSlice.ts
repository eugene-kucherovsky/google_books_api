import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from '../../settings/constants';
import type { Item } from "./searchSlice";

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (id: string) => {
    const URL = `${API_URL}/books/v1/volumes/${id}?&key=${API_KEY}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();
    return results;
  }
);

type BookState = {
  item: Item | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
};

export const initialState: BookState = {
  item: null,
  status: "idle",
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = "fulfilled";
        state.error = null;
        state.item = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message!;
      });
  },
});

export default bookSlice.reducer;
