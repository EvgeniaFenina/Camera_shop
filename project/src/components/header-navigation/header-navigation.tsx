import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

function Navigation(): JSX.Element {
  return (
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link className="main-nav__link" to={AppRoute.Main}>Каталог</Link>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link" href="/#">Гарантии</a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link" href="/#">Доставка</a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link" href="/#">О компании</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
