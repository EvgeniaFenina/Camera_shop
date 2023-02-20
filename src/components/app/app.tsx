import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../constants';
import CatalogPage from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';
import {HelmetProvider} from 'react-helmet-async';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog}>
            <Route index element={<CatalogPage />} />
            <Route
              path={AppRoute.CatalogPage}
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
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
