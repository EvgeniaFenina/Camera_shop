import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../constants';
import CatalogPage from '../../pages/catalog/catalog-page';
import ProductPage from '../../pages/product/product-page';
import BasketPage from '../../pages/basket/basket-page';
import {HelmetProvider} from 'react-helmet-async';
import NotFoundPage from '../../pages/not-found/not-found-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}

export default App;
