import React from 'react';
// 路由
import { Link } from 'react-router-dom';
import { LOGIN } from '../constants/route-constants';

class IndexController extends React.Component {
  render() {
    return (
      <Link to={{
        pathname: `${LOGIN.path}`,
      }}>登录</Link>
    );
  }
}
export default IndexController;