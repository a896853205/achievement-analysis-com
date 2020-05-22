import React from 'react';
import { Divider } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';

import '../../style/home-voluntary.css';

import { BaseHeader } from './component/VoluntaryHeader';

import Step3 from '../home/voluntary/step3-controller';
import { actions as voluntaryActions } from '../../redux/voluntary-model';
import { BackgroundImage } from './component/BackgroundImage';
import { PreviousStep } from './component/PreviousStep';

class SchoolsController extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>

        <BaseHeader/>

        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>填报具体学校(专业)</Divider>
            <div className='steps-content'>
              <Step3 {...this.props}/>
            </div>

            <PreviousStep {...this.props}/>

          </div>
        </div>

        <BackgroundImage/>

      </div>
    );
  }

 async componentDidMount() {
    this.props.setLotId(+this.props.match.params.lotId);

    this.props.recordSchoolList();
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    setLotId: (lotId) => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolsController);
