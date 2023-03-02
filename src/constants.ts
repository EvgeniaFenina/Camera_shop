export enum AppRoute {
  Catalog = '/',
  CatalogPage = 'catalog/:page',
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

export const MAX_RATING = 5;

export const START_PAGE = 1;

export const COUNT_CAMERAS_ON_PAGE = 9;

export const MAX_SLIDER_PRODUCT = 3;

export const MAX_REVIEWS_ON_PAGE = 3;

