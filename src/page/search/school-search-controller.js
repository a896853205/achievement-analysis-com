import React from 'react';

// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';

// UI
import { Checkbox, List, Icon, Tag, Input } from 'antd';

// css
import '../../style/school-search.css';

const { Search } = Input;

class SchoolSearchController extends React.Component {
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
		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);

		return (
			<div className='school-search-box'>
				<div className='school-search-content'>
					<div className='school-input-box'>
						<Search enterButton='搜索学校'
						size="large"
						onSearch={this.searchSchool} />
					</div>
					<div className='school-list-box'>
						<List
							itemLayout='vertical'
							size='large'
							loading={this.state.loading}
							pagination={{
								onChange: (page) => {
									console.log(page);
								},
								pageSize: 5
							}}
							dataSource={this.state.schoolList}
							renderItem={(item) => (
								<List.Item
									key={item.school_id}
									actions={[
										<IconText type='star-o' text='156' key='list-vertical-star-o' />,
										<IconText type='like-o' text='156' key='list-vertical-like-o' />,
										<IconText type='message' text='2' key='list-vertical-message' />
									]}
								>
									<h5>{item.school_name}</h5>
									<p>{item.school_nature_name}</p>
									<p>
										{item.school_property_name.map((property) => (
											<Tag key={property} color='#108ee9'>
												{property}
											</Tag>
										))}
									</p>
								</List.Item>
							)}
						/>
					</div>
					<div className='school-list-option-box'>
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
				</div>
			</div>
		);
	}

	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let [ { schoolNature, schoolProperty, schoolType, areaFeature }, { schoolList } ] = await Promise.all([
			launchRequest(APIS.GET_SCHOOL_OPTION, {}),
			this.getSchool()
		]);

		await this.setState({
			schoolNature,
			schoolProperty,
			schoolType,
			areaFeature,
			loading: false,
			schoolList
		});
	};

	searchSchool = async () => {
		
	}

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

		let schoolListObj = await launchRequest(APIS.GET_SCHOOL, {
			natureValues,
			propertyValues,
			typeValues,
			areaFeatureValues
		});

		return schoolListObj || {};
	};
}
export default SchoolSearchController;
