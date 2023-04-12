export enum AppRoute {
  Main = '/',
  Catalog = 'catalog/:page',
  Product = '/product/:id',
  Basket = '/basket',
  NotFound = '/*'
}

export const LogoImg = {
  header: '#icon-logo',
  footer: '#icon-logo-mono'
};

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';

export const REQUEST_TIMEOUT = 5000;

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Action = 'ACTION',
  Reviews = 'REVIEWS',
  Modal = 'Modal',
  Notifications = 'NOTIFICATIONS',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews'
}

export enum FetchStatus {
  IDLE = 'Idle',
  LOADING = 'Loading',
  SUCCESS = 'Success',
  FAILED = 'Failed'
}

enum SortByuOrderTitle {
  OrderUp = 'По возрастанию',
  OrderDown = 'По убыванию'
}

enum SortByOrderID {
  OrderUp = 'up',
  OrderDown = 'down'
}

export enum SortByOrderServerValue {
  OrderUp= 'asc',
  OrderDown='desc'
}

export const SORT_BY_ORDER = [
  {title: SortByuOrderTitle.OrderUp, id: SortByOrderID.OrderUp, value: SortByOrderServerValue.OrderUp},
  {title: SortByuOrderTitle.OrderDown, id: SortByOrderID.OrderDown, value: SortByOrderServerValue.OrderDown},
];

enum SortByTypeTitle {
  Price = 'по цене',
  Popular= 'по популярности'
}

enum SortByTypeID {
  Price = 'sortPrice',
  Popular= 'sortPopular'
}

export enum SortByTypeServerValue {
  Price ='price',
  Popular='rating',
}

export const SORT_BY_TYPE = [
  {title: SortByTypeTitle.Price, id: SortByTypeID.Price, value: SortByTypeServerValue.Price},
  {title: SortByTypeTitle.Popular, id: SortByTypeID.Popular, value: SortByTypeServerValue.Popular},
];

export enum FilterByCategory {
  Photocamera = 'Фотокамера',
  Videocamera = 'Видеокамера'
}

export enum ServerFilterValue {
  Photocamera = 'Фотоаппарат'
}

export enum FilterByType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
}

export enum FilterByLevel {
  Zero = 'Нулевой',
  Hobby = 'Любительский',
  Professional = 'Профессиональный'
}

export const MAX_RATING = 5;

export const MIN_RATING = 1;

export const START_PAGE = 1;

export const COUNT_CAMERAS_ON_PAGE = 9;

export const MAX_SLIDER_PRODUCT = 3;

export const MAX_REVIEWS_ON_PAGE = 3;

export const STOP_SCROLL_CLASS = 'scroll-lock';

export const DEFAUTT_DURATION = 4000;

export const TIME_TO_DEBOUNCE = 1000;
