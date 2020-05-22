import React from 'react';


// 关于数据模块交互
import { connect } from 'react-redux';
import '../../../style/home-voluntary.css';


// 从store接收state数据
const mapStateToProps = store => {
  const { me } = store['voluntaryStore'];
  const { user } = store['userStore'];
  return {
    me,
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export const BaseHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  return (
    <div className='home-voluntary-me'>
      <div className='voluntarty-me-box'>
        个人信息
        <div>
          {props.me ? (
            <div>
              <span>
                {props.me.fitCurrent.year}年实际分数:
                {props.user.score}{' '}
              </span>
              <span>
                {props.me.fitCurrent.year}年位次:
                {props.me.fitCurrent.rank}{' '}
              </span>
              <span>
                {props.me.fitCurrent.year}年
                {props.me.currentLotsScoreDifferMsg}
              </span>
            </div>
          ) : (
            undefined
          )}
        </div>
        <div>
          {props.me ? (
            <div>
                <span>
                  {props.me.fitOld.year}年映射分数:
                  {props.me.fitOld.score}{' '}
                </span>
              <span>
                  {props.me.fitOld.year}年映射位次:
                  {props.me.fitOld.rank}{' '}
              </span>
              <span>
                  {props.me.fitOld.year}年
                  {props.me.lotsScoreDifferMsg}
              </span>
            </div>
          ) : (
            undefined
          )}
        </div>
      </div>
    </div>
  );
});