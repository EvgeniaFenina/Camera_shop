import Logo from '../logo/logo';
import Navigation from '../header-navigation/header-navigation';
import SearchForm from '../search-form/search-form';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo type='header' />
        <Navigation />
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket} data-testid='basket-link'>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;
