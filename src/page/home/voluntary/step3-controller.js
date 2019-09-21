import React from 'react';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 自定义组件
import SubTableController from './step3/sub-table-controller';
import SchoolDetailController from '../school/school-detail';

// css
import '../../../style/voluntary/step3.css';

// UI组件
import { 
	Checkbox,
	Table,
	Select,
	Icon, 
	Collapse, 
	Radio, 
	Button,
	Drawer
} from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';
import { actions as schoolActions } from '../../../redux/school-model';

const { Option } = Select;
const { Panel } = Collapse;

class Step3Controller extends React.Component {
	state = {
		// option的数组
		schoolNature: [],
		schoolProperty: [],
		schoolType: [],
		areaFeature: [],

		gatherValue: 'a',
		schoolList: [],

		// option选择的数组
		lotsOption: [],
		natureValues: [],
		propertyValues: [],
		typeValues: [],
		areaFeatureValues: [],

		// 抽屉显示
		schoolDrawerVisible: false,
	};

	render() {
		// 表格表头
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
				title: '风险系数',
				dataIndex: 'risk',
				key: 'risk',
				align: 'center',
				render: () => <span>-</span>
			},
			{
				title: '详细信息',
				dataIndex: 'schoolDetail',
				key: 'schoolDetail',
				align: 'center',
				render: (text, record) => <Button onClick={() => {this.showSchoolDetail(record)}}>查看详细信息</Button>
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

		// 查看专业的UI
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

		// 右侧志愿表的删除UI
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
				<div className='school-option-box'>
					<div className='option-box'>
						<span className='option-name'>报考批次</span>
						<Radio.Group onChange={this.handleLotsChange} value={this.props.lotId}>
							{this.state.lotsOption.map((lotsItem) => {
								return (
									<Radio value={lotsItem.id} key={lotsItem.id}>
										{lotsItem.lots_name}
									</Radio>
								);
							})}
						</Radio.Group>
					</div>
					<div className='option-box'>
						<span className='option-name'>办学性质</span>
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
					<div className='option-box'>
						<span className='option-name'>学校属性</span>
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
					<div className='option-box'>
						<span className='option-name'>高校类别</span>
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
					<div className='option-box'>
						<span className='option-name'>地域特色</span>
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
				<div className='content'>
					<div className='content-left'>
						<Radio.Group className='btn-group' onChange={this.handleGatherChange}>
							<Radio.Button className='btn' value='a'>集合A</Radio.Button>
							<Radio.Button className='btn' value='b'>集合B</Radio.Button>
							<Radio.Button className='btn' value='c'>集合C</Radio.Button>
							<Radio.Button className='btn' value='d'>集合D</Radio.Button>
							<Radio.Button className='btn' value='e'>集合E</Radio.Button>
						</Radio.Group>
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
									{voluntaryItem.major.map((majorItem, index) => (
										<div key={index} style={{ paddingLeft: 24 }}>{`专业${index +
											1} ${majorItem.majorName}`}</div>
									))}
								</Panel>
							))}
						</Collapse>
						<Button onClick={this.handleClickCheckVoluntary}>
							查看志愿表
						</Button>
					</div>
				</div>
				<Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={() => {this.setState({schoolDrawerVisible: false})}}
          visible={this.state.schoolDrawerVisible}
        >
					<SchoolDetailController />
        </Drawer>
			</div>
		);
	}

	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let [
			{ schoolNature, schoolProperty, schoolType, areaFeature, voluntaryOptionList },
			{ schoolList },
			{ lotsOption }
		] = await Promise.all([
			launchRequest(APIS.GET_SCHOOL_OPTION, {
				lotId: this.props.lotId
			}),
			this.getSchool(),
			launchRequest(APIS.GET_LOTS_OPTION, {}, DominConfigs.REQUEST_TYPE.GET)
		]);

		// 如果有志愿表就不初始化了
		if (!this.props.voluntary.length) {
			this.props.initVoluntary(voluntaryOptionList);
		}
	
		await this.setState({
			schoolNature,
			schoolProperty,
			schoolType,
			areaFeature,
			voluntaryOptionList,
			loading: false,
			schoolList,
			lotsOption
		});
	};

	// 学校批次改变
	handleLotsChange = async (e) => {
		await this.setState({
			loading: true
		});

		this.props.setLotId(e.target.value);

		// 调用查询表格数据函数
		let [
			{ schoolList },
			{ voluntaryOptionList }
		] = await Promise.all([
			this.getSchool(),
			launchRequest(APIS.GET_SCHOOL_OPTION, {
				lotId: this.props.lotId
			})
		]);

		this.props.initVoluntary(voluntaryOptionList);

		this.setState({
			schoolList,
			loading: false
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

	// 改变集合
	handleGatherChange = async (e) => {
		await this.setState({
			gatherValue: e.target.value,
			loading: true
		});

		// 调用查询表格数据函数
		let { schoolList } = await this.getSchool();

		this.setState({
			schoolList,
			loading: false
		});
	}

	getSchool = async () => {
		// 获取学校配置项
		let { natureValues, propertyValues, typeValues, areaFeatureValues, gatherValue } = this.state;

		if (this.props.lotId) {
			return await launchRequest(APIS.GET_SCHOOL, {
				lotId: this.props.lotId,
				natureValues,
				propertyValues,
				typeValues,
				areaFeatureValues,
				gatherValue
			});
		} else {
			return { schoolList: [] }
		}
	};

	handleSchoolChange = (value, record) => {
		this.props.recordSchool({
			changeVolunteerId: value,
			schoolData: record
		});
	};

	handleClickCheckVoluntary = () => {
		this.props.recordVoluntaryDetail(this.props.voluntary);
		this.props.nextStep();
	};

	showSchoolDetail = (record) => {
		this.props.showSchoolDetail(record.school_id);
		this.setState({schoolDrawerVisible: true});
	}
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
		setLotId: (lotId) => {
			dispatch(voluntaryActions.setLotId(lotId));
		},
		initVoluntary: (params) => {
			dispatch(voluntaryActions.initVoluntary(params));
		},
		recordSchool: (params) => {
			dispatch(voluntaryActions.recordSchool(params));
		},
		deleteVoluntary: (params) => {
			dispatch(voluntaryActions.deleteVoluntary(params));
		},
		nextStep: () => {
			dispatch(voluntaryActions.nextStep());
		},
		recordVoluntaryDetail: (params) => {
			dispatch(voluntaryActions.recordVoluntaryDetail(params));
		},
		showSchoolDetail: (params) => {
			dispatch(schoolActions.showSchoolDetail(params));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3Controller);
