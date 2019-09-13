import React from 'react';
import { Route, Switch } from 'react-router-dom';

// 自定义组件
import BasicController from './personal/basic-controller';
import PasswordController from './personal/password-controller';

// UI组件
import { Menu, Icon } from 'antd';

// 路由
import { Link } from 'react-router-dom';
import { BCG_ROOT_NAME, PERSONAL, BASIC, PASSWORD } from '../../constants/route-constants';

// CSS
import '../../style/home-personal.css';
class HomePersonalController extends React.Component {
	render() {
		return (
			<div className='personal-box'>
				<Menu
					onClick={this.handleClick}
					className='personl-menu'
					defaultSelectedKeys={[ '1' ]}
					defaultOpenKeys={[ 'sub1' ]}
					mode='inline'
				>
					<Menu.Item key='1'>
						<Link
							to={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}`}
						>
							<Icon type='user' />
							基本信息修改
						</Link>
					</Menu.Item>
					<Menu.Item key='2'>
						<Link
							to={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}`}
						>
							<Icon type='key' />
							密码修改
						</Link>
					</Menu.Item>
				</Menu>
				<div className='personal-contant'>
					<Switch>
						<Route
							path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}`}
							exact
							component={BasicController}
						/>
						<Route
							path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}`}
							exact
							component={PasswordController}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}
export default HomePersonalController;
