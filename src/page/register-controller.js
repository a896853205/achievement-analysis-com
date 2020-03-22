import React from 'react';

//样式文件
import '../style/register.css';

// UI组件
import { Card, Input, Button, message, Form, Row, Col } from 'antd';

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
    code: '',
    loading: false,
    verifyCodeBackwardCount: 0
  };

  handleGetVerificationCode = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState(
          {
            verifyCodeBackwardCount: 60
          },
          async () => {
            this.count();
            // 请求
            let result = await launchRequest(APIS.SAVE_VERIFY_CODE, {
              username: values.username
            });

            console.log(result);
          }
        );
      }
    });
  };

  count = () => {
    let { verifyCodeBackwardCount } = this.state;
    let interval = setInterval(() => {
      this.setState(
        {
          verifyCodeBackwardCount: verifyCodeBackwardCount--
        },
        () => {
          if (verifyCodeBackwardCount <= -1) {
            clearInterval(interval);
          }
        }
      );
    }, 1000);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='back'>
        <Card style={{ width: 300 }} className='login-box'>
          <div className='register-title'>智赢学业规划网</div>
          <div className='register-sub-title'>以智取胜 赢得未来</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item className='form-item'>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '手机号不能为空'
                  },
                  {
                    pattern: /^(\d)(\d|-){4,19}$/,
                    message: '请输入正确的电话号码'
                  }
                ]
              })(
                <Input
                  className='register-input'
                  size='large'
                  placeholder='手机号'
                  onChange={e => this.setState({ username: e.target.value })}
                />
              )}
            </Form.Item>
            <Form.Item className='form-item'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空'
                  }
                ]
              })(
                <Input.Password
                  className='register-input'
                  size='large'
                  placeholder='请输入密码'
                  onChange={e => this.setState({ password: e.target.value })}
                />
              )}
            </Form.Item>
            <Form.Item className='form-item'>
              {getFieldDecorator('rePassword', {
                rules: [
                  {
                    required: true,
                    message: '确认密码不能为空'
                  }
                ]
              })(
                <Input.Password
                  className='register-input'
                  size='large'
                  placeholder='确认密码'
                  onChange={e => this.setState({ rePassword: e.target.value })}
                />
              )}
            </Form.Item>
            <Form.Item className='form-item'>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('code')(
                    <Input
                      className='register-input'
                      size='large'
                      placeholder='短信验证码'
                      onChange={e => this.setState({ code: e.target.value })}
                    />
                  )}
                </Col>
                <Col span={12}>
                  {this.state.verifyCodeBackwardCount <= 0 ? (
                    <Button
                      className='register-input'
                      size='large'
                      onClick={this.handleGetVerificationCode}
                    >
                      获取验证码
                    </Button>
                  ) : (
                    <Button className='register-input' size='large' disabled>
                      {this.state.verifyCodeBackwardCount}s再次获取
                    </Button>
                  )}
                </Col>
              </Row>
            </Form.Item>
            <Form.Item className='form-item'>
              <Button
                className='register-button'
                type='primary'
                size='large'
                htmlType='submit'
                loading={this.state.loading}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  //注册函数
  handleSubmit = e => {
    e.preventDefault(); // 阻止button submit的默认行为
    this.setState({
      loading: true
    });
    // 表单验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { username, password, rePassword, code } = values;
        if (password !== rePassword) {
          message.error('两次密码不一致');
          this.setState({
            loading: false
          });
          return;
        } else {
          // 发送请求
          let result = await launchRequest(APIS.USER_REGISTER, {
            username,
            password: md5(password),
            code
          });

          this.setState({
            loading: false
          });

          if (result != null) {
            this.props.history.push('/login');
          }
        }
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };
}

export default Form.create({})(RegisterController);
