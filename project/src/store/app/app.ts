import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, START_PAGE, COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchCameras, fetchSortCameras} from '../api-actions';

export type UserAction = {
  pages: number;
  currentPage: number;
  countCamerasOnPage: number;
  currentSortType: string;
  currentSortOrder: string;
}

const initialState: UserAction = {
  pages: 0,
  currentPage: START_PAGE,
  countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
  currentSortType: '',
  currentSortOrder: ''
};

export const userActions = createSlice({
  name: NameSpace.Action,
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{page: number}>) => {
      const {page} = action.payload;

      state.currentPage = page;
    },
    changeSortType: (state, action: PayloadAction<{sortType: string}>) => {
      const {sortType} = action.payload;

      state.currentSortType = sortType;
    },
    changeSortOrder: (state, action: PayloadAction<{sortOrder: string}>) => {
      const {sortOrder} = action.payload;

      state.currentSortOrder = sortOrder;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.pages = Math.ceil((action.payload.length) / (state.countCamerasOnPage));
      })
      .addCase(fetchSortCameras.fulfilled, (state, action) => {
        state.pages = Math.ceil((action.payload.length) / (state.countCamerasOnPage));
      });
  }
});

export const {changePage, changeSortType, changeSortOrder} = userActions.actions;
