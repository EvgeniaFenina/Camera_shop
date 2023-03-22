import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ReviewFrorm from '../../components/review-form/review-form';
import SimilarSlider from '../../components/similar-slider/similar-slider';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCurrentCamera, fetchReviews, fetchSimilarCameras} from '../../store/api-actions';
import {getCurrentCamera, getCurrentCameraStatus, getSimilarCameras} from '../../store/cameras/selectors';
import {getPriceFormat, getSortReviews} from '../../utils/utils';
import {ReactComponent as IconFullStar} from '../../assets/sprite/icon-full-star.svg';
import {ReactComponent as IconStar} from '../../assets/sprite/icon-star.svg';
import {MAX_RATING} from '../../constants';
import ProductTabs from '../../components/product-tabs/product-tabs';
import {getReviews} from '../../store/reviews/selectors';
import ModalAddReview from '../../components/modal-add-review/modal-add-review';
import {getAddCartModalStatus, getAddReviewModalStatus, getReviewSuccessModalStatus} from '../../store/modal/selectors';
import ModalAddReviewSuccess from '../../components/modal-review-success/modal-review-success';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import React from 'react';
import {openAddCartModal, setActiveCamera} from '../../store/modal/modal';
import {nanoid} from 'nanoid';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const currentProduct = useAppSelector(getCurrentCamera);
  const currentProductLoadingStatus = useAppSelector(getCurrentCameraStatus);
  const reviews = useAppSelector(getReviews);
  const sortedReviews = reviews.slice().sort(getSortReviews);
  const similarProducts = useAppSelector(getSimilarCameras);
  const isModalAddReviewActive = useAppSelector(getAddReviewModalStatus);
  const isSuccessModalActive = useAppSelector(getReviewSuccessModalStatus);
  const isModalAddCardActive = useAppSelector(getAddCartModalStatus);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(fetchCurrentCamera(id));
      dispatch(fetchSimilarCameras(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  if (currentProductLoadingStatus.isFailed) {
    return <p>Сервер недоступен. Перезагрузите, пожалуйста, страницу</p>;
  }

  if (!currentProduct || currentProductLoadingStatus.isLoading) {
    return <LoadingSpinner />;
  }

  const buttonRef = React.createRef<HTMLButtonElement>();

  const handleToBuyButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    buttonRef.current?.blur();
    dispatch(setActiveCamera({product: currentProduct}));
    dispatch(openAddCartModal());
  };

  const {name, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price} = currentProduct;

  const fullStars = Array(currentProduct.rating).fill(<IconFullStar />);
  const emptyStars = Array(MAX_RATING - currentProduct.rating).fill(<IconStar />);

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
                    {fullStars.map(() => {
                      const key = nanoid();
                      return <IconFullStar width="17" height="16" aria-hidden="true" key={key} />;
                    })}
                    {emptyStars.map(() => {
                      const key = nanoid();
                      return <IconStar width="17" height="16" aria-hidden="true" key={key} />;
                    })}
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{getPriceFormat(price)} ₽</p>
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleToBuyButtonClick}
                    ref={buttonRef}
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs product={currentProduct} />
                </div>
              </div>
            </section>
          </div>
          <SimilarSlider similarProducts={similarProducts} />
          <ReviewFrorm reviews={sortedReviews} key={id} />
          {isModalAddReviewActive && <ModalAddReview cameraId={currentProduct.id} />}
          {isSuccessModalActive && <ModalAddReviewSuccess cameraId={currentProduct.id} />}
          {isModalAddCardActive && <ModalAddCart />}
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
