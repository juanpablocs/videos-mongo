const isProd = process.env.NODE_ENV==='prod';
export const DOMAIN = isProd ? 'http://jastream.com' : 'http://localhost:8080';
export const API_VIDEO = DOMAIN + '/video';
export const API_EMBED = DOMAIN + '/embed';
export const URL_PLAYER = DOMAIN + '/play';