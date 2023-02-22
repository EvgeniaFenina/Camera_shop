import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ReviewFrorm from '../../components/review-form/review-form';
import SimilarSlider from '../../components/similar-slider/similar-slider';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentCamera} from '../../store/api-actions';
import {getCurrentCamera} from '../../store/cameras/selectors';
import {getPriceFormat} from '../../utils';
import {ReactComponent as IconFullStar} from '../../assets/sprite/icon-full-star.svg';
import {ReactComponent as IconStar} from '../../assets/sprite/icon-star.svg';
import {MAX_RATING} from '../../constants';
import ProductTabs from '../../components/product-tabs/product-tabs';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const currentProduct = useAppSelector(getCurrentCamera);

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentCamera(id));
    }
  }, [dispatch, id]);

  if (!currentProduct) {
    return <LoadingSpinner />;
  }


  const {name, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price} = currentProduct;

  return (
    <Layout>
      <main>
        <div className="page-content">
          <BreadCrumbs product={name} />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                    <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV" />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    {Array(rating).fill(
                      <IconFullStar width="17" height="16" aria-hidden="true" />
                    )}
                    {Array(MAX_RATING - rating).fill(
                      <IconStar width="17" height="16" aria-hidden="true" />
                    )}
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceFormat(price)} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs product={currentProduct} />
                </div>
              </div>
            </section>
          </div>
          <SimilarSlider />
          <ReviewFrorm />
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </Layout>
  );
}

export default ProductPage;
