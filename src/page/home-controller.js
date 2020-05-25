import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

// 关于数据模块交互
import { connect } from 'react-redux';

// 自定义组件
import HomeIndexController from './home/home-index-controller';
import HomeVoluntaryController from './home/home-voluntary-controller';
import HomeQuestionnaireController from './home/home-questionnaire-controller';
import HomePersonalController from './home/home-personal-controller';
import HomeVoluntaryReportResultController from './home/home-voluntary-report-result-controller';
import HomeVoluntaryDeepResultController from './home/home-voluntary-deep-result-controller';

// 路由
import {
  BCG_ROOT_NAME,
  VOLUNTARY_RESULT,
  QUESTIONNAIRE,
  PERSONAL,
  VOLUNTARY_DEEP_RESULT,

  COMPLETE_INFO,
  VOLUNTARY,
  SCHOOLS,
  VOLUNTARY_DETAIL,
  REPORT,
  DEEP_REPORT

} from '../constants/route-constants';

// UI
import { Result, Button } from 'antd';
import CompleteInfoController from './voluntary-page/CompleteInfoController';
import VoluntaryController from './voluntary-page/VoluntaryController';
import SchoolsController from './voluntary-page/SchoolsController';
import VoluntaryDetail from './voluntary-page/VoluntaryDetail';
import ReportController from './voluntary-page/ReportController';
import DeepReportController from './voluntary-page/DeepReportController';

class HomeController extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`/${BCG_ROOT_NAME}/`}
            exact
            component={HomeIndexController}
          />

          <Route
            path={`/${BCG_ROOT_NAME}/aaaa`}
            exact
            component={HomeVoluntaryController}
          />

          {/*step1 完善个人信息 拆分路由*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${COMPLETE_INFO.path}`}
            exact
            component={CompleteInfoController}
          />
          {/*step2  拆分路由  voluntary   原路由不变，填报志愿*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`}
            exact
            component={VoluntaryController}
          />

          {/*step3  拆分路由     schools   学校页*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${SCHOOLS.path}/:lotId`}
            exact
            component={SchoolsController}
          />

          {/*step4  拆分路由    voluntary_detail   志愿详情页*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${VOLUNTARY_DETAIL.path}/:lotId`}
            exact
            component={VoluntaryDetail}
          />

          {/*step5/1  拆分路由    report   报表页*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${REPORT.path}/:lotId/:voluntaryId`}
            exact
            component={ReportController}
          />

          {/*step5/2  拆分路由    deep_report   深度体验页*/}
          <Route
            path={`/${BCG_ROOT_NAME}/${DEEP_REPORT.path}/:lotId/:voluntaryId`}
            exact
            component={DeepReportController}
          />


          <Route
            path={`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`}
            exact
            component={HomeVoluntaryReportResultController}
          />
          {/* 深度体验的路由 */}
          <Route
            path={`/${BCG_ROOT_NAME}/${VOLUNTARY_DEEP_RESULT.path}/:voluntaryId`}
            exact
            component={HomeVoluntaryDeepResultController}
          />
          <Route
            path={`/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`}
            exact
            component={HomeQuestionnaireController}
          />
          <Route
            path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/:type`}
            // component={HomePersonalController}
            render={
              (props) => {
                return +this.props.user.score ? <HomePersonalController {...props}/> : (
                  <Redirect to={`/${BCG_ROOT_NAME}/${COMPLETE_INFO.path}`}/>
                )
              }
            }
          />

          <Route
            component={() => (
              <Result
                status='404'
                title='404'
                subTitle='对不起,您访问的页面不存在'
                extra={
                  <Button type='primary'>
                    <Link to={'/'}>回到首页</Link>
                  </Button>
                }
              />
            )}
          />
        </Switch>
      </div>
    );
  }
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeController);
