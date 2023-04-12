import {NameSpace} from '../../constants';
import {State} from '../../types/state';

export const getPagesCount = (state: State): number => state[NameSpace.Action].pages;
export const getCurrentPage = (state: State): number => state[NameSpace.Action].currentPage;

export const getCurrentSortType = (state: State): string | null => state[NameSpace.Action].currentSortType;
export const getCurrentSortOrder = (state: State): string | null => state[NameSpace.Action].currentSortOrder;

export const getCurrentFilterCategoty = (state: State): string | null => state[NameSpace.Action].currentFilterCategory;
export const getCurrentFilterLevel = (state: State): string[] => state[NameSpace.Action].currentFilterLevel;
export const getCurrentFilterType = (state: State): string[] => state[NameSpace.Action].currentFilterType;

export const getCurrentMinPrice = (state: State): number | null => state[NameSpace.Action].currentMinPrice;
export const getCurrentMaxPrice = (state: State): number | null => state[NameSpace.Action].currentMaxPrice;

export const getMinPriceInPlaceholder = (state: State): number => state[NameSpace.Action].minPriceInPlaceholder;
export const getMaxPriceInPlaceholder = (state: State): number => state[NameSpace.Action].maxPriceInPlaceholder;

