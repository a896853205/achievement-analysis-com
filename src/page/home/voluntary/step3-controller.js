import React from 'react';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

// 自定义组件
import SubTableController from './step3/sub-table-controller';

// css
import '../../../style/voluntary/step3.css';

// UI组件
import { Checkbox, Table, Select, Icon, Collapse } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

const { Option } = Select;
const { Panel } = Collapse;

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
				render: (text, record) => (
					<Select
						placeholder='选择志愿'
						style={{ width: 125 }}
						onChange={(e) => {
							this.handleSchoolChange(e, record);
						}}
						value={
							this.props.voluntary.find((voluntaryItem) => {
								return voluntaryItem.schoolId === record.school_id;
							}) ? (
								this.props.voluntary.find((voluntaryItem) => {
									return voluntaryItem.schoolId === record.school_id;
								}).five_volunteer_id
							) : (
								undefined
							)
						}
					>
						{this.props.voluntary.map((voluntaryItem) => (
							<Option key={voluntaryItem.five_volunteer_id} value={voluntaryItem.five_volunteer_id}>
								{voluntaryItem.volunteer_name}
							</Option>
						))}
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

		const genExtra = (voluntaryItem) => (
			<Icon
				type='stop'
				onClick={(event) => {
					this.props.deleteVoluntary(voluntaryItem.five_volunteer_id);
					event.stopPropagation();
				}}
			/>
		);

		return (
			<div className='step3-box'>
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
				</div>
				<div className='content'>
					<div className='content-left'>
						<Table
							rowKey={(record) => record.school_id}
							columns={columns}
							dataSource={this.state.schoolList}
							onExpand={this.onExpand}
							expandIcon={CustomExpandIcon}
							expandedRowRender={(record) => (
								<SubTableController
									key={record.school_id}
									schoolId={record.school_id}
									style={{ margin: 0 }}
								/>
							)}
							loading={this.state.loading}
						/>
					</div>
					<div className='content-right'>
						<Collapse bordered={false}>
							{this.props.voluntary.map((voluntaryItem) => (
								<Panel
									header={`${voluntaryItem.volunteer_name} ${voluntaryItem.schoolName}`}
									key={voluntaryItem.five_volunteer_id}
									extra={genExtra(voluntaryItem)}
								>
									<div style={{ paddingLeft: 24 }}>专业1 计算机技术</div>
									<div style={{ paddingLeft: 24 }}>专业2 软件工程</div>
								</Panel>
							))}
						</Collapse>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let [
			{ schoolNature, schoolProperty, schoolType, areaFeature, voluntaryOptionList },
			{ schoolList }
		] = await Promise.all([
			launchRequest(APIS.GET_SCHOOL_OPTION, {
				lotId: this.props.lotId
			}),
			this.getSchool()
		]);

		this.props.initVoluntary(voluntaryOptionList);

		await this.setState({
			schoolNature,
			schoolProperty,
			schoolType,
			areaFeature,
			voluntaryOptionList,
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

	handleSchoolChange = (value, record) => {
		this.props.recordSchool({
			changeVolunteerId: value,
			schoolData: record
		});
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
		initVoluntary: (params) => {
			dispatch(voluntaryActions.initVoluntary(params));
		},
		recordSchool: (params) => {
			dispatch(voluntaryActions.recordSchool(params));
		},
		deleteVoluntary: (params) => {
			dispatch(voluntaryActions.deleteVoluntary(params));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3Controller);
