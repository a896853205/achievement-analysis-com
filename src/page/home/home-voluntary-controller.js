import React from 'react';

// UI组件
import { Divider, Button } from 'antd';

// css
import '../../style/home-voluntary.css';

// 自定义组件
import Step1 from './voluntary/step1-controller';
import Step2 from './voluntary/step2-controller';
import Step3 from './voluntary/step3-controller';
import Step4 from './voluntary/step4-controller';
import Step5 from './voluntary/step5-controller';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../redux/voluntary-model';

class HomeVoluntaryController extends React.Component {
  render() {
    const steps = [
      {
        title: '填报个人基本信息',
        content: <Step1 />
      },
      {
        title: '选择报考批次',
        content: <Step2 />
      },
      {
        title: '填报具体学校(专业)',
        content: <Step3 />
      },
      {
        title: '确认志愿表',
        content: <Step4 />
      },
      {
        title: '结果',
        content: <Step5 />
      }
    ];
    return (
      <div className='home-voluntary-box'>
        {this.props.step ? (
          <div className='home-voluntary-me'>
            <div className='voluntarty-me-box'>
              个人信息
              <div>
                {this.props.me ? (
                  <div>
                    <span>
                      {this.props.me.fitCurrent.year}年实际分数:
                      {this.props.user.score}{' '}
                    </span>
                    <span>
                      {this.props.me.fitCurrent.year}年位次:
                      {this.props.me.fitCurrent.rank}{' '}
                    </span>
                    <span>
                      {this.props.me.fitCurrent.year}年
                      {this.props.me.currentLotsScoreDifferMsg}
                    </span>
                  </div>
                ) : (
                  undefined
                )}
              </div>
              <div>
                {this.props.me ? (
                  <div>
                    <span>
                      {this.props.me.fitOld.year}年映射分数:
                      {this.props.me.fitOld.score}{' '}
                    </span>
                    <span>
                      {this.props.me.fitOld.year}年映射位次:
                      {this.props.me.fitOld.rank}{' '}
                    </span>
                    <span>
                      {this.props.me.fitOld.year}年
                      {this.props.me.lotsScoreDifferMsg}
                    </span>
                  </div>
                ) : (
                  undefined
                )}
              </div>
            </div>
          </div>
        ) : (
          undefined
        )}
        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            {/* <Steps current={this.props.step} className='steps-box'>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps> */}
            <Divider>{steps[this.props.step].title}</Divider>
            <div className='steps-content'>
              {steps[this.props.step].content}
            </div>
            <div className='voluntarty-button-box'>
              {this.props.step === 0 || this.props.step === 1 ? (
                undefined
              ) : (
                <Button
                  size='large'
                  className='btn-large'
                  onClick={this.props.prevStep}
                >
                  上一步
                </Button>
              )}
            </div>
          </div>
        </div>
        <img
          src='/images/background/background-bottom.png'
          className='left-background-bottom'
          alt='页面下角蓝色图片'
        />
        <img
          src='/images/background/background-bottom.png'
          className='right-background-bottom'
          alt='页面下角蓝色图片'
        />
      </div>
    );
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  const userStore = store['userStore'];
  let { step, me, meLoading } = voluntaryStore;
  let { user } = userStore;

  return {
    step,
    me,
    meLoading,
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    prevStep: () => {
      dispatch(voluntaryActions.prevStep());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeVoluntaryController);
