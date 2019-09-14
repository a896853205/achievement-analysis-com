import React from 'react';

// 自定义组件
import WelcomeController from './questionnaire/welcome-controller';
import QuestionnaireController from './questionnaire/questionnaire-controller';
import ResultController from './questionnaire/result-controller';
class HomeQuestionnaireController extends React.Component {
  render() {
    return (
      <div>
        问卷
        <WelcomeController />
        <QuestionnaireController />
        <ResultController />
      </div>
    );
  }
}
export default HomeQuestionnaireController;