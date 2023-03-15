import cn from 'classnames';
import {Camera} from '../../types/camera';
import {getPriceFormat} from '../../utils/utils';
import {ReactComponent as IconFullStar} from '../../assets/sprite/icon-full-star.svg';
import {ReactComponent as IconStar} from '../../assets/sprite/icon-star.svg';
import {AppRoute, MAX_RATING} from '../../constants';
import {generatePath, Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {openAddCartModal, setActiveCamera} from '../../store/modal/modal';
import React from 'react';
import {nanoid} from 'nanoid';

type ProductCardProps = {
  product: Camera;
  type?: 'similar';
}

function ProductCard({product, type}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {id, name, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price} = product;

  const fullStars = Array(product.rating).fill(<IconFullStar />);
  const emptyStars = Array(MAX_RATING - product.rating).fill(<IconStar />);

  const buttonRef = React.createRef<HTMLButtonElement>();

  const handleToBuyButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    buttonRef.current?.blur();
    dispatch(setActiveCamera({product}));
    dispatch(openAddCartModal());
  };

  return (
    <div className={cn('product-card', type && 'is-active')}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
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
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {getPriceFormat(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleToBuyButtonClick}
          ref={buttonRef}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${generatePath(AppRoute.Product, {id: String(id)})}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
