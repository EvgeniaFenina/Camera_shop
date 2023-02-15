export const getPriceFormat = (price: number) => price.toFixed().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

// export const getRatingStars = (rating:);
