import {useAppSelector} from '../../hooks';
import {getSimilarCameras} from '../../store/cameras/selectors';
import {Camera} from '../../types/camera';
import ProductCard from '../product-card/product-card';
import {MAX_SLIDER_PRODUCT} from '../../constants';
import {useEffect, useState} from 'react';

function SimilarSlider(): JSX.Element {
  const similarProducts = useAppSelector(getSimilarCameras);
  const [productNumber, setProductNumber] = useState(0);

  const [isActivePreviousButton, setActivePreviousButton] = useState(true);
  const [isActiveNextButton, setActiveNextButton] = useState(true);

  const [similarOnPage, setSimilarOnPage] = useState<Camera[]>([]);

  useEffect(() => {
    setSimilarOnPage([...similarProducts.slice(productNumber, MAX_SLIDER_PRODUCT + productNumber)]);

    if (productNumber === 0) {
      setActivePreviousButton(false);
    } else {
      setActivePreviousButton(true);
    }

    if (productNumber === similarProducts.length - MAX_SLIDER_PRODUCT) {
      setActiveNextButton(false);
    } else {
      setActiveNextButton(true);
    }
  },[similarProducts, productNumber]);

  if (!similarProducts) {
    return <div></div>;
  }

  const handleNextClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setProductNumber(productNumber + 1);
  };

  const handlePreviousClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setProductNumber(productNumber - 1);
  };


  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarOnPage.map((product) => <ProductCard product={product} key={product.id} type={'similar'} />)}
            </div>
            <button
              onClick={handlePreviousClick}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={!isActivePreviousButton}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>

            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleNextClick}
              disabled={!isActiveNextButton}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarSlider;
