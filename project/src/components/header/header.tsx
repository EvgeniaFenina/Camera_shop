import Logo from '../logo/logo';
import Navigation from '../header-navigation/header-navigation';
import SearchForm from '../search-form/search-form';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Logo type='header' />
        <Navigation />
        <SearchForm />
        <a className="header__basket-link" href="/#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
