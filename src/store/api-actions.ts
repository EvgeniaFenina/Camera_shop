import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Camera} from '../types/camera';
import {APIRoute} from '../constants';
import {pushNotification} from './notifications/notifications';


export const fetchCameras = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(APIRoute.Cameras);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get cameras'}));
      throw error;
    }
  }
);
