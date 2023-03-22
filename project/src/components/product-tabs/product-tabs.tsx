import cn from 'classnames';
import {useState} from 'react';
import {Camera} from '../../types/camera';

type DescriptionTabsProps = {
  product: Camera;
}

function ProductTabs({product}: DescriptionTabsProps): JSX.Element {
  const {vendorCode, category, type, level, description} = product;

  const [isActive, setActive] = useState(true);

  const handleClick = () => setActive(!isActive);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={cn('tabs__control', isActive && 'is-active')}
          type="button"
          onClick={handleClick}
          data-testid='characteristic-tab'
        >
            Характеристики
        </button>
        <button
          className={cn('tabs__control', !isActive && 'is-active')}
          type="button"
          onClick={handleClick}
          data-testid='description-tab'
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={cn('tabs__element', isActive && 'is-active')}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={cn('tabs__element', !isActive && 'is-active')}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
