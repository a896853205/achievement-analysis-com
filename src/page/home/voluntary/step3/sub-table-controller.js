import React from 'react';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';

// UI组件
import { Table, Select } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

class SubTableController extends React.Component {
	state = {
		majorList: []
	};

	render() {
		let voluntaryObj = this.props.voluntary.find((voluntaryItem) => {
			return voluntaryItem.schoolId === this.props.schoolId;
		});

		let majorList = [];

		if (voluntaryObj) {
			majorList = voluntaryObj.major;
		}

		const columns = [
			{
				title: '招生专业',
				dataIndex: 'major_name',
				key: 'major_name'
			},
			{
				title: '招生人数',
				dataIndex: 'enrollment',
				key: 'enrollment'
			},
			{
				title: '学制/学费',
				dataIndex: 'major_code',
				key: 'major_code',
				render: (text, record) => (
					<span>
						{record.education_system}/{record.tuition}
					</span>
				)
			},
			{
				title: '投档概率',
				dataIndex: '',
				key: '',
				render: (record) => <span>-</span>
			},
			{
				title: '填报',
				dataIndex: 'option',
				key: 'option',
				render: (text, record) => (
					<Select
						placeholder='请选择'
						style={{ width: 125 }}
						onChange={(e) => {
							this.handleMajorChange(e, record);
						}}
						disabled={
							this.props.voluntary.findIndex((item) => {
								return item.schoolId === this.props.schoolId;
							}) === -1
						}
						value={
							majorList.findIndex((majorItem) => {
								return majorItem.majorId === record.major_id;
							}) === -1 ? (
								undefined
							) : (
								majorList.findIndex((majorItem) => {
									return majorItem.majorId === record.major_id;
								})
							)
						}
					>
						<Select.Option value={0}>专业1</Select.Option>
						<Select.Option value={1}>专业2</Select.Option>
						<Select.Option value={2}>专业3</Select.Option>
						<Select.Option value={3}>专业4</Select.Option>
						<Select.Option value={4}>专业5</Select.Option>
						<Select.Option value={5}>专业6</Select.Option>
					</Select>
				)
			}
		];

		return <Table rowKey={(record) => record.major_id} columns={columns} dataSource={this.state.majorList} />;
	}

	componentDidMount = async () => {
		let { majorList } = await launchRequest(APIS.GET_MAJOR, {
			schoolId: this.props.schoolId,
			lotId: this.props.lotId
		});

		console.table(majorList);

		this.setState({
			majorList
		});
	};

	handleMajorChange = (value, record) => {
		this.props.recordMajor({
			schoolId: this.props.schoolId,
			majorData: record,
			changeMajorIndex: value
		});
	};
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { lot_id, voluntary } = voluntaryStore;

	// let voluntaryObj = voluntary.find((voluntaryItem) => {
	// 	return voluntaryItem.schoolId === this.props.schoolId;
	// });

	// let majorList = [];

	// if (voluntaryObj) {
	// 	majorList = voluntaryObj.major;
	// }

	return {
		lotId: lot_id,
		voluntary: [ ...voluntary ]
		// majorList: [ ...majorList ]
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {
		recordMajor: (params) => {
			dispatch(voluntaryActions.recordMajor(params));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubTableController);
