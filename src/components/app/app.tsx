import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../constants';
import CatalogPage from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';
import {HelmetProvider} from 'react-helmet-async';
import NotFoundPage from '../../pages/not-found/not-found';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<CatalogPage />} />
            <Route
              path={AppRoute.Catalog}
              element={<CatalogPage />}
            />
            <Route
              path={AppRoute.Basket}
              element={<BasketPage />}
            />
            <Route
              path={AppRoute.Product}
              element={<ProductPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
