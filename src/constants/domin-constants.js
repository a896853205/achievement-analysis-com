import { ENVIRONMENT } from "./app-constants";
import { SAP_CONTROL } from "../config/app-config";

/** 域名 */
export let DOMAIN = 'http://localhost:7500';

if (SAP_CONTROL === ENVIRONMENT.DEV) {
  // 开发环境域名
  DOMAIN = 'http://localhost:7500';
} else if (SAP_CONTROL === ENVIRONMENT.TEST) {
  // 测试环境域名
  DOMAIN = '';
} else {
  // 生产环境域名
  DOMAIN = '';
}

// 模块
export const PART = {
  OPT_USER: '/users',
  OPT_UPLOAD: '/upload',
};

// 请求类型
export const REQUEST_TYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT'
};

// 返回码
export const RESPONSE_CODE = {
  success: 200,
};

// 服务器状态码
export const SERVICE_CODE = {
  Error: 0,
  Successed: 1,
  SetToken: 2,
  OutTimeToken: 3,
};