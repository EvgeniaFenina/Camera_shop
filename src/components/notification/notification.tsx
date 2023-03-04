import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearNotification} from '../../store/notifications/notifications';
import {getNotification} from '../../store/notifications/selectors';
import {Notification as NotificationType} from '../../types/notification';
import {DEFAUTT_DURATION} from '../../constants';

function Notification(): JSX.Element {
  const notifications = useAppSelector(getNotification);
  const dispatch = useAppDispatch();

  const renderNotification = () => {
    notifications.forEach((notification: NotificationType) => {
      const toastOptions = {
        autoClose: notification.duration || DEFAUTT_DURATION,
        onClose: () => dispatch(clearNotification(notification.id)),
      };

      switch (notification.type) {
        case 'error':
          toast.error(notification.message, toastOptions);
          break;
        case 'success':
          toast.success(notification.message, toastOptions);
          break;
        case 'info':
          toast.info(notification.message, toastOptions);
          break;
        case 'warning':
          toast.warning(notification.message, toastOptions);
          break;
        default:
          return null;
      }
    });
  };

  return <>{renderNotification()}</>;
}

export default Notification;
