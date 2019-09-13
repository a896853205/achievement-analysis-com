import React from 'react';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// UI组件
import { Checkbox } from 'antd';

class Step3Controller extends React.Component {
	state = {
		schoolNature: [],
		schoolProperty: [],
		schoolType: [],
		areaFeature: []
	};
	render() {
		return (
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
		);
	}

	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let { schoolNature, schoolProperty, schoolType, areaFeature } = await launchRequest(
			APIS.GET_SCHOOL_OPTION,
			{},
			DominConfigs.REQUEST_TYPE.GET
		);

		this.setState({
			schoolNature,
			schoolProperty,
			schoolType,
			areaFeature,
			loading: false
		});
	};
}
export default Step3Controller;
