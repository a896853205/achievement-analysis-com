import React from 'react';

// UI组件
import { Steps } from 'antd';

// css
import '../../style/home-voluntary.css';

// 自定义组件
import Step1 from './voluntary/step1-controller';
import Step2 from './voluntary/step2-controller';
import Step3 from './voluntary/step3-controller';

// 关于数据模块交互
import { connect } from "react-redux";

const { Step } = Steps;

class HomeVoluntaryController extends React.Component {

  render() {
    const steps = [
      {
        title: '填报个人基本信息',
        content: (<Step1 />)
      },
      {
        title: '选择报考批次',
        content: (<Step2 />)
      },
      {
        title: '填报具体学校(专业)',
        content: (<Step3 />)
      }
    ];
    return (
      <div className='home-voluntary-box'>
        <Steps current={this.props.step}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {steps[this.props.step].content}
        </div>
      </div>
    );
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { step } = voluntaryStore;

  return {
    step,
  }
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeVoluntaryController);