import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSortType, changeSortOrder, changePage} from '../../store/app/app';
import {getCurrentPage, getCurrentSortOrder, getCurrentSortType} from '../../store/app/selectors';
import {SortByOrderServerValue, SORT_BY_ORDER, SortByTypeServerValue, SORT_BY_TYPE, START_PAGE} from '../../constants';

function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentPage = useAppSelector(getCurrentPage);

  const handleSortButtonClick = (sortType?: string | null, sortOrder?: string | null) => {
    if (!sortType && !currentSortType) {
      sortType = SortByTypeServerValue.Price;
    }
    if (!sortType) {
      sortType = currentSortType;
    }
    dispatch(changeSortType({sortType}));

    if (!sortOrder && !currentSortOrder) {
      sortOrder = SortByOrderServerValue.OrderUp;
    }
    if (!sortOrder) {
      sortOrder = currentSortOrder;
    }
    dispatch(changeSortOrder({sortOrder}));

    if (currentPage > START_PAGE) {
      dispatch(changePage({page: START_PAGE}));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_BY_TYPE.map(({title, id, value}) => (
              <div className="catalog-sort__btn-text" key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort"
                  data-value={value}
                  checked={value === currentSortType}
                  onChange={() => handleSortButtonClick(value)}
                />
                <label htmlFor={id}>{title}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {SORT_BY_ORDER.map(({title, id, value}) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${id}`} key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort-icon"
                  aria-label={title}
                  data-value={value}
                  checked={value === currentSortOrder}
                  onChange={() => handleSortButtonClick('', value)}
                />
                <label htmlFor={id}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SortForm;
