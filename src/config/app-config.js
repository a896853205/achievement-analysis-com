/** 环境控制 */
export const SAP_CONTROL = process.env.NODE_ENV;

/**
 * 控制填报类型
 * 注意！！！如果开启正式填报，记得在数据库将VIP用户的修改次数重新初始化一次
 * update t_user set score='',scoreAlterTime=1,reportAlterTime=100,deepAlterTime=100 where roleCode=2;
 *
 * 测试账号 test999
 *
 * true 正式填报
 * false 模拟填报
 */
export const FILL_TYPE = false;

/** VIP是否可以购买开关 */
export const OPEN_VIP = true;
