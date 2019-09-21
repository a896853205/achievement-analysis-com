import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// 组件
import HeaderController from './page/header-controller';
import FooterController from './page/footer-controller';
import LoginController from './page/login-controller';
import RegisterController from './page/register-controller';
import IndexController from './page/index-controller';
import BackgroundController from './page/home-controller';

// UI组件
import { Layout } from 'antd';

import { INDEX, LOGIN, BCG_ROOT_NAME, REGISTER } from './constants/route-constants';

const { Content } = Layout;

class App extends Component {
	render() {
		const NoMatch = () => <div>4 0 4 NOT FOUND</div>;

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
							<Route component={NoMatch} />
						</Switch>
					</div>
				</Content>
				<FooterController />
			</Layout>
		);
	}
}

export default App;
