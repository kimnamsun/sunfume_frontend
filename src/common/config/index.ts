export const configs = {
  SITE_NAME: 'SUNFUME',
  API_URL: process.env.API_URL || 'http://localhost:3000',
  ENV: process.env.NODE_ENV || 'development',
  VERSION: process.env.VERSION || '1',
};

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const SLIDE_PREFIX = {
  main: 'https://www.aesop.com/u1nb1km7t5q7',
  intro: 'https://nonfiction.kr/web/upload/category/editor/2021/04/23',
};
