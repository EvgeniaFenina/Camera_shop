import {FetchStatus, NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Review} from '../../types/review';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getStatus = (state: State): FetchStatus => state[NameSpace.Reviews].reviewsLoadingStatus;
