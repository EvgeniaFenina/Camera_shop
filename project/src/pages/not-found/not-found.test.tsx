import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import {AppRoute} from '../../constants';
import NotFoundPage from './not-found';

const history = createMemoryHistory();

describe('Component Page 404:', () => {

  it('should render correctly:', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </HelmetProvider>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to Main screen when user click on link', async () => {
    history.push('/fake');

    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>This is Main page</h1>}
            />
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    );

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Вернуться на главную'));

    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
