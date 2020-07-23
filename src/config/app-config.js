import { ENVIRONMENT } from '../constants/app-constants';

// 环境控制
// export const SAP_CONTROL = ENVIRONMENT.DEV;     // 开发环境
// export const SAP_CONTROL = ENVIRONMENT.TEST; // 测试环境
export const SAP_CONTROL = ENVIRONMENT.PRO; // 生产环境

// 项目版本号
export const kAppVersion = 'v0.0.8';

/*
    项目内部版本号
    规则：1.0.0    版本为    10000000
         99.99.99 版本为   999999000
         后三位为打包测试时使用 每打包一次+1
 */
export const kAPPInfo_Appversion = '00000008';

// 控制填报类型
// export const FILL_TYPE = 0;  // 开启模拟填报，关闭正式填报
export const FILL_TYPE = 1;  // 开启正式填报，关闭模拟填报

/*
  注意！！！如果开启正式填报，记得在数据库将VIP用户的修改次数重新初始化一次
  update t_user set score='',scoreAlterTime=1,reportAlterTime=100,deepAlterTime=100 where roleCode=2;

  测试账号 test999
*/



