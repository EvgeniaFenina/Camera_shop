import {makeFakeNotification} from '../../utils/mock';
import {notification, pushNotification, clearNotification} from './notifications';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const fakeNotification = makeFakeNotification();

describe('Reducer: notification:', () => {

  describe('Push notification:', () => {
    it('should set notification', () => {
      const state = {
        notifications: []
      };
      expect(notification.reducer(state, pushNotification(fakeNotification)))
        .toEqual({
          notifications: [fakeNotification]
        });
    });
  });

  describe('Clean notification:', () => {
    it('should clean notification', () => {
      const state = {
        notifications: [fakeNotification]
      };
      expect(notification.reducer(state, clearNotification(fakeNotification.id)))
        .toEqual({
          notifications: []
        });
    });
  });
});
