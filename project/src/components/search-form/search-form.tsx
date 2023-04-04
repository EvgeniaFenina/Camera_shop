import {ChangeEvent, useEffect, useState} from 'react';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchSearchResult} from '../../store/api-actions';
import {clearSearchCameras} from '../../store/cameras/cameras';
import {getSearchCameras} from '../../store/cameras/selectors';
// import {getSearchCameras, getSearchCameraStatus} from '../../store/cameras/selectors';
// import LoadingSpinner from '../loading-spinner/loading-spinner';


function SearchForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchPhrase, setSearchPhrase] = useState('');
  const searchResultList = useAppSelector(getSearchCameras);
  // const searchStatus = useAppSelector(getSearchCameraStatus);

  useEffect(() => {
    searchPhrase.length > 0 ? dispatch(fetchSearchResult(searchPhrase)) : dispatch(clearSearchCameras);
  }, [searchPhrase, dispatch]);

  const handleSearchInputValue = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(target.value);
  };

  const handleResetButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchPhrase('');
  };

  return (
    <div className="form-search">
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchPhrase}
            onChange={handleSearchInputValue}
          />
        </label>
        <ul
          className="form-search__select-list"
          style={searchPhrase.length > 0 ? {visibility: 'visible', opacity: '1'} : {}}
        >
          {searchResultList && searchResultList.length > 0 ?
            searchResultList.map((camera) => (
              <Link to={`${generatePath(AppRoute.Product, {id: String(camera.id)})}`} key={camera.id}>
                <li className="form-search__select-item" tabIndex={0}>{camera.name}</li>
              </Link>)) :
            <li className="form-search__select-item" tabIndex={0}>Ничего не найдено</li>}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleResetButtonClick}
        style={searchPhrase.length > 0 ? {display: 'inline-block'} : {}}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
