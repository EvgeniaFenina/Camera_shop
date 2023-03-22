import {makeFakeCamera} from '../../utils/mock';
import {clearActiveCamera, closeAddCartModal, closeAddReviewModal, closeReviewSuccessModal, modal, openAddCartModal, openAddReviewModal, openReviewSuccessModal, setActiveCamera } from './modal';

const fakeCamera = makeFakeCamera();

describe('Reducer: modals', () => {
  it('without additional parameters should return initial state', () => {
    expect(modal.reducer(undefined, {type: 'UNKNOWN_TYPE'}))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: false,
        activeCamera: null
      });
  });

  it('should appear an equal camera in state', () => {
    const state = {
      isAddReviewModalOpen: false,
      isReviewSuccessModalOpen: false,
      isAddCartModalOpen: false,
      activeCamera: null
    };

    expect(modal.reducer(state, setActiveCamera({product: fakeCamera})))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: false,
        activeCamera: fakeCamera
      });
  });

  it('should clear camera from state', () => {
    const state = {
      isAddReviewModalOpen: false,
      isReviewSuccessModalOpen: false,
      isAddCartModalOpen: false,
      activeCamera: fakeCamera
    };

    expect(modal.reducer(state, clearActiveCamera()))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: false,
        activeCamera: null
      });
  });

  it('should open modals', () => {
    const state = {
      isAddReviewModalOpen: false,
      isReviewSuccessModalOpen: false,
      isAddCartModalOpen: false,
      activeCamera: null
    };

    expect(modal.reducer(state, openAddCartModal()))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: true,
        activeCamera: null
      });

    expect(modal.reducer(state, openAddReviewModal()))
      .toEqual({
        isAddReviewModalOpen: true,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: false,
        activeCamera: null
      });

    expect(modal.reducer(state, openReviewSuccessModal()))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: true,
        isAddCartModalOpen: false,
        activeCamera: null
      });
  });

  it('should close modals', () => {
    const state = {
      isAddReviewModalOpen: true,
      isReviewSuccessModalOpen: true,
      isAddCartModalOpen: true,
      activeCamera: null
    };

    expect(modal.reducer(state, closeAddCartModal()))
      .toEqual({
        isAddReviewModalOpen: true,
        isReviewSuccessModalOpen: true,
        isAddCartModalOpen: false,
        activeCamera: null
      });

    expect(modal.reducer(state, closeAddReviewModal()))
      .toEqual({
        isAddReviewModalOpen: false,
        isReviewSuccessModalOpen: true,
        isAddCartModalOpen: true,
        activeCamera: null
      });

    expect(modal.reducer(state, closeReviewSuccessModal()))
      .toEqual({
        isAddReviewModalOpen: true,
        isReviewSuccessModalOpen: false,
        isAddCartModalOpen: true,
        activeCamera: null
      });
  });
});
