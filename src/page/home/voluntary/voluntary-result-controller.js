import React from 'react';

// UI组件
import { Tabs } from 'antd';

// css
import '../../../style/voluntary/result.css';

// 自定义组件
import ResultReportController from '@/page/home/voluntary/result/result-report-controller';
import ResultDeepAnalysisController from '@/page/home/voluntary/result/result-deep-analysis-controller';

const { TabPane } = Tabs;

class VoluntaryResultController extends React.Component {
  render() {
    return (
      <div className='voluntary-result-box'>
        <Tabs>
          <TabPane tab='报表' key='1'>
            <ResultReportController />
          </TabPane>
          <TabPane tab='深度分析报告' key='2'>
            <ResultDeepAnalysisController />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default VoluntaryResultController;
