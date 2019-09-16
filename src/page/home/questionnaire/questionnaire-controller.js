import React from "react";

import { connect } from "react-redux";
import { actions as questionnaireActions } from "../../../redux/questionnaire-model";

// 请求文件
import { launchRequest } from "../../../util/request";
import * as APIS from "../../../constants/api-constants";

import "../../../style/questionnaire/questionnaire.css";

import { Typography, Button } from "antd";

const { Title } = Typography;
class QuestionnaireController extends React.Component {
  state = {
    questions: [],
    ans: [],
    index: 0,
    loading: true,
    finished: false
  };
  render() {
    return (
      <div className="ques-top cont bg-light">
        <Typography className="box-min-width ques-title">
          <Title>
            {this.state.loading
              ? "问卷加载中..."
              : `${this.state.questions[this.state.index].id}.${this.state.questions[this.state.index].question}`}
          </Title>
        </Typography>
        <div className="box-min-width question-button-con">
          <Button
            type="primary"
            size="large"
            disabled={this.state.loading ? true : false}
            className="question-button"
            onClick={() => {
              this.quesDo(1);
            }}
          >
            是
          </Button>
        </div>
        <div className="box-min-width question-button-con">
          <Button
            type="danger"
            size="large"
            disabled={this.state.loading ? true : false}
            className="question-button"
            onClick={() => {
              this.quesDo(0);
            }}
          >
            否
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    let data = await launchRequest(APIS.GET_QUESTIONNAIRE_TEST, {});

    console.log("data", data);

    await this.setState({
      questions: data.questionList,
      loading: false
    });
  };

  quesDo = async type => {
    if (this.state.finished) {
      return;
    }
    let tempAnswers = this.state.ans;
    tempAnswers.push(type);
    await this.setState({
      index:
        this.state.index === this.state.questions.length - 1
          ? this.state.index
          : this.state.index + 1,
      ans: tempAnswers
    });
    if (this.state.ans.length === this.state.questions.length) {
      console.log("答完了");
      console.log("目前的答案", this.state.ans);
      await launchRequest(APIS.UPLOAD_QUESTIONNAIRE_RESULT, {
        quesResult: this.state.ans
      });
      await this.setState({
        finished: true
      });
      this.props.setQuesStatus(2);
      return;
    }
  };
}

const mapStateToProps = store => {
  const questionnaireStore = store["questionnaireStore"];
  let { status } = questionnaireStore;

  return {
    status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuesStatus: pageIndex => {
      dispatch(questionnaireActions.setQuesStatus(pageIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireController);
