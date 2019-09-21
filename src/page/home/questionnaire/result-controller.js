import React from 'react';
import ReactEcharts from 'echarts-for-react';
// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

import '../../../style/questionnaire/result.css';

const maxRank = 10;
class ResultController extends React.Component {
	state = {
		loading: false,
		result: []
	};
	getOption = (result) => {
		console.log('depened on this', result);
		const option = {
			tooltip: {},
			radar: {
				// shape: 'circle',
				name: {
					textStyle: {
						color: '#fff',
						backgroundColor: '#999',
						borderRadius: 3,
						padding: [ 3, 5 ]
					}
				},
				indicator: []
			},
			series: [
				{
					name: '类型',
					type: 'radar',
					itemStyle: {
						color: '#4091f7',
						borderColor: '#4091f7'
					},
					areaStyle: {
						color: '#4091f7',
						borderColor: '#4091f7'
					},
					data: [
						{
							value: [],
							name: '专业测评结果'
						}
					]
				}
			]
		};
		result.forEach((item) => {
			option.radar.indicator.push({ name: item.typeName, max: maxRank });
			option.series[0].data[0].value.push(item.rank);
		});
		console.log('rador', result);
		return option;
	};
	render() {
		return (
			<div>
				{this.state.loading ? (
					'加载中...'
				) : (
					<ReactEcharts
						option={this.getOption(this.state.result)}
						style={{ height: '350px', width: '1000px' }}
						className='questionnaire-chart'
					/>
				)}
			</div>
		);
	}
	componentDidMount = async () => {
		await this.setState({
			loading: true
		});

		let { returnResult } = await launchRequest(APIS.GET_QUESTIONNAIRE_RANK);

		await this.setState({
			loading: false,
			result: returnResult
		});
	};
}
export default ResultController;
