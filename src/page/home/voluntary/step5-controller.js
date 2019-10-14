import React from 'react';
import ResultReportController from '@/page/home/voluntary/result/result-report-controller';
import ResultDeepController from '@/page/home/voluntary/result/result-deep-analysis-controller';

// 关于数据模块交互
import { connect } from 'react-redux';

// css
import '@/style/voluntary/step5.css';

class Step5Controller extends React.Component {
  render() {
    let report;
    switch (this.props.voluntaryResultType) {
      case 'report':
        report = <ResultReportController />;
        break;
      case 'deepReport':
        report = <ResultDeepController />;
        break;
      default:
        report = null;
    }
    return (
      <div className='step5-box'>
        {report}
      </div>
    );
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { voluntaryResultType } = voluntaryStore;

  return {
    voluntaryResultType
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5Controller);
