import {COUNT_CAMERAS_ON_PAGE, START_PAGE} from '../../constants';
import {changePage, userActions, UserAction} from './app';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Reducer: userAction', () => {
  let state: UserAction;

  beforeEach(() => {
    state = {
      currentPage: START_PAGE,
      countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
      pages: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userActions.reducer(undefined, { type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentPage: START_PAGE,
        countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
        pages: 0
      });
  });

  it('should set current page as given', () => {
    const page = 4;

    expect(userActions.reducer(state, changePage({page})))
      .toEqual({
        currentPage: page,
        countCamerasOnPage: COUNT_CAMERAS_ON_PAGE,
        pages: 0
      });
  });
});
