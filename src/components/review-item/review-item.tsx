import {Review} from '../../types/review';
import {ReactComponent as IconFullStar} from '../../assets/sprite/icon-full-star.svg';
import {ReactComponent as IconStar} from '../../assets/sprite/icon-star.svg';
import {MAX_RATING} from '../../constants';
import {getFormatDate} from '../../utils';

type ReviewItemProps = {
  comment: Review;
}

function ReviewItem({comment}: ReviewItemProps): JSX.Element {
  const {userName, advantage, disadvantage, review, rating, createAt} = comment;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{getFormatDate(createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        {Array(rating).fill(
          <IconFullStar width="17" height="16" aria-hidden="true" />
        )}
        {Array(MAX_RATING - rating).fill(
          <IconStar width="17" height="16" aria-hidden="true" />
        )}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
