import React from 'react';
class VoluntaryResultController extends React.Component {
  render() {
    return (<div>结果页调用showResult saga,使用props中的uuid查询出result存入redux, 结果页再显示出来</div>);
  }
}
export default VoluntaryResultController;