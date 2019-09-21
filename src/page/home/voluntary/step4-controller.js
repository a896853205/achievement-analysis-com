import React from 'react';
import { withRouter } from 'react-router-dom'

import VoluntaryDetailController from './voluntary-detail-controller';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

// UI组件
import { Button } from 'antd';

import { BCG_ROOT_NAME, VOLUNTARY_RESULT } from '../../../constants/route-constants';

class Step4Controller extends React.Component {
	state = {
		btnLoading: false
	};
	render() {
		return (
			<div>
				{/* 在这里显示批次之类的重要其他信息 */}
				<VoluntaryDetailController />
				<Button loading={this.state.btnLoading} onClick={this.handleClickSubmit}>
					确认生成报表
				</Button>
			</div>
		);
	}

	handleClickSubmit = async () => {
		// loading
		await this.setState({ btnLoading: true });

		// 提交到后台后返回uuid
		let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
			lotId: this.props.lotId,
			voluntary: this.props.voluntary
		});

		if (voluntaryId) {
			// 将uuid存入redux
			this.props.recordVoluntaryIdGetResult(voluntaryId);

			// 结束loading
			await this.setState({ btnLoading: false });

			// 跳转页面
			this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`);
		} else {
			// 结束loading
			await this.setState({ btnLoading: false });
			// 跳转到充值VIP页
		}
	};
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { lot_id, voluntary } = voluntaryStore;

	return {
		lotId: lot_id,
		voluntary: [ ...voluntary ]
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {
		recordVoluntaryIdGetResult: (params) => {
			dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Step4Controller));
