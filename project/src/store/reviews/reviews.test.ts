import {FetchStatus} from '../../constants';
import {makeFakePastReview, makeFutureReview} from '../../utils/mock';
import {fetchReviews, postReview} from '../api-actions';
import {reviews, clearPostReviewStatus} from './reviews';

const fakeReviews = [makeFakePastReview(), makeFakePastReview(), makeFakePastReview()];
const newReview = makeFutureReview();

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

describe('Reducer: review:', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviews.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.IDLE
      });
  });

  describe('Clear post review status:', () => {
    it('should set Idle post review status when it was Error', () => {
      const state = {
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.FAILED
      };
      expect(reviews.reducer(state, {type: clearPostReviewStatus}))
        .toEqual({
          reviews: [],
          reviewsLoadingStatus: FetchStatus.IDLE,
          postReviewStatus: FetchStatus.IDLE
        });
    });

    it('should set Idle post review status when it was Success', () => {
      const state = {
        reviews: fakeReviews,
        reviewsLoadingStatus: FetchStatus.SUCCESS,
        postReviewStatus: FetchStatus.SUCCESS
      };
      expect(reviews.reducer(state, {type: clearPostReviewStatus}))
        .toEqual({
          reviews: fakeReviews,
          reviewsLoadingStatus: FetchStatus.SUCCESS,
          postReviewStatus: FetchStatus.IDLE
        });
    });
  });

  describe('fetch review:', () => {

    it('should set fetch status error when server is not available', () => {
      const state = {
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.SUCCESS
      };
      expect(reviews.reducer(state, {type: fetchReviews.rejected.type}))
        .toEqual({
          reviews: [],
          reviewsLoadingStatus: FetchStatus.FAILED,
          postReviewStatus: FetchStatus.SUCCESS
        });
    });

    it('should set fetch status pending when server is loading', () => {
      const state = {
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.IDLE
      };
      expect(reviews.reducer(state, {type: fetchReviews.pending.type}))
        .toEqual({
          reviews: [],
          reviewsLoadingStatus: FetchStatus.LOADING,
          postReviewStatus: FetchStatus.IDLE
        });
    });

    it('should set fetch status success and add reviews to state', () => {
      const state = {
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.IDLE
      };
      expect(reviews.reducer(state, {type: fetchReviews.fulfilled.type, payload: fakeReviews}))
        .toEqual({
          reviews: fakeReviews,
          reviewsLoadingStatus: FetchStatus.SUCCESS,
          postReviewStatus: FetchStatus.IDLE
        });
    });
  });

  describe('post review', () => {

    it('should set fetch status error when server is not available', () => {
      const state = {
        reviews: [],
        reviewsLoadingStatus: FetchStatus.IDLE,
        postReviewStatus: FetchStatus.IDLE
      };
      expect(reviews.reducer(state, {type: postReview.rejected.type}))
        .toEqual({
          reviews: [],
          reviewsLoadingStatus: FetchStatus.IDLE,
          postReviewStatus: FetchStatus.FAILED
        });
    });

    it('should set fetch status pending when server is loading', () => {
      const state = {
        reviews: fakeReviews,
        reviewsLoadingStatus: FetchStatus.SUCCESS,
        postReviewStatus: FetchStatus.IDLE
      };
      expect(reviews.reducer(state, {type: postReview.pending.type}))
        .toEqual({
          reviews: fakeReviews,
          reviewsLoadingStatus: FetchStatus.SUCCESS,
          postReviewStatus: FetchStatus.LOADING
        });
    });

    it('should set fetch status success and add new review in array', () => {
      const state = {
        reviews: fakeReviews,
        reviewsLoadingStatus: FetchStatus.SUCCESS,
        postReviewStatus: FetchStatus.IDLE
      };

      expect(reviews.reducer(state, {type: postReview.fulfilled.type, payload: newReview}))
        .toEqual({
          reviews: [...fakeReviews, newReview],
          reviewsLoadingStatus: FetchStatus.SUCCESS,
          postReviewStatus: FetchStatus.SUCCESS
        });
    });
  });
});
