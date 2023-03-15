import {Link} from 'react-router-dom';
import {AppRoute, LogoImg} from '../../constants';

type LogoProps = {
  type: 'header' | 'footer';
}

function Logo({type}: LogoProps): JSX.Element {
  return (
    <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={LogoImg[type]}></use>
      </svg>
    </Link>
  );
}

export default Logo;
