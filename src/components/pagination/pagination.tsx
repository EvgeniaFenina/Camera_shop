import cn from 'classnames';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changePage} from '../../store/app/app';
import {getCurrentPage, getPagesCount} from '../../store/app/selectors';

function Pagination(): JSX.Element {
  const pagesCount = useAppSelector(getPagesCount);
  const currentPage = useAppSelector(getCurrentPage);

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pages = [...Array<number>(pagesCount)].map((_, i) => i + 1);

  const dispatch = useAppDispatch();

  const handleClick = (page: number) => {
    dispatch(changePage({page}));
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">

        {prevPage >= 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}${generatePath(AppRoute.CatalogPage, {page: String(prevPage)})}`}
              onClick={() => handleClick(prevPage)}
            >
              Назад
            </Link>
          </li>}

        {pages.map((page: number) => (
          <li className="pagination__item" key={page}>
            <Link
              className={cn('pagination__link', page === currentPage && 'pagination__link--active')}
              to={`${AppRoute.Catalog}${generatePath(AppRoute.CatalogPage, {page: String(page)})}`}
              onClick={() => handleClick(page)}
            >
              {page}
            </Link>
          </li>))}

        {nextPage <= pagesCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}${generatePath(AppRoute.CatalogPage, {page: String(nextPage)})}`}
              onClick={() => handleClick(nextPage)}
            >
              Далее
            </Link>
          </li>}

      </ul>
    </div>
  );
}

export default Pagination;
