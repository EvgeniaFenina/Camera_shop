import {NameSpace} from '../../constants';
import {State} from '../../types/state';

export const getPagesCount = (state: State): number => state[NameSpace.Action].pages;
export const getCurrentPage = (state: State): number => state[NameSpace.Action].currentPage;

