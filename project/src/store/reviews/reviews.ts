import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchReviews, postReview} from '../api-actions';
import {Review} from '../../types/review';

type ReviewData = {
  reviews: Review[];
  reviewsLoadingStatus: FetchStatus;
  postReviewStatus: FetchStatus;
};

const initialState: ReviewData = {
  reviews: [],
  reviewsLoadingStatus: FetchStatus.IDLE,
  postReviewStatus: FetchStatus.IDLE
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearPostReviewStatus: (state) => {
      state.postReviewStatus = FetchStatus.IDLE;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsLoadingStatus = FetchStatus.LOADING;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsLoadingStatus = FetchStatus.SUCCESS;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewsLoadingStatus = FetchStatus.FAILED;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.postReviewStatus = FetchStatus.SUCCESS;
        const newReview = action.payload;

        if (newReview) {
          state.reviews.push(newReview);
        }
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewStatus = FetchStatus.FAILED;
      })
      .addCase(postReview.pending, (state) => {
        state.postReviewStatus = FetchStatus.LOADING;
      });
  }
});

export const {clearPostReviewStatus} = reviews.actions;
