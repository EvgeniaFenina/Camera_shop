import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, START_PAGE, COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchCameras} from '../api-actions';

type UserAction = {
  pages: number;
  currentPage: number;
  countCamerasOnPage: number;
}

const initialState: UserAction = {
  pages: 0,
  currentPage: START_PAGE,
  countCamerasOnPage: COUNT_CAMERAS_ON_PAGE
};

export const userActions = createSlice({
  name: NameSpace.Action,
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{page: number}>) => {
      const {page} = action.payload;

      state.currentPage = page;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.pages = Math.ceil((action.payload.length) / (state.countCamerasOnPage));
      });
  }
});

export const {changePage} = userActions.actions;
