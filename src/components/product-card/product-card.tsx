import cn from 'classnames';
import {Camera} from '../../types/camera';
import {getPriceFormat} from '../../utils';
import {ReactComponent as IconFullStar} from '../../assets/sprite/icon-full-star.svg';
import {ReactComponent as IconStar} from '../../assets/sprite/icon-star.svg';
import {AppRoute, MAX_RATING} from '../../constants';
import {generatePath, Link} from 'react-router-dom';

type ProductCardProps = {
  product: Camera;
  type?: 'similar';
}

function ProductCard({product, type}: ProductCardProps): JSX.Element {
  const {id, name, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price} = product;

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
          {Array(rating).fill(
            <IconFullStar width="17" height="16" aria-hidden="true" />
          )}
          {Array(MAX_RATING - rating).fill(
            <IconStar width="17" height="16" aria-hidden="true" />
          )}
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${generatePath(AppRoute.Product, {id: String(id)})}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
