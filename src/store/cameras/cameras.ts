import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchCameras, fetchCamerasOnPage} from '../api-actions';
import {Camera} from '../../types/camera';

type CamerasData = {
  cameras: Camera[];
  camerasLoadingStatus: FetchStatus;
  camerasOnPage: Camera[];
};

const initialState: CamerasData = {
  cameras: [],
  camerasLoadingStatus: FetchStatus.IDLE,
  camerasOnPage: [],
};

export const cameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.camerasLoadingStatus = FetchStatus.LOADING;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.camerasLoadingStatus = FetchStatus.SUCCESS;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.camerasLoadingStatus = FetchStatus.FAILED;
      })
      .addCase(fetchCamerasOnPage.fulfilled, (state, action) => {
        state.camerasOnPage = action.payload;
      });
  }
});
