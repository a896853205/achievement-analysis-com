import React from 'react';

//样式文件
import '../style/login-controller.css';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

// UI组件
import { Button, Input, Form } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as userActions } from '../redux/user-model';
import { actions as voluntaryActions } from '../redux/voluntary-model';
// 密码加密
import md5 from 'md5';

class LoginController extends React.Component {
  state = {
    userName: '',
    passWord: '',
    loading: false
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='back'>
        <div className='login-box'>
          <div className='login-title'>智赢学业规划网</div>
          <div className='login-sub-title'>以智取胜 赢得未来</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item className='form-item'>
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  }
                ]
              })(
                <Input
                  className='login-input'
                  onChange={e => this.setState({ userName: e.target.value })}
                  size='large'
                  placeholder='卡号'
                />
              )}
            </Form.Item>
            <Form.Item className='form-item'>
              {getFieldDecorator('passWord', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码'
                  }
                ]
              })(
                <Input.Password
                  className='login-input'
                  onChange={e => this.setState({ passWord: e.target.value })}
                  size='large'
                  placeholder='请输入密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                className='btn-transition-blue-background login-button'
                htmlType='submit'
                type='primary'
                size='large'
                loading={this.state.loading}
              >
                登录
              </Button>
              {/* <Link to={'/register'}>
                <Button className='login-to-register-button'
                size='large'>注册</Button>
              </Link> */}
            </Form.Item>
          </Form>
        </div>
        <img
          src='/login-images/login-background-left.png'
          className='left-background'
          alt='左边蓝色图片'
        />
        <img
          src='/login-images/login-background-left.png'
          className='right-background'
          alt='左边蓝色图片'
        />
      </div>
    );
  }

  // 登录函数
  handleSubmit = e => {
    e.preventDefault(); //阻止button submit的默认行为
    this.setState({
      loading: true
    });
    //表单验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { userName, passWord } = values;
        // 提交表单
        let data = await launchRequest(APIS.USER_LOGIN, {
          userName,
          passWord: md5(passWord)
        });
        if (data) {
          if (data.user && +data.user.score > 0) {
            this.props.setStep(1);
            this.props.getMeScoreRank(data.user);
          }
          this.props._recordUser(data.user);
          // 需要放到token中
          this.setState({
            loading: false
          });
          this.props.history.push(`/`);
        } else {
          this.setState({
            loading: false
          });
        }
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    _recordUser: params => {
      dispatch(userActions._recordUser(params));
    },
    setStep: params => {
      dispatch(voluntaryActions.setStep(params));
    },
    getMeScoreRank: params => {
      dispatch(voluntaryActions.getMeScoreRank(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({})(LoginController));
