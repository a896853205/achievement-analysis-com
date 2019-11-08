import React, { useState } from 'react';

import * as APIS from '@/constants/api-constants';
import '@/style/detail/school-detail.css';
import { launchRequest } from 'util/request';
import { Input, Button } from 'antd';
import md5 from 'md5';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as userActions } from '../../redux/user-model';
import { actions as voluntaryActions } from '../../redux/voluntary-model';

// 路由
import { Link } from 'react-router-dom';

// 路由
import { VOLUNTARY, BCG_ROOT_NAME, LOGIN } from '@/constants/route-constants';

const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return { user };
};

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
)(props => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    let data = await launchRequest(APIS.USER_LOGIN, {
      userName,
      passWord: md5(passWord)
    });
    if (data) {
      if (data.user && +data.user.score > 0) {
        props.setStep(1);
        props.getMeScoreRank(data.user);
      }
      props._recordUser(data.user);
    }
  };

  return (
    <div>
      {props.user.uuid ? (
        <div className='index-login-box'>
          <h5 className='index-login-h5'>智赢学业规划网欢迎您</h5>
          <Link
            to={
              props.user.uuid
                ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                : `/${LOGIN.path}`
            }
          >
            <Button type='round' className='index-login-button'>
              开始测评
            </Button>
          </Link>
        </div>
      ) : (
        <div className='index-login-box'>
          <h5 className='index-login-h5'>2020志愿模拟填报登录</h5>
          <Input
            onChange={e => {
              setUserName(e.target.value);
            }}
            className='index-login-input'
            placeholder='请输入用户名'
          />
          <Input
            onChange={e => {
              setPassWord(e.target.value);
            }}
            className='index-login-input'
            placeholder='请输入密码'
            type='password'
          />
          <Button
            type='round'
            className='index-login-button'
            onClick={onSubmit}
          >
            登录
          </Button>
        </div>
      )}
    </div>
  );
});
