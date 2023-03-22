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
import {getCamerasOnPage, getCamerasStatus} from '../../store/cameras/selectors';
import {COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchCamerasOnPage} from '../../store/api-actions';
import {getAddCartModalStatus} from '../../store/modal/selectors';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';

function CatalogPage(): JSX.Element {
  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const camerasStatus = useAppSelector(getCamerasStatus);
  const currentPage = useAppSelector(getCurrentPage);

  const isModalActive = useAppSelector(getAddCartModalStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const startIndex = (currentPage - 1) * COUNT_CAMERAS_ON_PAGE;
    const endIndex = startIndex + COUNT_CAMERAS_ON_PAGE;
    dispatch(fetchCamerasOnPage([startIndex, endIndex]));
  }, [currentPage, dispatch]);

  if (camerasStatus.isFailed) {
    return <p>Сервер недоступен. Перезагрузите, пожалуйста, страницу</p>;
  }

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
        {isModalActive && <ModalAddCart />}
      </main>
    </Layout>
  );
}

export default CatalogPage;

