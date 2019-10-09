import React from 'react';
import ResultReportController from '@/page/home/voluntary/result/result-report-controller';

// css
import '@/style/voluntary/step5.css';

class Step5Controller extends React.Component {
  render() {
    return (
      <div className='step5-box'>
        {/* 这里有判断来显示报表还是深度体验 */}
        <ResultReportController />
      </div>
    );
  }
}
export default Step5Controller;