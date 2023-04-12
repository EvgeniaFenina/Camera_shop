import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, START_PAGE, COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchFilteredCamerasMinMaxPrice} from '../api-actions';

export type UserAction = {
  pages: number;
  currentPage: number;
  countCamerasOnPage: number;
  currentSortType: string | null;
  currentSortOrder: string | null;
  currentFilterCategory: string | null;
  currentFilterLevel: string[];
  currentFilterType: string[];
  currentMinPrice: number | null;
  currentMaxPrice: number | null;
  minPriceInPlaceholder: number;
  maxPriceInPlaceholder: number;
}

const initialState: UserAction = {
  pages: 0,
  currentPage: START_PAGE,
  countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
  currentSortType: null,
  currentSortOrder: null,
  currentFilterCategory: null,
  currentFilterLevel: [],
  currentFilterType: [],
  currentMinPrice: null,
  currentMaxPrice: null,
  minPriceInPlaceholder: 0,
  maxPriceInPlaceholder: 0
};

export const userActions = createSlice({
  name: NameSpace.Action,
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{page: number}>) => {
      const {page} = action.payload;

      state.currentPage = page;
    },
    setPagesCount: (state, action: PayloadAction<{camerasCount: number}>) => {
      const {camerasCount} = action.payload;

      state.pages = Math.ceil((camerasCount / state.countCamerasOnPage));
    },
    changeSortType: (state, action: PayloadAction<{sortType: string | null}>) => {
      const {sortType} = action.payload;

      state.currentSortType = sortType;
    },
    changeSortOrder: (state, action: PayloadAction<{sortOrder: string | null}>) => {
      const {sortOrder} = action.payload;

      state.currentSortOrder = sortOrder;
    },
    addFilterCategory: (state, action: PayloadAction<{filterCategory: string | null}>) => {
      const {filterCategory} = action.payload;
      if (state.currentFilterCategory === filterCategory) {
        state.currentFilterCategory = null;
      } else {
        state.currentFilterCategory = filterCategory;
      }
    },
    addFilterLevel: (state, action: PayloadAction<{filterLevel: string}>) => {
      const {filterLevel} = action.payload;
      if (state.currentFilterLevel.includes(filterLevel)) {
        const indexToDelete = state.currentFilterLevel.indexOf(filterLevel);
        state.currentFilterLevel.splice(indexToDelete, 1);
      } else {
        state.currentFilterLevel.push(filterLevel);
      }
    },
    addFilterType: (state, action: PayloadAction<{filterType: string}>) => {
      const {filterType} = action.payload;
      if (state.currentFilterType.includes(filterType)) {
        const indexToDelete = state.currentFilterType.indexOf(filterType);
        state.currentFilterType.splice(indexToDelete, 1);
      } else {
        state.currentFilterType.push(filterType);
      }
    },
    removeFilterType: (state, action: PayloadAction<{filterType: string}>) => {
      const {filterType} = action.payload;
      const indexToDelete = state.currentFilterType.indexOf(filterType);

      state.currentFilterType.splice(indexToDelete, 1);
    },
    setMinPrice: (state, action: PayloadAction<{minPrice: number}>) => {
      const {minPrice} = action.payload;

      state.currentMinPrice = minPrice;
    },
    setMaxPrice: (state, action: PayloadAction<{maxPrice: number}>) => {
      const {maxPrice} = action.payload;

      state.currentMaxPrice = maxPrice;
    },
    clearFilterCategory: (state) => {
      state.currentFilterCategory = null;
    },
    clearFilterLevel: (state) => {
      state.currentFilterLevel = [];
    },
    clearFilterType: (state) => {
      state.currentFilterType = [];
    },
    clearMinPrice: (state) => {
      state.currentMinPrice = null;
    },
    clearMaxPrice: (state) => {
      state.currentMaxPrice = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilteredCamerasMinMaxPrice.fulfilled, (state, action) => {
        const cameras = action.payload;

        const prices = cameras.reduce((acc: number[], camera) => [...acc, camera.price], []);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        state.minPriceInPlaceholder = minPrice;
        state.maxPriceInPlaceholder = maxPrice;
      });
  }
});

export const {
  changePage,
  changeSortType,
  changeSortOrder,
  addFilterCategory,
  addFilterLevel,
  addFilterType,
  clearFilterCategory,
  clearFilterLevel,
  clearFilterType,
  setMinPrice,
  setMaxPrice,
  clearMinPrice,
  clearMaxPrice,
  setPagesCount,
  removeFilterType
} = userActions.actions;
