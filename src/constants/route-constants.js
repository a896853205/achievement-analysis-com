export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
export const LOGIN = { path: 'login', name: '登录页' };
export const HOME = { path: 'home', name: '登录成功页' };
export const REGISTER = { path: 'register', name: '注册页' };
export const SEARCH_SCHOOL = { path: 'searchSchool', name: '学校搜索页' };
export const SEARCH_MAJOR = { path: 'searchMajor', name: '专业搜索页' };
export const NEWS_DETAIL = { path: 'newsDetail', name: '新闻详细页' };
export const NEWS_MORE = { path: 'newsMore', name: '新闻更多页' };
export const SEARCH_MAJOR_LIST = { path: 'searchMajorList', name: '专业搜索列表页' };

export const VOLUNTARY_RESULT = {
  path: 'voluntaryResult',
  name: '填报志愿结果页'
};
export const VOLUNTARY_DEEP_RESULT = {
  path: 'voluntaryDeepResult',
  name: '填报志愿深度体验结果页'
};
export const QUESTIONNAIRE = { path: 'questionnaire', name: '问卷页' };
export const PERSONAL = { path: 'personal', name: '问卷页' };
export const SCHOOL_DETAIL = { path: 'schoolDetail', name: '学校详情页' };
export const MAJOR_DETAIL = { path: 'majorDetail', name: '专业细节页' };
export const VIP_PROFILE = { path: 'vipProfile', name: 'VIP概况页' };
export const SCHOOL_RECOMMEND = { path: 'schoolRecommend', name: '学校推荐页' };

/*
  拆分新路由
  step1   complete_info   完善信息
  step2   voluntary   原路由不变，填报志愿
  step3   schools   学校页
  step4   voluntary_detail   志愿详情页
  step5/1  report   报表页
  step5/2  deep_report   深度体验页
*/
export const COMPLETE_INFO = { path: 'completeInfo', name: '完善信息页' };
export const VOLUNTARY = { path: 'voluntary', name: '填报志愿页' };
export const SCHOOLS = { path: 'schools', name: '学校页' };
export const VOLUNTARY_DETAIL = { path: 'voluntaryDetail', name: '志愿详情页' };
export const REPORT = { path: 'report', name: '报表页' };
export const DEEP_REPORT = { path: 'deepReport', name: '深度体验页' };



// 二级路由
export const BASIC = { path: 'basic', name: '基本修改页' };
export const PASSWORD = { path: 'password', name: '修改密码页' };
export const MY_VOLUNTARY = { path: 'myVoluntary', name: '我的志愿页' };
