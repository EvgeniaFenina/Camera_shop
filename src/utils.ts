import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Review} from './types/review';

export const getPriceFormat = (price: number) => price.toFixed().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const getFormatDate = (date: string): string => dayjs(date).locale('ru').format('D MMMM');

export const getSortReviews = (a: Review, b: Review) => dayjs(b.createAt).diff(dayjs(a.createAt));

export const isEscapeKey = (e: KeyboardEvent) => e.code === 'Escape' || e.code === 'Esc';
