import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../constants';
import CatalogPage from '../../pages/catalog/catalog';
import ProductPage from '../../pages/product/product';
import BasketPage from '../../pages/basket/basket';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
