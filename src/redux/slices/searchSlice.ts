import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from "../../settings/constants";

type SearchOptions = {
  query: string;
  startIndex: number;
  category: string;
  orderBy: string;
};

type IndustryIdentifier = {
  type: string;
  identifier: string;
};

type ReadingModes = {
  text: boolean;
  image: boolean;
};

type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
};

type ImageLinks = {
  extraLarge: string;
  large: string;
  medium: string;
  small: string;
  smallThumbnail: string;
  thumbnail: string;
};

type VolumeInfo = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
};

type SaleInfo = {
  country: string;
  isEbook: boolean;
  saleability: string;
};

type SearchInfo = {
  textSnippet: string;
};

export type Item = {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  saleInfo: SaleInfo;
  volumeInfo: VolumeInfo;
  searchInfo: SearchInfo;
};

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async ({ query, category, orderBy, startIndex }: SearchOptions) => {
    const URL = `${API_URL}/books/v1/volumes?q=${query}+'subject:'${category}&startIndex=${startIndex}&orderBy=${orderBy}&maxResults=40&key=${API_KEY}`;
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

type SearchState = {
  items: Item[];
  totalItems: number;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  searchOptions: SearchOptions;
  availableCategories: string[];
  availableOrders: string[];
};

export const initialState: SearchState = {
  items: [],
  totalItems: 0,
  status: "idle",
  error: null,
  searchOptions: {
    query: "",
    category: "all",
    orderBy: "relevance",
    startIndex: 0,
  },
  availableCategories: [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
  ],
  availableOrders: ["relevance", "newest"],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchOptions.query = action.payload;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.searchOptions.category = action.payload;
    },
    changeSort(state, action: PayloadAction<string>) {
      state.searchOptions.orderBy = action.payload;
    },
    changeStartIndex(state) {
      state.searchOptions.startIndex += 40;
    },
    clearStartIndex(state) {
      state.searchOptions.startIndex = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;

        const filterByUniqueId = (array: Item[]) => {
          let unique = [
            ...new Map(array.map((item) => [item["id"], item])).values(),
          ].sort((a, b) => {
            return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
          });

          return unique;
        };

        if (state.searchOptions.startIndex === 0) {
          state.items = filterByUniqueId(action.payload.items);
          state.totalItems = action.payload.totalItems;
        } else {
          state.items = filterByUniqueId(
            state.items.concat(action.payload.items)
          );
        }
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message!;
      });
  },
});
export const {
  changeSearchValue,
  changeCategory,
  changeSort,
  changeStartIndex,
  clearStartIndex,
} = searchSlice.actions;
export default searchSlice.reducer;
