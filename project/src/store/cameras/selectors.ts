import {FetchStatus, NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Camera} from '../../types/camera';
import {createSelector} from '@reduxjs/toolkit';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const getCamerasLoadingStatus = (state: State): FetchStatus => state[NameSpace.Cameras].camerasLoadingStatus;

export const getCamerasStatus = createSelector([getCamerasLoadingStatus], (status) => ({
  isLoading: status === FetchStatus.LOADING,
  isSuccess: status === FetchStatus.SUCCESS,
  isFailed: status === FetchStatus.FAILED
}));

export const getCamerasOnPage = (state:State): Camera[] => state[NameSpace.Cameras].camerasOnPage;

export const getCurrentCamera = (state: State): Camera | null => state[NameSpace.Cameras].currentCamera;
export const getCurrentCameraLoadingStatus = (state: State): FetchStatus => state[NameSpace.Cameras].currentCameraLoadingStatus;

export const getCurrentCameraStatus = createSelector([getCurrentCameraLoadingStatus], (status) => ({
  isLoading: status === FetchStatus.LOADING,
  isSuccess: status === FetchStatus.SUCCESS,
  isFailed: status === FetchStatus.FAILED
}));


export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Cameras].similarCameras;
export const getSimilarCamerasLoadingStatus = (state: State): FetchStatus => state[NameSpace.Cameras].similarCamerasLoadingStatus;

