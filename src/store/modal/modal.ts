import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {Camera} from '../../types/camera';

type Modal = {
  isAddReviewModalOpen: boolean;
  isReviewSuccessModalOpen: boolean;
  isAddCartModalOpen: boolean;
  activeCamera: Camera | null;
};

const initialState: Modal = {
  isAddReviewModalOpen: false,
  isReviewSuccessModalOpen: false,
  isAddCartModalOpen: false,
  activeCamera: null
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
    },
    openReviewSuccessModal: (state) => {
      state.isReviewSuccessModalOpen = true;
    },
    closeReviewSuccessModal: (state) => {
      state.isReviewSuccessModalOpen = false;
    },
    openAddCartModal: (state) => {
      state.isAddCartModalOpen = true;
    },
    closeAddCartModal: (state) => {
      state.isAddCartModalOpen = false;
    },
    setActiveCamera: (state, action: PayloadAction<{product: Camera}>) => {
      const {product} = action.payload;

      state.activeCamera = product;
    },
    clearActiveCamera: (state) => {
      state.activeCamera = null;
    },
  },
});

export const {
  openAddReviewModal,
  closeAddReviewModal,
  openReviewSuccessModal,
  closeReviewSuccessModal,
  openAddCartModal,
  closeAddCartModal,
  setActiveCamera,
  clearActiveCamera
} = modal.actions;
