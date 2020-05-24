import React from 'react';
import ResultReportController from '../home/voluntary/result/result-report-controller';
class HomeVoluntaryResultController extends React.Component {
	render() {
		return (
			<div>
				<ResultReportController {...this.props}/>
			</div>
		);
	}
}
export default HomeVoluntaryResultController;
