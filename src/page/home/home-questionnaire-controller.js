import React from 'react';
import QuestionnaireController from './questionnaire/questionnaire-controller';
class HomeQuestionnaireController extends React.Component {
  render() {
    return (
      <div>
        问卷
        <QuestionnaireController />
      </div>
    );
  }
}
export default HomeQuestionnaireController;