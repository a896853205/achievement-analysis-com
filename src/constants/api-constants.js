import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * optuser
 ***************************/
export const USER_LOGIN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/login`;  // 登录
export const GET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserInfo`; // 获取用户信息
export const SET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/setUserInfo`; // 获取用户信息
export const ALTER_USER_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/alterPassword` // 修改用户密码

/**
 * optsystem
 ***************************/
export const GET_ADDRESS_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getAddressOption`;
export const GET_SCHOOL_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getSchoolOption`;
export const GET_LOTS_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getLotsOption`;

/**
 * optentry score
 ***************************/
export const GET_ENTRY_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTRY_SCORE}/getEntryScore`;

/**
 * optschool
 **************************/
export const GET_SCHOOL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchool`;
export const GET_MAJOR = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getMajor`;
export const GET_SCHOOL_DETAIL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchoolDetail`;

// 获取上传Token
export const GetUploadToken = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_UPLOAD}/getuploadtoken`;

/**
 * optquestionnaire
 **************************/
export const GET_QUESTIONNAIRE_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getList`;
export const GET_QUESTIONNAIRE_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getStatus`;
export const UPLOAD_QUESTIONNAIRE_RESULT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/uploadResult`;
export const GET_QUESTIONNAIRE_RANK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getRank`;