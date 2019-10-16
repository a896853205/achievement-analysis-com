import React from 'react';
class NewsController extends React.Component {
  render() {
    return <div>NewsController</div>;
  }

  componentDidMount() {
    // 获取url上的新闻uuid
    let { uuid, type } = this.props.match.params;
    // 调用查询新闻详细信息的接口
    console.log(uuid, type);
  }
}
export default NewsController;
