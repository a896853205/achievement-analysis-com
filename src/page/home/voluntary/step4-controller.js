import React from 'react';

import VoluntaryDetailController from './voluntary-detail-controller';

// UI组件
import { Button } from 'antd';

class Step4Controller extends React.Component {
	render() {
		return (
			<div>
				<VoluntaryDetailController />
				<Button onClick={this.handleClickSubmit}>确认生成报表</Button>
			</div>
		);
  }
  
  handleClickSubmit = () => {
		// 将voluntary和批次, 时间, 提交到后台
		// 数据库(结果表, 报表的唯一的uuid , 学校id, 学校在志愿表的位置, 专业id, 专业的位置(数组的系数即可), 时间)
    // 提交之后跳转到报表页
  }
}
export default Step4Controller;
