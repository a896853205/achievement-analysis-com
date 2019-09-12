import React from 'react';

// css
import '../style/footer.css';

// UI组件
import { Layout } from "antd";
const { Footer } = Layout;

class FooterController extends React.Component {
  render() {
    return (
      <Footer className="footer">
        <div className="footer-left">
          <ul>
            <li><a href="www.baidu.com">学信网</a></li>
            <li><a href="www.baidu.com">中心简介</a></li>
            <li><a href="www.baidu.com">关于我们</a></li>
            <li><a href="www.baidu.com">版权声明</a></li>
            <li><a href="www.baidu.com">帮助中心</a></li>
            <li><a href="www.baidu.com">网站地图</a></li>
            <li><a href="www.baidu.com">宣传代理</a></li>
          </ul>
          <p>主办单位：全国高等学校学生信息咨询与就业指导中心</p>
          <p>Copyright © 2003-2019 学信网 All Rights Reserved</p>
          <p>京ICP备19004913号</p>
        </div>
        <div className="footer-right">
          <ul>
            <li>官方微信</li>
            <li>官方微博</li>
          </ul>
          <p>服务热线：010-82199588</p>
          <p>客服邮箱：kefu#chsi.com.cn（将#替换为@）</p>
        </div>
      </Footer>
    );
  }
}
export default FooterController;