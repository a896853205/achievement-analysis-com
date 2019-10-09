import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// 关于数据模块交互
import { connect } from 'react-redux';

// 自定义组件
import HomeIndexController from './home/home-index-controller';
import HomeVoluntaryController from './home/home-voluntary-controller';
import HomeQuestionnaireController from './home/home-questionnaire-controller';
import HomePersonalController from './home/home-personal-controller';
import HomeVoluntaryReportResultController from '@/page/home/home-voluntary-report-result-controller';

// 路由
import { BCG_ROOT_NAME, VOLUNTARY, VOLUNTARY_RESULT, QUESTIONNAIRE, PERSONAL } from '../constants/route-constants';

// UI
import { Result, Button } from 'antd';

class HomeController extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path={`/${BCG_ROOT_NAME}/`} exact component={HomeIndexController} />
					<Route path={`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`} exact component={HomeVoluntaryController} />
					<Route
						path={`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`}
						exact
						component={HomeVoluntaryReportResultController}
					/>
					{/* 深度体验的路由 */}
					{/* <Route
						path={`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`}
						exact
						component={HomeVoluntaryResultController}
					/> */}
					<Route
						path={`/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`}
						exact
						component={HomeQuestionnaireController}
					/>
					<Route path={`/${BCG_ROOT_NAME}/${PERSONAL.path}`} component={HomePersonalController} />
					<Route
						component={() => (
							<Result
								status='404'
								title='404'
								subTitle='对不起,您访问的页面不存在'
								extra={
									<Button type='primary'>
										<Link to={'/'}>回到首页</Link>
									</Button>
								}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const userStore = store['userStore'];
	let { user } = userStore;

	return {
		user
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeController);
