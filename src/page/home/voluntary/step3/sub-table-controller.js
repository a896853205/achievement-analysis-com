import React from 'react';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';

// UI组件
import { Table, Select } from 'antd';

// 关于数据模块交互
import { connect } from "react-redux";

class SubTableController extends React.Component {
	state = {
		majorList: []
	};

	render() {
		const columns = [
			{
				title: '招生专业',
				dataIndex: 'major_name',
				key: 'major_name',
			},
			{
				title: '招生人数',
				dataIndex: 'enrollment_num',
				key: 'enrollment_num'
			},
			{
				title: '学制/学费',
				dataIndex: 'major_code',
				key: 'major_code',
				render:(text, record) => (<span>{record.school_system}/{record.tuition}</span>)
			},
			{
				title: '投档概率',
				dataIndex: '',
				key: '',
				render:(record) => (<span>-</span>)
			},
			{
				title: '填报',
				dataIndex: 'option',
				key: 'option',
				render:(record) => (
					<Select placeholder='请选择' style={{ width: 125 }}>
						<Select.Option value={0}>A专业</Select.Option>
						<Select.Option value={1}>B专业</Select.Option>
						<Select.Option value={2}>C专业</Select.Option>
						<Select.Option value={3}>D专业</Select.Option>
						<Select.Option value={4}>E专业</Select.Option>
						<Select.Option value={5}>F专业</Select.Option>
					</Select>
				)
			}
		];

		return <Table
			rowKey={(record) => record.major_id}
			columns={columns}
			dataSource={this.state.majorList} />;
	}

	componentDidMount = async () => {
		let { majorList } = await launchRequest(APIS.GET_MAJOR, {
			schoolId: this.props.schoolId,
			lotId: this.props.lotId,
		});

		console.table(majorList);

		this.setState({
			majorList
		});
	};
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store["voluntaryStore"];
  let { lot_id } = voluntaryStore;

  return {
    lotId: lot_id
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubTableController);
