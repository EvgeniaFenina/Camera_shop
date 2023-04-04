import {FetchStatus} from '../../constants';
import {makeFakeCamera} from '../../utils/mock';
import {fetchCameras, fetchCurrentCamera, fetchSimilarCameras} from '../api-actions';
import {cameras} from './cameras';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakeCurrentCamera = makeFakeCamera();

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Reducer: cameras', () => {

  it('without additional parameters should return initial state', () => {
    expect(cameras.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      });
  });
  describe('fetch cameras array:', () => {

    it('add in state cameras array and change Fetch status', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCameras.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          cameras: fakeCameras,
          camerasLoadingStatus: FetchStatus.SUCCESS,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on error when server is not available', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCameras.rejected.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.FAILED,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on pending when server loading', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCameras.pending.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.LOADING,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });
  });

  describe('fetch current camera:', () => {

    it('change Fetch status on error when server is not available', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.rejected.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.FAILED,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.pending.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.LOADING,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on success and add current camera', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.fulfilled.type, payload: fakeCurrentCamera}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: fakeCurrentCamera,
          currentCameraLoadingStatus: FetchStatus.SUCCESS,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.IDLE,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });
  });

  describe('fetch similar cameras:', () => {

    it('change Fetch status on error when server is not available', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.rejected.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.FAILED,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.pending.type}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: [],
          similarCamerasLoadingStatus: FetchStatus.LOADING,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });

    it('change Fetch status on success and add similar cameras', () => {
      const state = {
        cameras: [],
        camerasLoadingStatus: FetchStatus.IDLE,
        camerasOnPage: [],
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.IDLE,
        similarCameras: [],
        similarCamerasLoadingStatus: FetchStatus.IDLE,
        searchCameras: [],
        searchLoadingStatus: FetchStatus.IDLE,
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          cameras: [],
          camerasLoadingStatus: FetchStatus.IDLE,
          camerasOnPage: [],
          currentCamera: null,
          currentCameraLoadingStatus: FetchStatus.IDLE,
          similarCameras: fakeCameras,
          similarCamerasLoadingStatus: FetchStatus.SUCCESS,
          searchCameras: [],
          searchLoadingStatus: FetchStatus.IDLE,
        });
    });
  });
});
