import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchCameras} from '../api-actions';
import {Camera} from '../../types/camera';

type CamerasData = {
  cameras: Camera[];
  camerasLoadingStatus: FetchStatus;
};

const initialState: CamerasData = {
  cameras: [],
  camerasLoadingStatus: FetchStatus.IDLE,
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
      });
  }
});
