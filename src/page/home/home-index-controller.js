import React from 'react';

// UI组件
import { Button } from "antd";

// 路由
import { VOLUNTARY, QUESTIONNAIRE } from "../../constants/route-constants";

// 路由
import { Link } from "react-router-dom";
class HomeIndexController extends React.Component {
  render() {
    return (
      <div>
        <Link
          to={{
            pathname: `${VOLUNTARY.path}`
          }}>
          <Button>填报志愿</Button>
        </Link>
        <Link
          to={{
            pathname: `${QUESTIONNAIRE.path}`
          }}>
          <Button>填报问卷</Button>
        </Link>
      </div>
    );
  }
}
export default HomeIndexController;