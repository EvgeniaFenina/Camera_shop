import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, FetchStatus, NameSpace} from '../../constants';
import {makeFakePromo} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import Navigation from './header-navigation';

const mockStore = configureMockStore();
const fakePromo = makeFakePromo();

const store = mockStore({
  [NameSpace.Promo]: {
    promo: fakePromo,
    promoLoadingStatus: FetchStatus.SUCCESS
  }
});

const history = createMemoryHistory();

describe('Header navigation component', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Navigation />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });

  it('should redirect to Catalog screen when user click on link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>Каталог фото- и видео техники</h1>}
            />
            <Route
              path='*'
              element={<Navigation />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Каталог фото- и видео техники/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Каталог'));

    expect(screen.getByText(/Каталог фото- и видео техники/i)).toBeInTheDocument();
  });
});
