import {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addFilterCategory, addFilterLevel, addFilterType, clearFilterCategory, clearFilterLevel, clearFilterType, setMinPrice, setMaxPrice, clearMinPrice, clearMaxPrice, changePage, removeFilterType} from '../../store/app/app';
import {getCurrentFilterCategoty, getCurrentFilterLevel, getCurrentFilterType, getCurrentMinPrice, getMinPriceInPlaceholder, getMaxPriceInPlaceholder, getCurrentPage} from '../../store/app/selectors';
import {FilterByCategory, ServerFilterValue, FilterByType, FilterByLevel, TIME_TO_DEBOUNCE, START_PAGE} from '../../constants';
import {debounce} from 'ts-debounce';

function FilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const isChecked = (filter: string, filtres: string[]) => filtres.some((value) => value === filter);

  const currentPage = useAppSelector(getCurrentPage);

  const currentFilterCategory = useAppSelector(getCurrentFilterCategoty);
  const currentFilterLevel = useAppSelector(getCurrentFilterLevel);
  const currentFilterType = useAppSelector(getCurrentFilterType);

  const currentMinPrice = useAppSelector(getCurrentMinPrice);

  const minPriceInPlaceholder = useAppSelector(getMinPriceInPlaceholder);
  const maxPriceInPlaceholder = useAppSelector(getMaxPriceInPlaceholder);

  const goToStartPage = () => {
    if (currentPage !== START_PAGE) {
      dispatch(changePage({page: START_PAGE}));
    }
  };

  const handleMinPriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let minPrice = +event.target.value;

    if (minPrice === 0) {
      event.target.value = '';
      dispatch(clearMinPrice());
      return;
    }

    if (minPrice < minPriceInPlaceholder && minPrice !== 0) {
      event.target.value = String(minPriceInPlaceholder);
      minPrice = minPriceInPlaceholder;
    }

    dispatch(setMinPrice({minPrice}));
    goToStartPage();
  };

  const handleMaxPriceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let maxPrice = +event.target.value;

    if (maxPrice <= 0) {
      event.target.value = '';
      dispatch(clearMaxPrice());
      return;
    }

    if (maxPrice !== 0 && (maxPrice < minPriceInPlaceholder || (currentMinPrice && maxPrice < currentMinPrice))) {
      event.target.value = '';
      dispatch(clearMaxPrice());
      return;
    }

    if (maxPrice > maxPriceInPlaceholder) {
      event.target.value = String(maxPriceInPlaceholder);
      maxPrice = maxPriceInPlaceholder;
    }

    dispatch(setMaxPrice({maxPrice}));
    goToStartPage();
  };

  const debouncedMinPriceInputHandler = debounce(handleMinPriceInputChange, TIME_TO_DEBOUNCE);
  const debouncedMaxPriceInputHandler = debounce(handleMaxPriceInputChange, TIME_TO_DEBOUNCE);

  const handleFilterCategoryClick = (filterCategory: string) => {
    if (filterCategory === FilterByCategory.Videocamera && (currentFilterType.includes(FilterByType.Film) || currentFilterType.includes(FilterByType.Snapshot))) {
      dispatch(removeFilterType({filterType: FilterByType.Film}));
      dispatch(removeFilterType({filterType: FilterByType.Snapshot}));
    }
    dispatch(addFilterCategory({filterCategory}));
    goToStartPage();
  };

  const handleFilterLevelClick = (filterLevel: string) => {
    dispatch(addFilterLevel({filterLevel}));
    goToStartPage();
  };

  const handleFilterTypeClick = (filterType: string) => {
    dispatch(addFilterType({filterType}));
    goToStartPage();
  };

  const handleResetFilters = () => {
    dispatch(clearMinPrice());
    dispatch(clearMaxPrice());
    dispatch(clearFilterCategory());
    dispatch(clearFilterLevel());
    dispatch(clearFilterType());
  };

  return (
    <div className="catalog-filter">
      <form action="#" onReset={handleResetFilters}>
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={`от ${String(minPriceInPlaceholder)}`}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={debouncedMinPriceInputHandler}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={`до ${String(maxPriceInPlaceholder)}`}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={debouncedMaxPriceInputHandler}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {Object.entries(FilterByCategory).map(([name, category]) => (
            <div className="custom-checkbox catalog-filter__item" key={name}>
              <label>
                <input
                  type="checkbox"
                  name={name[0].toLowerCase().concat(name.slice(1))}
                  checked={category === FilterByCategory.Photocamera ? ServerFilterValue.Photocamera === currentFilterCategory : category === currentFilterCategory}
                  onChange={() => handleFilterCategoryClick(category === FilterByCategory.Photocamera ? ServerFilterValue.Photocamera : category)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {category}
                </span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {Object.entries(FilterByType).map(([name, type]) => {
            const isDisabled = (type === FilterByType.Snapshot || type === FilterByType.Film) && currentFilterCategory === FilterByCategory.Videocamera;
            return (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={name[0].toLowerCase().concat(name.slice(1))}
                    checked={isChecked(type, currentFilterType) && !isDisabled}
                    disabled={isDisabled}
                    onChange={() => handleFilterTypeClick(type)}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {type}
                  </span>
                </label>
              </div>
            );
          })}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {Object.entries(FilterByLevel).map(([name, level]) => (
            <div className="custom-checkbox catalog-filter__item" key={name}>
              <label>
                <input
                  type="checkbox"
                  name={name[0].toLowerCase().concat(name.slice(1))}
                  checked={isChecked(level, currentFilterLevel)}
                  onChange={() => handleFilterLevelClick(level)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">
                  {level}
                </span>
              </label>
            </div>
          ))}
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset">
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
