import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {userActions} from './app/app';
import {cameras} from './cameras/cameras';
import {modal} from './modal/modal';
import {notification} from './notifications/notifications';
import {promo} from './promo/promo';
import {reviews} from './reviews/reviews';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Notifications]: notification.reducer,
  [NameSpace.Promo]: promo.reducer,
  [NameSpace.Action]: userActions.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.Modal]: modal.reducer
});
