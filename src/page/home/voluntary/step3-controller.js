import React from 'react';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// UI组件
import { 
	Checkbox,
	Table,
	Select
} from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';

const { Option } = Select;
class Step3Controller extends React.Component {
	state = {
		schoolNature: [],
		schoolProperty: [],
		schoolType: [],
		areaFeature: [],
		schoolList: []
	};

	render() {
		const columns = [
			{
				title: '院校名称',
				dataIndex: 'school_name',
				key: 'schoolName',
				// render: text => <a>{text}</a>,
			},
			{
				title: '地区',
				dataIndex: 'province_name',
				key: 'province_name',
			},
			{
				title: '招生计划',
				dataIndex: 'plan',
				key: 'plan',
			},
			{
				title: '投档概率',
				dataIndex: 'archives',
				key: 'archives',
			},
			{
				title: '专业',
				dataIndex: 'major',
				key: 'major',
				render: () => (<div>点击查看</div>)
			},
			{
				title: '填报',
				dataIndex: 'option',
				key: 'option',
				render: () => (
					<Select>
						<Option value={0}>志愿A</Option>
						<Option value={1}>志愿B</Option>
						<Option value={2}>志愿C</Option>
						<Option value={3}>志愿D</Option>
						<Option value={4}>志愿E</Option>
					</Select>
				)
			}
		];

		return (
			<div>
				<div>
					<div>
						所在地区
						{this.state.schoolNature.map((natureItem) => {
							return (
								<Checkbox key={natureItem.id} onChange={() => {}}>
									{natureItem.type}
								</Checkbox>
							);
						})}
					</div>
					<div>
						学校属性
						{this.state.schoolProperty.map((propertyItem) => {
							return (
								<Checkbox key={propertyItem.id} onChange={() => {}}>
									{propertyItem.type}
								</Checkbox>
							);
						})}
					</div>
					<div>
						高校类别
						{this.state.schoolType.map((typeItem) => {
							return (
								<Checkbox key={typeItem.id} onChange={() => {}}>
									{typeItem.type}
								</Checkbox>
							);
						})}
					</div>
					<div>
						地域特色
						{this.state.areaFeature.map((areaFeatureItem) => {
							return (
								<Checkbox key={areaFeatureItem.id} onChange={() => {}}>
									{areaFeatureItem.type}
								</Checkbox>
							);
						})}
					</div>
				</div>
				<div>
					<Table rowKey={record => record.school_id} columns={columns} dataSource={this.state.schoolList} />
				</div>
			</div>
		);
	}

	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let [ { schoolNature, schoolProperty, schoolType, areaFeature }, { schoolList } ] = await Promise.all([
			launchRequest(APIS.GET_SCHOOL_OPTION, {}, DominConfigs.REQUEST_TYPE.GET),
			launchRequest(APIS.GET_SCHOOL, { lotId: this.props.lotId })
		]);

		console.table(schoolList);

		await this.setState({
			schoolNature,
			schoolProperty,
			schoolType,
			areaFeature,
			loading: false,
			schoolList
		});
	};
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
  let { lot_id } = voluntaryStore;

  return {
    lotId: lot_id
  }
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3Controller);
