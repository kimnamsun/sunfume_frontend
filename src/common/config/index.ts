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

export const VALIDATE_TEXT = {
  require: '필수 입력사항입니다',
  password: '비밀번호는 4~30자입니다.',
  phone: '정확한 휴대폰번호를 입력하세요. (9~11자리)',
};
