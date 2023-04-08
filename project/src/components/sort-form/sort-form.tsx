import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchSortCameras} from '../../store/api-actions';
import {changeSortType, changeSortOrder, changePage} from '../../store/app/app';
import {getCurrentPage, getCurrentSortOrder, getCurrentSortType} from '../../store/app/selectors';

function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    if (currentSortType !== '' && currentSortOrder !== '') {
      dispatch(fetchSortCameras([currentSortType, currentSortOrder]));
    }
  }, [currentSortType, currentSortOrder, dispatch]);

  const handleSortButtonClick = (sortType?: string, sortOrder?: string) => {
    if (!sortType && !currentSortType) {
      sortType = 'price';
    }
    if (!sortType) {
      sortType = currentSortType;
    }
    dispatch(changeSortType({sortType}));

    if (!sortOrder && !currentSortOrder) {
      sortOrder = 'asc';
    }
    if (!sortOrder) {
      sortOrder = currentSortOrder;
    }
    dispatch(changeSortOrder({sortOrder}));

    if (currentPage > 1) {
      dispatch(changePage({page : 1}));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onClick={() => handleSortButtonClick('price')}
                checked={currentSortType === 'price'}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onClick={() => handleSortButtonClick('rating')}
                checked={currentSortType === 'rating'}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onClick={() => handleSortButtonClick('','asc')}
                checked={currentSortOrder === 'asc'}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onClick={() => handleSortButtonClick('','desc')}
                checked={currentSortOrder === 'desc'}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SortForm;
