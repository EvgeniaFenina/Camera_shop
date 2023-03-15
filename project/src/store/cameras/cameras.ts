import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchCameras, fetchCamerasOnPage, fetchCurrentCamera, fetchSimilarCameras} from '../api-actions';
import {Camera} from '../../types/camera';

type CamerasData = {
  cameras: Camera[];
  camerasLoadingStatus: FetchStatus;
  camerasOnPage: Camera[];
  currentCamera: Camera | null;
  currentCameraLoadingStatus: FetchStatus;
  similarCameras: Camera[];
  similarCamerasLoadingStatus: FetchStatus;
};

const initialState: CamerasData = {
  cameras: [],
  camerasLoadingStatus: FetchStatus.IDLE,
  camerasOnPage: [],
  currentCamera: null,
  currentCameraLoadingStatus: FetchStatus.IDLE,
  similarCameras: [],
  similarCamerasLoadingStatus: FetchStatus.IDLE
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
      })
      .addCase(fetchCurrentCamera.pending, (state) => {
        state.currentCameraLoadingStatus = FetchStatus.LOADING;
      })
      .addCase(fetchCurrentCamera.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.currentCameraLoadingStatus = FetchStatus.SUCCESS;
      })
      .addCase(fetchCurrentCamera.rejected, (state) => {
        state.currentCameraLoadingStatus = FetchStatus.FAILED;
      })
      .addCase(fetchSimilarCameras.pending, (state) => {
        state.similarCamerasLoadingStatus = FetchStatus.LOADING;
      })
      .addCase(fetchSimilarCameras.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.similarCamerasLoadingStatus = FetchStatus.SUCCESS;
      })
      .addCase(fetchSimilarCameras.rejected, (state) => {
        state.similarCamerasLoadingStatus = FetchStatus.FAILED;
      });
  }
});
