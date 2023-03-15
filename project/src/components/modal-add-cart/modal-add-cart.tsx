import cn from 'classnames';
import {useEffect, useRef} from 'react';
import {STOP_SCROLL_CLASS} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import {clearActiveCamera, closeAddCartModal} from '../../store/modal/modal';
import {getActiveCamera, getAddCartModalStatus} from '../../store/modal/selectors';
import {getPriceFormat, isEscapeKey} from '../../utils/utils';

function ModalAddCart(): JSX.Element {
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getActiveCamera);
  const isActive = useAppSelector(getAddCartModalStatus);

  const closeModal = () => {
    dispatch(closeAddCartModal());
    dispatch(clearActiveCamera());
  };

  const handleEscKeydownEvent = (e: KeyboardEvent) => {
    if (isEscapeKey(e) && isActive) {
      dispatch(closeModal);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.body.classList.add(STOP_SCROLL_CLASS);
      document.addEventListener('keydown', handleEscKeydownEvent);
    }

    return () => {
      document.body.classList.remove(STOP_SCROLL_CLASS);
      document.removeEventListener('keydown', handleEscKeydownEvent);
    };
  });

  const handleCloseModalClick = () => {
    dispatch(closeModal);
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => closeModal());

  if (!camera) {
    return (<p>Something went wrong</p>);
  }

  const {name, vendorCode, type, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price} = camera;

  return (
    <div
      className={cn('modal', isActive && 'is-active')}
      onClick={handleCloseModalClick}
      ref={ref}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{`${type} фотокамера`}</li>
                <li className="basket-item__list-item">{`${level} уровень`}</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {getPriceFormat(price)} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModalClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCart;
