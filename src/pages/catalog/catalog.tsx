import Banner from '../../components/banner/banner';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductList from '../../components/product-list/product-list';
import SortForm from '../../components/sort-form/sort-form';
import {useAppSelector} from '../../hooks';
import {getCameras} from '../../store/cameras/selectors';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);

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
                  <ProductList products={cameras} />
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

