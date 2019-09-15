import React from "react";

// 自定义组件
import WelcomeController from "./questionnaire/welcome-controller";
import QuestionnaireController from "./questionnaire/questionnaire-controller";
import ResultController from "./questionnaire/result-controller";

//数据模块交互
import { connect } from "react-redux";
import { actions as questionnaireActions } from "../../redux/questionnaire-model";

class HomeQuestionnaireController extends React.Component {
  render() {
    const status = [
      {
        title: "测评系统欢迎页面",
        content: <WelcomeController />
      },
      {
        title: "测评系统测评页面",
        content: <QuestionnaireController />
      },
      {
        title: "测评系统结果页面",
        content: <ResultController />
      }
    ];
    return <div>{status[this.props.status].content}</div>;
  }

  componentWillUnmount() {
    this.props.setQuesStatus(0);
  }
}

//从store接收state数据
const mapStateToProps = store => {
  const questionnaireStore = store["questionnaireStore"];
  let { status } = questionnaireStore;

  return {
    status
  };
};

//向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    setQuesStatus: (pageIndex) => {
      dispatch(questionnaireActions.setQuesStatus(pageIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeQuestionnaireController);
