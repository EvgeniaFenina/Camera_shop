import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchReviews} from '../api-actions';
import {Review} from '../../types/review';

type ReviewData = {
  reviews: Review[];
  reviewsLoadingStatus: FetchStatus;
};

const initialState: ReviewData = {
  reviews: [],
  reviewsLoadingStatus: FetchStatus.IDLE,
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
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
      });
  }
});
