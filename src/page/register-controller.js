import React from 'react';

//样式文件
import '../style/register.css';

// UI组件
import { Card, Input, Button, message } from 'antd';

//请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

// 密码加密
import md5 from 'md5';

class RegisterController extends React.Component {
	state = {
		username: '',
		password: '',
		rePassword: '',
		loading: false
	};

	render() {
		return (
			<div className='back'>
				<Card style={{ width: 300 }} className='test'>
					<div className='register-title'>智赢</div>
					<div className='register-sub-title'>祝你智取未来</div>
					<Input
						className='register-input'
						size='large'
						placeholder='请输入注册账号'
						onChange={(e) => this.setState({ username: e.target.value })}
					/>
					<Input.Password
						className='register-input'
						size='large'
						placeholder='请输入密码'
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
					<Input.Password
						className='register-input'
						size='large'
						placeholder='确认密码'
						onChange={(e) => this.setState({ rePassword: e.target.value })}
					/>
					<Button
						className='register-button'
						type='primary'
						size='large'
						onClick={this.handleSubmit}
						loading={this.state.loading}
					>
						注册
					</Button>
				</Card>
			</div>
		);
	}

	//注册函数
	handleSubmit = async () => {
		let { username, password, rePassword } = this.state;
		await this.setState({
			loading: true
		});

		// 账号密码不能为空
		if (username === '' || password === '') {
			message.error('账号或密码不能为空');
			await this.setState({
				loading: false
			});
			return;
		}

		if (password !== rePassword) {
			message.error('两次密码不一致');
			await this.setState({
				loading: false
			});
			return;
		}

		// 发送请求
		await launchRequest(APIS.USER_REGISTER, {
			username,
			password: md5(password)
		});

		await this.setState({
			loading: false
    });
    
    this.props.history.push('/login');
	};
}

export default RegisterController;
