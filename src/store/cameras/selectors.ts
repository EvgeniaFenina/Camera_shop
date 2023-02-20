import {FetchStatus, NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Camera} from '../../types/camera';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const getCamerasLoadingStatus = (state: State): FetchStatus => state[NameSpace.Cameras].camerasLoadingStatus;
export const getCamerasOnPage = (state:State): Camera[] => state[NameSpace.Cameras].camerasOnPage;
