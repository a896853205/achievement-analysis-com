import React, { useState } from 'react';

import * as APIS from '../../constants/api-constants';
import { FILL_TYPE } from '../../config/app-config';
import '@/style/detail/school-detail.css';
import { launchRequest } from 'util/request';
import { Input, Button, Modal } from 'antd';
import md5 from 'md5';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as userActions } from '../../redux/user-model';
import { actions as voluntaryActions } from '../../redux/voluntary-model';

// 路由
import { VOLUNTARY, BCG_ROOT_NAME, LOGIN } from '@/constants/route-constants';
import { COMPLETE_INFO, VIP_PROFILE } from '../../constants/route-constants';

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

  // 正式填报开启
  const handleFormalApplyOpen = () => {
    /*
    * 正式填报
    *   如果未登录，跳转到登录页
    *   如果已登录，权限是1，跳转到开通vip页面
    *   如果已经是VIP，跳转到填报志愿页
    * */
    if(props.user.uuid){
      if(props.user.roleCode === 1){
        Modal.warning({
          content:'请开通VIP',
          onOk: ()=>{
            props.history.push(`/${VIP_PROFILE.path}`);
          }
        });
      }else {
        if(props.user.score > 0) {
          props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`);
        }else {
          Modal.warning({
            content: '当前为正式填报，*高考分数，一经填写，不能修改',
            icon: null,
            onOk: ()=>{
              props.history.push(`/${BCG_ROOT_NAME}/${COMPLETE_INFO.path}`);
            }
          });
        }
      }
    }else {
      props.history.push(`/${LOGIN.path}`);
    }
  };

  // 模拟填报开启
  const handleSimulatedApplyOpen = () => {
    // 如果未登录 跳转到登录页
    if(props.user.uuid){
      // 如果已经登录，尚未完善个人信息，就跳转至个人信息页
      if(props.user.score > 0) {
        props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`);
      }else {
        props.history.push(`/${BCG_ROOT_NAME}/${COMPLETE_INFO.path}`);
      }
    }else {
      props.history.push(`/${LOGIN.path}`);
    }
  };

  return (
    <div>
      {props.user.uuid ? (
        <div className='index-login-box'>
          <h5 className='index-login-h5'>智赢学业规划网欢迎您</h5>
            <Button
              type='round'
              className='index-login-button'
              onClick={ FILL_TYPE === 0 ? handleSimulatedApplyOpen : handleFormalApplyOpen }
            >
              开始填报吧
            </Button>
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
