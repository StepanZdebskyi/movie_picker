export const img_300 = 'https://image.tmdb.org/t/p/w300';
export const img_500 = 'https://image.tmdb.org/t/p/w500';

// contentModal and singleContent
export const unavailable = 'https://www.movienewz.com/img/films/poster-holder.jpg';

// contentModal
export const unavailableLandscape =
  'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';

// For Carousel
export const noPicture = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

const isProduction = process.env.NODE_ENV === 'production';

// If we are in production, use the ALB DNS Name.
// If we are local, use localhost:5000
export const API_BASE_URL = isProduction
  ? 'http://stepan-ALB-2007737449.eu-north-1.elb.amazonaws.com'
  : 'http://localhost:5000';
