import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Camera, FetchCameraMinMaxPricePayloadType, FetchCameraPayloadType} from '../types/camera';
import {APIRoute, AppRoute} from '../constants';
import {pushNotification} from './notifications/notifications';
import {Promo} from '../types/promo.js';
import {StatusCodes} from 'http-status-codes';
import {redirectToRoute} from './action';
import {Review, PostReview} from '../types/review.js';
import {setPagesCount} from './app/app';

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

export const fetchCamerasOnPage = createAsyncThunk<Camera[], FetchCameraPayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilteredCamerasOnPage',
  async ({params}, {dispatch, extra: api}) => {
    const {category, level, type, minPrice, maxPrice, sort, order, startPage, endPage} = params;
    try {
      const {data, headers} = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          'category': category,
          'level': level,
          'type': type,
          'price_gte': minPrice,
          'price_lte': maxPrice,
          '_sort': sort,
          '_order': order,
          '_start': startPage,
          '_end': endPage
        }
      });

      const camerasCount = Number(headers['x-total-count']);

      dispatch(setPagesCount({camerasCount}));

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get filtered cameras on page'}));
      throw error;
    }
  }
);

export const fetchFilteredCamerasMinMaxPrice = createAsyncThunk<Camera[], FetchCameraMinMaxPricePayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilteredCamerasMinMaxPrice',
  async ({params}, {dispatch, extra: api}) => {
    const {category, level, type} = params;
    try {
      const {data} = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          'category': category,
          'level': level,
          'type': type,
        }
      });

      return data;
    } catch (error) {
      dispatch(pushNotification({type: 'error', message: 'Failed to get filtered cameras on page'}));
      throw error;
    }
  }
);
