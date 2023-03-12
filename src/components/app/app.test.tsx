import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, FetchStatus} from '../../constants';
import App from './app';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    camerasLoadingStatus: FetchStatus.FAILED,
    promoLoadingStatus: FetchStatus.FAILED
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render "ProductScreen" when user navigate to "/product"', () => {
    history.push(AppRoute.Product);

    render(fakeApp);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push(AppRoute.NotFound);

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
