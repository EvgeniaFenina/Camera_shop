import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';

type Modal = {
  isAddReviewModalOpen: boolean;
};

const initialState: Modal = {
  isAddReviewModalOpen: false,
};

export const modal = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    openAddReviewModal: (state) => {
      state.isAddReviewModalOpen = true;
    },
    closeAddReviewModal: (state) => {
      state.isAddReviewModalOpen = false;
    }
  },
});

export const {openAddReviewModal, closeAddReviewModal} = modal.actions;
