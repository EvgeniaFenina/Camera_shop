import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FetchStatus} from '../../constants';
import {fetchPromo} from '../api-actions';
import {Promo} from '../../types/promo';

type PromoData = {
  promo: Promo | null;
  promoLoadingStatus: FetchStatus;
};

const initialState: PromoData = {
  promo: null,
  promoLoadingStatus: FetchStatus.IDLE,
};

export const promo = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.promoLoadingStatus = FetchStatus.LOADING;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.promoLoadingStatus = FetchStatus.SUCCESS;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.promoLoadingStatus = FetchStatus.FAILED;
      });
  }
});
