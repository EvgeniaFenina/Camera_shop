import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Notification} from '../../types/notification';

export const getNotification = (state: State): Notification[] => state[NameSpace.Notifications].notifications;
