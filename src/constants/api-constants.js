import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * optuser
 ***************************/
export const USER_LOGIN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/login`; // 登录
export const GET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserInfo`; // 获取用户信息
export const SET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/setUserInfo`; // 设置用户信息
export const ALTER_USER_PASSWORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/alterPassword`; // 修改用户密码
export const USER_REGISTER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/register`; // 注册
export const GET_SCORE_RANK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getScoreRank`; // 获取当年批次和去年的分数和批次
export const SET_USER_BASIC_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/setUserBasicInfo`; // 设置用户基本信息
export const SET_USER_IMPORT_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/setUserImportInfo`; // 设置用户的重要信息

/**
 * optindex
 ***************************/
export const GET_HOME_DATA = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_INDEX}/getIndexData`;

/**
 * optsystem
 ***************************/
export const GET_ADDRESS_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getAddressOption`;
export const GET_SCHOOL_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getSchoolOption`;
export const GET_LOTS_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getLotsOption`;
export const GET_HIGH_SCHOOL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/gethighSchool`;
export const GET_WARNING_DATA = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getWarningData`;

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
export const SEARCH_SCHOOL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/searchSchool`;
export const GET_SCHOOL_SCORE_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchoolScoreList`;
export const GET_SCHOOL_ENROLLMENT_GUIDE_NEWS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getEnrollmentGuideNews`;
export const GET_SCHOOL_RANK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchoolRank`;
export const GET_ENROLLMENT_GUIDE_NEWS_DETAIL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getEnrollmentGuideNewsDetail`;
export const GET_SCHOOL_RECOMMEND_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchoolRecommendList`;

/**
 * optquestionnaire
 **************************/
export const GET_QUESTIONNAIRE_LIST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getList`;
export const GET_QUESTIONNAIRE_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getStatus`;
export const UPLOAD_QUESTIONNAIRE_RESULT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/uploadResult`;
export const GET_QUESTIONNAIRE_RANK = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_QUESTIONNAIRE}/getRank`;

/**
 * optvoluntary
 **************************/
export const SAVE_VOLUNTARY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/saveVoluntary`;
export const GET_VOLUNTARY_RESULT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getVoluntaryResult`;
export const GET_MY_VOLUNTARY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getMyVoluntary`;
export const GET_VOLUNTARY_LIST_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getVoluntaryListOption`;
export const GET_VOLUNTARY_DEEP_RESULT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getVoluntaryDeepResult`;
export const SAVE_TEMP_VOLUNTARY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/saveTempVoluntary`;
export const GET_TEMP_VOLUNTARY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getTempVoluntary`;
export const GET_VOLUNTARY_SCHOOL_AND_MAJOR = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/getVoluntarySchoolAndMajor`;
export const UPDATE_REPORT_ALTER_TIME_DROP_1 = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/updateReportAlterTimeDrop1`;
export const UPDATE_DEEP_ALTER_TIME_DROP_1 = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_VOLUNTARY}/updateDeepAlterTimeDrop1`;

/**
 * optnews
 *************************/
export const GET_NEWS_DETAIL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_NEWS}/getNewsDetail`; // 获取新闻详细内容
export const GET_RECOMMEND_NEWS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_NEWS}/getRecommendNews`;
export const GET_HOT_NEWS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_NEWS}/getHotNews`;
export const GET_MORE_NEWS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_NEWS}/getMoreNews`;

/**
 * optmajor
 ************************/
export const GET_MAJOR_CATEGORY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MAJOR}/getMajorCategory`;
export const GET_MAJOR_PROFILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MAJOR}/getMajorProfile`;
export const GET_MARJO_DETAIL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MAJOR}/getMajorDetail`;
export const GET_HOT_MAJORS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MAJOR}/getHotMajors`;
export const GET_SCHOOL_MAJOR = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MAJOR}/getSchoolMajor`;

// 获取上传Token
export const GetUploadToken = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_UPLOAD}/getuploadtoken`;

// 保存验证码
export const SAVE_VERIFY_CODE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/saveVerifyCode`;

// 获取支付宝付款url
export const GET_ALIPAY_PAYMENT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PAYMENT}/getAlipayPaymentUrl`;
export const GET_WECHAT_PAYMENT_QR_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PAYMENT}/getWechatPaymentQRUrl`;

export const PAY_TEST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PAYMENT}/test`;


