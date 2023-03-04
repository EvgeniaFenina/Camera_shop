import cn from 'classnames';
import {useEffect} from 'react';
import {STOP_SCROLL_CLASS} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {closeAddReviewModal, openReviewSuccessModal} from '../../store/modal/modal';
import {getAddReviewModalStatus} from '../../store/modal/selectors';
import {SubmitHandler, useForm} from 'react-hook-form';
import {postReview} from '../../store/api-actions';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {isEscapeKey} from '../../utils';

type FormValues = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type ModalAddReviewProps = {
  cameraId: number;
}

const schema = yup.object({
  rating:  yup.number().required(),
  userName: yup.string().required(),
  advantage: yup.string().required(),
  disadvantage: yup.string().required(),
  review: yup.string().required().min(5),
}).required();

function ModalAddReview({cameraId}: ModalAddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getAddReviewModalStatus);

  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const closeModal = () => {
    dispatch(closeAddReviewModal());
  };

  const handleEscKeydownEvent = (e: KeyboardEvent) => {
    if (isEscapeKey(e) && isActive) {
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

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const payload = {...values, cameraId: cameraId};

    dispatch(postReview({...payload}));
    dispatch(closeAddReviewModal());
    dispatch(openReviewSuccessModal());
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
              action="#"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
                      <input className="visually-hidden" id="star-5" type="radio" value="5" {...register('rating')} />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" type="radio" value="4" {...register('rating')} />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" type="radio" value="3" {...register('rating')} />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" type="radio" value="2" {...register('rating')} />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" type="radio" value="1" {...register('rating')} />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors?.rating && <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className={cn('custom-input', errors?.userName && 'is-invalid', 'form-review__item')}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      {...register('userName')}
                    />
                  </label>
                  {errors?.userName && <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className={cn('custom-input', errors?.advantage && 'is-invalid', 'form-review__item')}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Основные преимущества товара"
                      {...register('advantage')}
                    />
                  </label>
                  {errors?.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
                </div>
                <div className={cn('custom-input', errors?.disadvantage && 'is-invalid', 'form-review__item')}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Главные недостатки товара"
                      {...register('disadvantage')}
                    />
                  </label>
                  {errors?.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
                </div>
                <div className={cn('custom-textarea', errors?.disadvantage && 'is-invalid', 'form-review__item')}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      placeholder="Поделитесь своим опытом покупки"
                      {...register('review')}
                    >
                    </textarea>
                  </label>
                  {errors?.review && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
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
