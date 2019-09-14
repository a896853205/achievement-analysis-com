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
						{this.props.user.uuid ? (
							<Menu.Item key='1'>
								<Link to={`/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`}>专业测评</Link>
							</Menu.Item>
						) : (
							undefined
						)}
						{this.props.user.uuid ? (
							<SubMenu
								key='sub1'
								onClick={this.test}
								title={
									<span>
										<span>
											志愿填报 <Icon type='down' />
										</span>
									</span>
								}
							>
								<Menu.Item key='2'>
									<Link to={`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`}>模拟填报</Link>
								</Menu.Item>
								<Menu.Item key='3'>正式填报</Menu.Item>
							</SubMenu>
						) : (
							undefined
						)}
						{this.props.user.uuid ? (
							<SubMenu
								key='sub2'
								title={
									<span>
										<span>
											新高考3+1+2 <Icon type='down' />
										</span>
									</span>
								}
							>
								<Menu.Item key='4'>高考政策</Menu.Item>
								<Menu.Item key='5'>
									<Link to='/login'>About</Link>
								</Menu.Item>
							</SubMenu>
						) : (
							undefined
						)}
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
