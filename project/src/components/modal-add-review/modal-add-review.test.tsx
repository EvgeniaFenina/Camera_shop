

import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {NameSpace} from '../../constants';
import {makeFakeCamera} from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import ModalAddReview from './modal-add-review';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const mockStore = configureMockStore();
const fakeCurrentCamera = makeFakeCamera();

const store = mockStore({
  [NameSpace.Modal]: {
    activeCamera: fakeCurrentCamera,
    isAddReviewModalOpen: true,
  }
});

const history = createMemoryHistory();

describe('Modal Review:', () => {

  it('should render corectly', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddReview cameraId={fakeCurrentCamera.id} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modalAddReview')).toHaveClass('is-active');
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);

    await userEvent.type(screen.getByTestId('review'), 'some review');
    await userEvent.type(screen.getByTestId('userName'), 'name');
    await userEvent.type(screen.getByTestId('disadvantage'), 'some disadvantages');
    await userEvent.type(screen.getByTestId('advantage'), 'some advantages');

    expect(screen.getByDisplayValue('some review')).toBeInTheDocument();
    expect(screen.getByDisplayValue('name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('some disadvantages')).toBeInTheDocument();
    expect(screen.getByDisplayValue('some advantages')).toBeInTheDocument();
  });
});
