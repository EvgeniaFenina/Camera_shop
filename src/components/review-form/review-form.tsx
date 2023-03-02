import {useEffect, useState} from 'react';
import {MAX_REVIEWS_ON_PAGE} from '../../constants';
import {Review} from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  reviews: Review[];
}

function ReviewFrorm({reviews}: ReviewsProps): JSX.Element {
  const [reviewNumber, setReviewNumber] = useState(0);

  const [isActiveButton, setActiveButton] = useState(true);

  const [reviewsOnPage, setReviewsOnPage] = useState<Review[]>([]);

  useEffect(() => {
    setReviewsOnPage([...reviews.slice(0, MAX_REVIEWS_ON_PAGE + reviewNumber)]);

    if (reviews.length <= MAX_REVIEWS_ON_PAGE || reviewNumber + MAX_REVIEWS_ON_PAGE >= reviews.length) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  },[reviewNumber, reviews]);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setReviewNumber(reviewNumber + MAX_REVIEWS_ON_PAGE);
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviewsOnPage.map((review) => <ReviewItem comment={review} key={review.id} />)}
          </ul>
          <div className="review-block__buttons">
            {reviews.length > 0 &&
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleClick}
              disabled={!isActiveButton}
            >
              Показать больше отзывов
            </button>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewFrorm;
