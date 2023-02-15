import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
import {NameSpace} from '../../constants';
import {Notification} from '../../types/notification';

type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: []
};

export const notification = createSlice({
  name: NameSpace.Notifications,
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = nanoid();
      state.notifications.push({id, ...action.payload});
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((item) => item.id !== action.payload);
    },
  }
});

export const {pushNotification, clearNotification} = notification.actions;
