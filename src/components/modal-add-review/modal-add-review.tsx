import cn from 'classnames';
import {useEffect} from 'react';
import {STOP_SCROLL_CLASS} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {closeAddReviewModal} from '../../store/modal/modal';
import {getAddReviewModalStatus} from '../../store/modal/selectors';
import {SubmitHandler, useForm} from 'react-hook-form';
import {postReview} from '../../store/api-actions';
// import {PostReview} from '../../types/review';

type ModalAddReviewProps = {
  cameraId: number;
}

type FormValues = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

function ModalAddReview({cameraId}: ModalAddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getAddReviewModalStatus);

  const {register, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      cameraId: 0,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    }
  }
);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const payload = {...values, id: cameraId};

    dispatch(postReview({...payload}));
  };

  const closeModal = () => {
    dispatch(closeAddReviewModal());
  };

  const handleEscKeydownEvent = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && isActive) {
      closeModal();
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

  const handleCloseModalClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    closeModal();
  };

  return (
    <div className={cn('modal', isActive && 'is-active')}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              method="post"
              action="https://camera-shop.accelerator.pages.academy/"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      // name="user-name"
                      placeholder="Введите ваше имя"
                      {...register('userName', {
                        required: true,
                        pattern: /[А-Яа-яЁёA-Za-z']{1,}/
                      })}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      // name="user-plus"
                      placeholder="Основные преимущества товара"
                      required
                      {...register('advantage', {
                        required: true,
                        pattern: /[А-Яа-яЁёA-Za-z']{1,}/
                      })}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-minus" placeholder="Главные недостатки товара" required />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки"></textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={!isValid}
              >
                Отправить отзыв
              </button>
            </form>
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

export default ModalAddReview;
