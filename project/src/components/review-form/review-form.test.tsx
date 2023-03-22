

import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {makeFakePastReview} from '../../utils/mock';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {State} from '../../types/state';
import {NameSpace} from '../../constants';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ReviewFrorm from './review-form';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Modal]: {
    isAddReviewModalOpen: false
  }
});

const history = createMemoryHistory();

const mockReviews = [makeFakePastReview(), makeFakePastReview(), makeFakePastReview()];

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Review block:', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewFrorm reviews={mockReviews} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockReviews[0].review)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[1].review)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[2].review)).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });

  it('should render More button', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewFrorm reviews={mockReviews} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });
});
