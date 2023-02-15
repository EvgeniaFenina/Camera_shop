import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {cameras} from './cameras/cameras';
import {notification} from './notifications/notifications';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Notifications]: notification.reducer,
});
