import React from 'react';
import { Route, Switch } from "react-router-dom";

// 请求文件
import { launchRequest } from "../util/request";
import * as APIS from "../constants/api-constants";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as userActions } from "../redux/user-model";

// 自定义组件
import HomeIndexController from './home/home-index-controller';
import HomeVoluntaryController from './home/home-voluntary-controller';
import HomeQuestionnaireController from './home/home-questionnaire-controller';
import HomePersonalController from './home/home-personal-controller';

// 路由
import { BCG_ROOT_NAME, VOLUNTARY, QUESTIONNAIRE, PERSONAL } from "../constants/route-constants";

class HomeController extends React.Component {
  render() {
    const NoMatch = () => <div>4 0 4  NOT  FOUND</div>

    return (
      <div>
        <Switch>
          <Route path={`/${BCG_ROOT_NAME}/`} exact component={HomeIndexController} />
          <Route path={`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`} exact component={HomeVoluntaryController} />
          <Route path={`/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`} exact component={HomeQuestionnaireController} />
          <Route path={`/${BCG_ROOT_NAME}/${PERSONAL.path}`} exact component={HomePersonalController} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }

  componentDidMount () {

    if (!this.props.user.uuid) {
      launchRequest(APIS.GET_USER_INFO, {})
      .then(data => {

        if (data) {
          this.props.recordUser(data);
        } else {
          this.props.history.push('/login');
        }
      });
    }
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return {
    user,
  }
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordUser: params => {
      dispatch(userActions.recordUser(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeController);