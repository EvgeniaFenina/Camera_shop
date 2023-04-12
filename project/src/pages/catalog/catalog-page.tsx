import {useEffect} from 'react';
import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductList from '../../components/product-list/product-list';
import SortForm from '../../components/sort-form/sort-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentFilterCategoty, getCurrentFilterLevel, getCurrentFilterType, getCurrentMaxPrice, getCurrentMinPrice, getCurrentPage, getCurrentSortOrder, getCurrentSortType} from '../../store/app/selectors';
import {getCamerasOnPage, getCamerasOnPageStatus} from '../../store/cameras/selectors';
import {COUNT_CAMERAS_ON_PAGE} from '../../constants';
import {fetchCamerasOnPage, fetchFilteredCamerasMinMaxPrice} from '../../store/api-actions';
import {getAddCartModalStatus} from '../../store/modal/selectors';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

function CatalogPage(): JSX.Element {
  const currentPage = useAppSelector(getCurrentPage);

  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const camerasStatus = useAppSelector(getCamerasOnPageStatus);

  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);

  const isModalActive = useAppSelector(getAddCartModalStatus);

  const currentFilterCategory = useAppSelector(getCurrentFilterCategoty);
  const currentFilterLevel = useAppSelector(getCurrentFilterLevel);
  const currentFilterType = useAppSelector(getCurrentFilterType);

  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const startIndex = (currentPage - 1) * COUNT_CAMERAS_ON_PAGE;
    const endIndex = startIndex + COUNT_CAMERAS_ON_PAGE;

    dispatch(fetchCamerasOnPage({
      params: {
        sort: currentSortType,
        order : currentSortOrder,
        category: currentFilterCategory,
        level: currentFilterLevel,
        type: currentFilterType,
        minPrice: currentMinPrice,
        maxPrice: currentMaxPrice,
        startPage: startIndex,
        endPage: endIndex
      }
    }));

    dispatch(fetchFilteredCamerasMinMaxPrice({
      params: {
        category: currentFilterCategory,
        level: currentFilterLevel,
        type: currentFilterType,
      }
    }));
  }, [currentPage, currentSortOrder, currentSortType, currentFilterCategory, currentFilterLevel, currentFilterType, currentMinPrice, currentMaxPrice, dispatch]);

  if (camerasStatus.isFailed) {
    return <p>Сервер недоступен. Перезагрузите, пожалуйста, страницу</p>;
  }

  if(camerasStatus.isLoading) {
    <LoadingSpinner />;
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

