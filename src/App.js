import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// 组件
import HeaderController from './page/header-controller';
import FooterController from './page/footer-controller';
import LoginController from './page/login-controller';
import RegisterController from './page/register-controller';
import IndexController from './page/index-controller';
import BackgroundController from './page/home-controller';

// UI组件
import { Layout, Result, Button } from 'antd';

import { INDEX, LOGIN, BCG_ROOT_NAME, REGISTER } from './constants/route-constants';

const { Content } = Layout;

class App extends Component {
	render() {
		return (
			<Layout className='layout'>
				<HeaderController />
				<Content>
					<div>
						<Switch>
							<Route path={`/${INDEX.path}`} exact component={IndexController} />
							<Route path={`/${LOGIN.path}`} exact component={LoginController} />
							<Route path={`/${REGISTER.path}`} exact component={RegisterController} />
							<Route path={`/${BCG_ROOT_NAME}`} component={BackgroundController} />
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
				</Content>
				<FooterController />
			</Layout>
		);
	}
}

export default App;
