import React from 'react';
import { withRouter } from 'react-router-dom';

// UI组件
import { Layout, Menu, Col, Dropdown, Icon } from 'antd';

// 路由
import { Link } from 'react-router-dom';

// css
import '../style/header.css';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as userActions } from '../redux/user-model';

// 路由
import {
  PERSONAL,
  VOLUNTARY,
  BCG_ROOT_NAME,
  QUESTIONNAIRE,
  LOGIN,
  INDEX,
  REGISTER,
  BASIC,
  PASSWORD,
  MY_VOLUNTARY,
  SEARCH_SCHOOL,
  SEARCH_MAJOR
} from '../constants/route-constants';

const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderController extends React.Component {
  render() {
    let userMenu = (
      <Menu>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}`
            }}
          >
            修改个人
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}`
            }}
          >
            修改密码
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${MY_VOLUNTARY.path}`
            }}
          >
            我的志愿
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.handleSignOut}>注销</Menu.Item>
      </Menu>
    );
    return (
      <Header className='header'>
        <Col span={11}>
          <Menu
            theme='light'
            mode='horizontal'
            defaultSelectedKeys={['0']}
            style={{ lineHeight: '64px' }}
          >
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
              <Link
                to={
                  this.props.user.uuid
                    ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`
                    : `/${LOGIN.path}`
                }
              >
                专业测评
              </Link>
            </Menu.Item>
            <SubMenu
              key='sub1'
              title={
                <span>
                  <Link
                    to={
                      this.props.user.uuid
                        ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`
                        : `/${LOGIN.path}`
                    }
                  >
                    志愿填报 <Icon type='down' />
                  </Link>
                </span>
              }
            >
              <Menu.Item key='2'>
                <Link
                  to={
                    this.props.user.uuid
                      ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                      : `/${LOGIN.path}`
                  }
                >
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
                <Link
                  to={
                    this.props.user.uuid
                      ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                      : `/${LOGIN.path}`
                  }
                >
                  高考政策
                </Link>
              </Menu.Item>
              <Menu.Item key='5'>
                <Link
                  to={
                    this.props.user.uuid
                      ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                      : `/${LOGIN.path}`
                  }
                >
                  About
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key='sub3'
              title={
                <span>
                  资讯查询 <Icon type='down' />
                </span>
              }
            >
              <Menu.Item key='6'>
                <Link to={`/${SEARCH_SCHOOL.path}`}>学校查询</Link>
              </Menu.Item>
              <Menu.Item key='7'>
                <Link to={`/${SEARCH_MAJOR.path}`}>专业查询</Link>
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
            <div>
              <Link
                to={{
                  pathname: `/${REGISTER.path}`
                }}
              >
                注册
              </Link>
              |
              <Link
                to={{
                  pathname: `/${LOGIN.path}`
                }}
              >
                登录
              </Link>
            </div>
          )}
        </Col>
      </Header>
    );
  }

  componentDidMount() {
    let pathArr = this.props.location.pathname.split('/'),
      token = 'token';

    // 需要将第一位pop掉 例:'/login' => '['login']'
    pathArr.pop();

    // 非后台页页需要再判断location中是否有TOKEN
    if (pathArr[0] !== 'background') {
      // 其他页需要再判断location中是否有TOKEN,有token就请求,没token就什么都不干
      token = window.localStorage.getItem('token');
    }

    // 如果是后台的才需要进行判断
    if (!this.props.user.uuid && token) {
			this.props.getUser();
      if (pathArr[0]) {
        this.props.history.push(`/${LOGIN.path}`);
      }
    }
  }

  // 注销函数
  handleSignOut = () => {
    localStorage.clear();
    this.props.history.push(`/${LOGIN.path}`);
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return {
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(userActions.getUser());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderController)
);
