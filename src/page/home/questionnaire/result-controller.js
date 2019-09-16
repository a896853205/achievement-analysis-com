import React from "react";

// 请求文件
import { launchRequest } from "../../../util/request";
import * as APIS from "../../../constants/api-constants";
class ResultController extends React.Component {
  render() {
    return <div>ResultController</div>;
  }
  componentDidMount = async () => {
    let { returnResult } = await launchRequest(APIS.GET_QUESTIONNAIRE_RANK);
    console.log(returnResult);
  };
}
export default ResultController;
