import {NameSpace} from '../../constants';
import {State} from '../../types/state';

export const getPagesCount = (state: State): number => state[NameSpace.Action].pages;
export const getCurrentPage = (state: State): number => state[NameSpace.Action].currentPage;

export const getCurrentSortType = (state: State): string => state[NameSpace.Action].currentSortType;
export const getCurrentSortOrder = (state: State): string => state[NameSpace.Action].currentSortOrder;

