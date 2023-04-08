import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Camera} from '../types/camera';
import {APIRoute, AppRoute} from '../constants';
import {pushNotification} from './notifications/notifications';
import {Promo} from '../types/promo.js';
import {StatusCodes} from 'http-status-codes';
import {redirectToRoute} from './action';
import {Review, PostReview} from '../types/review.js';


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

export const fetchCamerasOnPage = createAsyncThunk<Camera[], [number, number], {
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

export const fetchCurrentCamera = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentCamera',
  async (cameraId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
      dispatch(pushNotification({type: 'error', message: 'Failed to get hotel'}));
      throw error;
    }
  }
);

export const fetchSimilarCameras = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (cameraId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraId}/similar`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get cameras'}));
      throw error;
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (cameraId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraId}/reviews`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get reviews'}));
      throw error;
    }
  }
);

export const postReview = createAsyncThunk<Review, PostReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'app/postReview',
  async (review, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review>(`${APIRoute.Reviews}`, review);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to send review'}));
      throw error;
    }
  }
);

export const fetchSearchResult = createAsyncThunk<Camera[] | undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchResults',
  async (searchPhrase, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?name_like=${searchPhrase}`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get search result'}));
      throw error;
    }
  }
);

export const fetchSortCameras = createAsyncThunk<Camera[], [string, string], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSortCameras',
  async ([sortType, sortOrder], {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?_sort=${sortType}&_order=${sortOrder}`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get sort cameras'}));
      throw error;
    }
  }
);

export const fetchSortCamerasOnPage = createAsyncThunk<Camera[], [string, string, number, number], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSortCamerasOnPage',
  async ([sortType, sortOrder, start, end], {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?_sort=${sortType}&_order=${sortOrder}&_start=${start}&_end=${end}`);

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get sort cameras on page'}));
      throw error;
    }
  }
);
