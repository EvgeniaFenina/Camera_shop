import {useEffect} from 'react';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductList from '../../components/product-list/product-list';
import SortForm from '../../components/sort-form/sort-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentPage} from '../../store/app/selectors';
import {getCamerasOnPage} from '../../store/cameras/selectors';
import {COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchCamerasOnPage} from '../../store/api-actions';

function CatalogPage(): JSX.Element {
  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const currentPage = useAppSelector(getCurrentPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * COUNT_CAMERAS_ON_PAGE;
    const endIndex = startIndex + COUNT_CAMERAS_ON_PAGE;
    dispatch(fetchCamerasOnPage([startIndex, endIndex]));
  }, [currentPage, dispatch]);

  return (
    <Layout>
      <main>
        <Banner />
        <div className="page-content">
          <BreadCrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <FilterForm />
                </div>
                <div className="catalog__content">
                  <SortForm />
                  <ProductList products={camerasOnPage} />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default CatalogPage;

