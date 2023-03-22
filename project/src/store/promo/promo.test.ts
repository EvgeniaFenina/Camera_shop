
import {FetchStatus} from '../../constants';
import {makeFakePromo} from '../../utils/mock';
import {fetchPromo} from '../api-actions';
import {promo} from './promo';

const fakePromo = makeFakePromo();

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Reducer: promo', () => {

  it('without additional parameters should return initial state', () => {
    expect(promo.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        promo: null,
        promoLoadingStatus: FetchStatus.IDLE
      });
  });

  describe('fetch promo:', () => {
    it('change Fetch status on error when server is not available', () => {
      const state = {
        promo: null,
        promoLoadingStatus: FetchStatus.IDLE
      };
      expect(promo.reducer(state, {type: fetchPromo.rejected.type}))
        .toEqual({
          promo: null,
          promoLoadingStatus: FetchStatus.FAILED
        });
    });

    it('change Fetch status and add promo to state', () => {
      const state = {
        promo: null,
        promoLoadingStatus: FetchStatus.IDLE
      };
      expect(promo.reducer(state, {type: fetchPromo.fulfilled.type, payload: fakePromo}))
        .toEqual({
          promo: fakePromo,
          promoLoadingStatus: FetchStatus.SUCCESS
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        promo: null,
        promoLoadingStatus: FetchStatus.IDLE
      };
      expect(promo.reducer(state, {type: fetchPromo.pending.type}))
        .toEqual({
          promo: null,
          promoLoadingStatus: FetchStatus.LOADING
        });
    });
  });
});
