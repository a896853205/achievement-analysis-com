import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';

// UI组件
import { Divider, Skeleton } from 'antd';

// css
import '../../../style/voluntary/result.css';

class VoluntaryResultController extends React.Component {
	render() {
		return (
			<div className='voluntary-result-box'>
				<div className='voluntary-result-content'>
					<h1>志愿分析评测报告</h1>
					<Divider />
					<div>名称: 志愿分析评测报告 位次: 9466 批次: 一批A</div>
					<div>
						<h5>志愿选择完备性</h5>
						<Skeleton />
					</div>
					<div>
						<h5>梯度选择合理性</h5>
						<Skeleton />
					</div>
					<div>
						<h5>志愿排序合理性</h5>
						<Skeleton />
					</div>
					<div>
						<h5>志愿数量合理性</h5>
						<Skeleton />
					</div>
					<div>
						<h5>大计划选择合理性</h5>
						<Skeleton />
					</div>
					{this.props.voluntaryResult ? this.props.voluntaryResult.content : '1'}
				</div>
			</div>
		);
	}
}
// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { voluntaryResult } = voluntaryStore;

	return {
		voluntaryResult
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VoluntaryResultController);
