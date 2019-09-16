import React from 'react';

// UI组件
import { Layout, Menu, Col, Dropdown, Icon } from 'antd';

// 路由
import { Link } from 'react-router-dom';
import { LOGIN, INDEX } from '../constants/route-constants';

// css
import '../style/header.css';

// 关于数据模块交互
import { connect } from 'react-redux';

// 路由
import { PERSONAL, VOLUNTARY, BCG_ROOT_NAME, QUESTIONNAIRE } from '../constants/route-constants';

const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderController extends React.Component {
	render() {
		let userMenu = (
			<Menu>
				<Menu.Item>
					<Link
						to={{
							pathname: `${PERSONAL.path}`
						}}
					>
						修改个人
					</Link>
				</Menu.Item>
				<Menu.Item onClick={this.handleSignOut}>注销</Menu.Item>
			</Menu>
		);
		return (
			<Header className='header'>
				<Col span={11}>
					<Menu theme='light' mode='horizontal' defaultSelectedKeys={[ '0' ]} style={{ lineHeight: '64px' }}>
						<Menu.Item key='0'>
							<Link
								to={{
									pathname: `/${INDEX.path}`
								}}
							>
								首页
							</Link>
						</Menu.Item>
						<Menu.Item key='1'>
							<Link to={this.props.user.uuid ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}` : '/login'}>
								专业测评
							</Link>
						</Menu.Item>
						<SubMenu
							key='sub1'
							title={
								<span>
									<Link
										to={this.props.user.uuid ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}` : '/login'}
									>
										志愿填报 <Icon type='down' />
									</Link>
								</span>
							}
						>
							<Menu.Item key='2'>
								<Link to={this.props.user.uuid ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}` : '/login'}>
									模拟填报
								</Link>
							</Menu.Item>
							<Menu.Item key='3'>正式填报</Menu.Item>
						</SubMenu>
						<SubMenu
							key='sub2'
							title={
								<span>
									新高考3+1+2 <Icon type='down' />
								</span>
							}
						>
							<Menu.Item key='4'>
								<Link to={this.props.user.uuid ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}` : '/login'}>
									高考政策
								</Link>
							</Menu.Item>
							<Menu.Item key='5'>
								<Link to={this.props.user.uuid ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}` : '/login'}>About</Link>
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Col>
				<Col span={2} className='logo-box'>
					<div>这里是LOGO</div>
				</Col>
				<Col span={2} offset={9} className='header-personal-box'>
					{this.props.user.uuid ? (
						<Dropdown overlay={userMenu}>
							<span className='user-menu-span'>
								{this.props.user.nickname} <Icon type='down' />
							</span>
						</Dropdown>
					) : (
						<Link
							to={{
								pathname: `/${LOGIN.path}`
							}}
						>
							登录
						</Link>
					)}
				</Col>
			</Header>
		);
	}

	// 注销函数
	handleSignOut() {
		localStorage.clear();
		window.location.href = '/login';
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
const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderController);
