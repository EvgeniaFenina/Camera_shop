import {useEffect, useRef} from 'react';
import {STOP_SCROLL_CLASS} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import {fetchReviews} from '../../store/api-actions';
import {closeReviewSuccessModal} from '../../store/modal/modal';
import {getReviewSuccessModalStatus} from '../../store/modal/selectors';
import FocusTrap from 'focus-trap-react';

type ModalAddReviewSuccessProps = {
  cameraId: number;
}

function ModalAddReviewSuccess({cameraId}: ModalAddReviewSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getReviewSuccessModalStatus);

  const closeModal = () => {
    dispatch(closeReviewSuccessModal());
  };

  const handleEscKeydownEvent = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && isActive) {
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

  const handleCloseModalClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(closeModal);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    dispatch(fetchReviews(`${cameraId}`));
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => closeModal());

  return (
    <FocusTrap>
      <div className="modal is-active modal--narrow" data-testid='modalSuccess'>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content" ref={ref}>
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleCloseModalClick}
              >
                Вернуться к покупкам
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
    </FocusTrap>
  );
}

export default ModalAddReviewSuccess;
