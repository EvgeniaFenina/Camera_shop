import {NameSpace} from '../../constants';
import {State} from '../../types/state';

export const getAddReviewModalStatus = (state: State): boolean => state[NameSpace.Modal].isAddReviewModalOpen;
