import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {Action} from 'redux';
import {NameSpace} from '../../constants';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {makeFakeCamera} from '../../utils/mock';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ProductList from './product-list';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Modal]: {
    activeCamera: null,
    isAddCartModalOpen: false
  }
});

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Product list:', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductList products={fakeCameras} />
        </HistoryRouter>
      </Provider>
    );
  });
});
