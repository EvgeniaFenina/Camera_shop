import {NameSpace} from '../../constants';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ModalAddReviewSuccess from './modal-review-success';
import {makeFakeCamera} from '../../utils/mock';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const mockStore = configureMockStore();
const fakeCurrentCamera = makeFakeCamera();


const store = mockStore({
  [NameSpace.Modal]: {
    isReviewSuccessModalOpen: true,
    activeCamera: fakeCurrentCamera
  }
});

const history = createMemoryHistory();

describe('Modal Success', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddReviewSuccess cameraId={fakeCurrentCamera.id} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modalSuccess')).toHaveClass('is-active');
    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
