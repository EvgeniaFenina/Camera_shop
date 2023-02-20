import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {userActions} from './app/app';
import {cameras} from './cameras/cameras';
import {notification} from './notifications/notifications';
import {promo} from './promo/promo';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Notifications]: notification.reducer,
  [NameSpace.Promo]: promo.reducer,
  [NameSpace.Action]: userActions.reducer
});
