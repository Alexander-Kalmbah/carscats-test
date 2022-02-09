/* [GLOBAL CONSTANTS] */


export const LANG = 'ru';
export const DEF_TITLE = 'Тестовое-задание';
export const INITIAL_DESCRIPTION = ''.concat(
  'Вот твое тестовое задание: Разработать веб-приложение “Конструктор каталогов” Необходимо:',
  ' Создать веб-приложение, которое поможет создавать свои каталоги и наполнять их моделями Стек технологий.'
);
export const KEYWORDS = ['тест', 'Создать веб-приложение', 'Стек технологий'];

// lifetime (ms)
export const LIFETIME = {};
// status res
export const RESPONSE = {
  [400]: {
    code: 400, // неверный запрос
    error: '400 | BAD REQUEST',
    message: 'FAILURE'
  },
  [401]: {
    code: 401, // пользователь не авторизованный
    error: '401 | UNAUTHORIZED',
    message: 'FAILURE'
  },
  [403]: {
    code: 403, // нету прав
    error: '403 | FORBIDDEN',
    message: 'FAILURE'
  },
  [404]: {
    code: 404, // не найдено
    error: '404 | NOT FOUND',
    message: 'FAILURE'
  },
  [405]: {
    code: 405, // метод не поддерживается
    error: '405 | METHOD NOT ALLOWED',
    message: 'FAILURE'
  },
  [500]: {
    code: 500, // сломался сервер
    error: '500 | INTERNAL SERVER',
    message: 'UNKNOWN ERROR'
  }
};

export const BASE_URL_IMG = '/api/img';
export const IMG_TYPES = [
  {
    name: 'APNG',
    exts: ['apng'],
    mime: 'image/apng'
  },
  {
    name: 'AVIF',
    exts: ['avif'],
    mime: 'image/avif'
  },
  {
    name: 'GIF',
    exts: ['gif'],
    mime: 'image/gif'
  },
  {
    name: 'JPEG',
    exts: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'],
    mime: 'image/jpeg'
  },
  {
    name: 'PNG',
    exts: ['png'],
    mime: 'image/png'
  },
  {
    name: 'SVG',
    exts: ['svg'],
    mime: 'image/svg+xml'
  },
  {
    name: 'WebP',
    exts: ['webp'],
    mime: 'image/webp'
  },
  {
    name: 'BMP',
    exts: ['bmp'],
    mime: 'image/bmp'
  },
  {
    name: 'ICO',
    exts: ['ico', 'cur'],
    mime: 'image/x-icon'
  },
  {
    name: 'TIFF',
    exts: ['tif', 'tiff'],
    mime: 'image/tiff'
  }
];

// status loading
export const LOAD = {
  VOID: 'VOID',
  LOADED: 'LOADED',
  LOADING: 'LOADING'
};
export const LOAD_ENUM = Object.keys(LOAD);

export const ERROR = 'ERROR';
export const WARNING = 'WARNING';

// actions
export const ACTION = {
  CHANGE_VIEW_NAVBAR: 'A:CHANGE/VIEW_NAVBAR',
  CHANGE_VIEW_EDITOR: 'A:CHANGE/VIEW_EDITOR',

  REQ_BRANDS: 'A:REQUEST/BRANDS',
  RES_BRANDS: 'A:RESPONSE/BRANDS',

  CREATE_NEW_BRAND: 'A:CREATE/NEW_BRAND',
  CANCEL_NEW_BRAND: 'A:CANCEL/NEW_BRAND',
  SAVE_NEW_BRAND: 'A:SAVE/NEW_BRAND',
  CHANGE_NAME_NEW_BRAND: 'A:CHANGE/NEW_BRAND/NAME',
  ADD_MARK_IN_NEW_BRAND: 'A:ADD/MARK_IN_NEW_BRAND',
  REMOVE_MARK_IN_NEW_BRAND: 'A:REMOVE/MARK_IN_NEW_BRAND',
  CHANGE_NAME_MARK_IN_NEW_BRAND: 'A:CHANGE/MARK_IN_NEW_BRAND/NAME',
  CHANGE_IMAGE_MARK_IN_NEW_BRAND: 'A:CHANGE/MARK_IN_NEW_BRAND/IMAGE'
};




// TODO DELETE
export const $MARK_IMAGES = [
  { key: 'SZ0ryoVzsWHBa3kYFnnGa' },
  { key: 'SB0Bjfut1q6vxnJM2-VNC' },
  { key: 'hrIB9Tz80wBqcRPm-MN2G' },
  { key: '-zr_U-FGhrYSGDIF0yJBE' },
  { key: 'dmH1ukiO4DgEZkO3TFQFZ' },
  { key: 'yE7Ny1AJaUqTGAg9z1ChM' }
];