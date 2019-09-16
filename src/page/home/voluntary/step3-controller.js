import React from 'react';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 自定义组件
import SubTableController from './step3/sub-table-controller';

// css
import '../../../style/voluntary/step3.css';

// UI组件
import { Checkbox, Table, Select, Icon } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';

const { Option } = Select;
class Step3Controller extends React.Component {
	state = {
		// option的数组
		schoolNature: [],
		schoolProperty: [],
		schoolType: [],
		areaFeature: [],
		schoolList: [],

		// option选择的数组
		natureValues: [],
		propertyValues: [],
		typeValues: [],
		areaFeatureValues: []
	};

	render() {
		const columns = [
			{
				title: '院校名称',
				dataIndex: 'school_name',
				key: 'schoolName',
				align: 'center'
				// render: text => <a>{text}</a>,
			},
			{
				title: '地区',
				dataIndex: 'province_name',
				key: 'province_name',
				align: 'center'
			},
			{
				title: '招生计划',
				dataIndex: 'plan',
				key: 'plan',
				align: 'center',
				render: () => <span>-</span>
			},
			{
				title: '投档概率',
				dataIndex: 'archives',
				key: 'archives',
				align: 'center',
				render: () => <span>-</span>
			},
			{
				title: '填报',
				dataIndex: 'option',
				key: 'option',
				width: 150,
				align: 'center',
				render: () => (
					<Select placeholder='选择志愿' style={{ width: 125 }}>
						<Option value={0}>志愿A</Option>
						<Option value={1}>志愿B</Option>
						<Option value={2}>志愿C</Option>
						<Option value={3}>志愿D</Option>
						<Option value={4}>志愿E</Option>
					</Select>
				)
			}
		];

		const CustomExpandIcon = (props) => {
			if (props.expanded) {
				return (
					<div className='expand-row-icon' onClick={(e) => props.onExpand(props.record, e)}>
						<Icon type='caret-up' />收起专业
					</div>
				);
			} else {
				return (
					<div className='expand-row-icon' onClick={(e) => props.onExpand(props.record, e)}>
						<Icon type='caret-down' />查看专业
					</div>
				);
			}
		};

		return (
			<div>
				<div>
					<div>
						<div>
							办学性质
							<Checkbox.Group onChange={this.handleNatureChange}>
								{this.state.schoolNature.map((natureItem) => {
									return (
										<Checkbox value={natureItem.id} key={natureItem.id}>
											{natureItem.type}
										</Checkbox>
									);
								})}
							</Checkbox.Group>
						</div>
						<div>
							学校属性
							<Checkbox.Group onChange={this.handlePropertyChange}>
								{this.state.schoolProperty.map((propertyItem) => {
									return (
										<Checkbox key={propertyItem.id} value={propertyItem.id}>
											{propertyItem.type}
										</Checkbox>
									);
								})}
							</Checkbox.Group>
						</div>
						<div>
							高校类别
							<Checkbox.Group onChange={this.handleTypeChange}>
								{this.state.schoolType.map((typeItem) => {
									return (
										<Checkbox key={typeItem.id} value={typeItem.id}>
											{typeItem.type}
										</Checkbox>
									);
								})}
							</Checkbox.Group>
						</div>
						<div>
							地域特色
							<Checkbox.Group onChange={this.handleAreaFeatureChange}>
								{this.state.areaFeature.map((areaFeatureItem) => {
									return (
										<Checkbox key={areaFeatureItem.id} value={areaFeatureItem.id}>
											{areaFeatureItem.type}
										</Checkbox>
									);
								})}
							</Checkbox.Group>
						</div>
					</div>
					<div>
						<Table
							rowKey={(record) => record.school_id}
							columns={columns}
							dataSource={this.state.schoolList}
							onExpand={this.onExpand}
							expandIcon={CustomExpandIcon}
							expandedRowRender={(record) => (
								<SubTableController schoolId={record.school_id} style={{ margin: 0 }} />
							)}
							loading={this.state.loading}
						/>
					</div>
				</div>
				<div>
					志愿表
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
			this.getSchool()
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

	// 办学性质改变
	handleNatureChange = async (checkedValues) => {
		await this.setState({
			natureValues: checkedValues,
			loading: true
		});

		// 调用查询表格数据函数
		let { schoolList } = await this.getSchool();

		this.setState({
			schoolList,
			loading: false
		});
	};

	// 学校属性改变
	handlePropertyChange = async (checkedValues) => {
		await this.setState({
			propertyValues: checkedValues,
			loading: true
		});

		// 调用查询表格数据函数
		let { schoolList } = await this.getSchool();

		this.setState({
			schoolList,
			loading: false
		});
	};

	// 高校类别改变
	handleTypeChange = async (checkedValues) => {
		await this.setState({
			typeValues: checkedValues,
			loading: true
		});

		// 调用查询表格数据函数
		let { schoolList } = await this.getSchool();

		this.setState({
			schoolList,
			loading: false
		});
	};

	// 地域特色改变
	handleAreaFeatureChange = async (checkedValues) => {
		await this.setState({
			areaFeatureValues: checkedValues,
			loading: true
		});

		// 调用查询表格数据函数
		let { schoolList } = await this.getSchool();

		this.setState({
			schoolList,
			loading: false
		});
	};

	getSchool = async () => {
		// 获取学校配置项
		let { natureValues, propertyValues, typeValues, areaFeatureValues } = this.state;

		return await launchRequest(APIS.GET_SCHOOL, {
			lotId: this.props.lotId,
			natureValues,
			propertyValues,
			typeValues,
			areaFeatureValues
		});
	};
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { lot_id } = voluntaryStore;

	return {
		lotId: lot_id
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3Controller);
