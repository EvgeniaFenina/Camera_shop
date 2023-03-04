import {NameSpace} from '../../constants';
import {Camera} from '../../types/camera';
import {State} from '../../types/state';

export const getAddReviewModalStatus = (state: State): boolean => state[NameSpace.Modal].isAddReviewModalOpen;
export const getReviewSuccessModalStatus = (state: State): boolean => state[NameSpace.Modal].isReviewSuccessModalOpen;

export const getAddCartModalStatus = (state: State): boolean => state[NameSpace.Modal].isAddCartModalOpen;
export const getActiveCamera = (state: State): Camera | null => state[NameSpace.Modal].activeCamera;
