import {LogoImg} from '../../constants';

type LogoProps = {
  type: 'header' | 'footer';
}

function Logo({type}: LogoProps): JSX.Element {
  return (
    <a className="header__logo" href="index.html" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={LogoImg[type]}></use>
      </svg>
    </a>
  );
}

export default Logo;
