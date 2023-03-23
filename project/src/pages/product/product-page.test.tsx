import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { COUNT_CAMERAS_ON_PAGE, FetchStatus, NameSpace, START_PAGE } from '../../constants';
import { makeFakeCamera, makeFakePastReview, makeFakePromo } from '../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-route/history-route';
import Product from './product-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();
const fakeReviews = [makeFakePastReview(), makeFakePastReview()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Cameras]: {
    camerasOnPage: fakeCameras,
    camerasLoadingStatus: FetchStatus.SUCCESS,
    currentCamera: fakeCurrentCamera,
    currentCameraLoadingStatus: FetchStatus.SUCCESS,
    similarCameras: fakeCameras,
    similarCamerasLoadingStatus: FetchStatus.SUCCESS
  },
  [NameSpace.Promo]: {
    promo: fakePromo,
    promoLoadingStatus: FetchStatus.SUCCESS
  },
  [NameSpace.Action]: {
    currentPage: START_PAGE,
    countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
    pages: 1
  },
  [NameSpace.Modal]: {
    activeCamera: fakeCurrentCamera,
    isAddCartModalOpen: false,
    isAddReviewModalOpen: false,
    isReviewSuccessModalOpen: false
  },
  [NameSpace.Reviews]: {
    reviews: fakeReviews,
    reviewsLoadingStatus: FetchStatus.SUCCESS,
  }
});

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Product page', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Product />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.queryAllByText(fakeCurrentCamera.name)).toHaveLength(2);
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.queryByText('Сервер недоступен. Перезагрузите, пожалуйста, страницу')).not.toBeInTheDocument();
  });

  it('should render error text when server is not available', () => {

    const errorStore = mockStore({
      [NameSpace.Cameras]: {
        camerasOnPage: fakeCameras,
        camerasLoadingStatus: FetchStatus.SUCCESS,
        currentCamera: null,
        currentCameraLoadingStatus: FetchStatus.FAILED,
        similarCameras: fakeCameras,
        similarCamerasLoadingStatus: FetchStatus.SUCCESS
      },
      [NameSpace.Promo]: {
        promo: fakePromo,
        promoLoadingStatus: FetchStatus.SUCCESS
      },
      [NameSpace.Action]: {
        currentPage: START_PAGE,
        countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
        pages: 1
      },
      [NameSpace.Modal]: {
        activeCamera: fakeCurrentCamera,
        isAddCartModalOpen: false,
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        reviewsLoadingStatus: FetchStatus.SUCCESS,
      }
    });

    render(
      <Provider store={errorStore}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Product />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );
    expect(screen.getByText('Сервер недоступен. Перезагрузите, пожалуйста, страницу')).toBeInTheDocument();
    expect(screen.queryByText(fakeCurrentCamera.name)).not.toBeInTheDocument();
  });
});
