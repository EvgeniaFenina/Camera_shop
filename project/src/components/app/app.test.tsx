import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import {AppRoute, COUNT_CAMERAS_ON_PAGE, FetchStatus, START_PAGE, NameSpace} from '../../constants';
import {createAPI} from '../../services/api';
import {makeFakeCamera, makeFakePastReview, makeFakePromo} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {State} from '../../types/state';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();
const fakeSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakeReviews = [makeFakePastReview(), makeFakePastReview()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Cameras]: {
    camerasOnPage: fakeCameras,
    currentCamera: fakeCurrentCamera,
    similarCameras: fakeSimilarCameras,
    camerasLoadingStatus: FetchStatus.SUCCESS,
    currentCameraLoadingStatus: FetchStatus.SUCCESS,
    similarCamerasLoadingStatus: FetchStatus.SUCCESS
  },
  [NameSpace.Promo]: {
    promo: fakePromo,
    promoLoadingStatus: FetchStatus.SUCCESS,
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
    reviewsLoadingStatus: FetchStatus.SUCCESS
  }
});

jest.mock('../../components/product-card/product-card', () => () => 'Product Card');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing:', () => {
  beforeEach(window.HTMLHtmlElement.prototype.scrollTo = jest.fn());
  beforeEach(window.Window.prototype.scrollTo = jest.fn());

  it('should render basket when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

  it('should render main screen when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render Product page when user navigate to /cameras/id', () => {
    history.push(AppRoute.Product);

    render(fakeApp);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should render Page 404 when user navigate to unknown url', () => {
    history.push('/something');

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
