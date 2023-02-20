import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Camera} from '../types/camera';
import {APIRoute} from '../constants';
import {pushNotification} from './notifications/notifications';
import {Promo} from '../types/promo.js';


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

export const fetchPromo = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Promo>(APIRoute.Promo);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get promo'}));
      throw error;
    }
  }
);

export const fetchCamerasOnPage = createAsyncThunk<Camera[],[number, number], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasOnPage',
  async ([start, end], {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_end=${end}`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get cameras on page'}));
      throw error;
    }
  }
);

