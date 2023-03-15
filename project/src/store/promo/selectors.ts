import {FetchStatus, NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Promo} from '../../types/promo';

export const getPromo = (state: State): Promo | null => state[NameSpace.Promo].promo;
export const getPromoLoadingStatus = (state: State): FetchStatus => state[NameSpace.Promo].promoLoadingStatus;
