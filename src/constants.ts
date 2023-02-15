export enum AppRoute {
  Catalog = '/',
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
  Notifications = 'NOTIFICATIONS',
}

export enum APIRoute {
  Cameras = '/cameras',
}

export enum FetchStatus {
  IDLE = 'Idle',
  LOADING = 'Loading',
  SUCCESS = 'Success',
  FAILED = 'Failed'
}

export const MAX_RATING = 5;

