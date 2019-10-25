import React from 'react';

// css
import '../style/footer.css';

// UI
import { Icon } from 'antd';

class FooterController extends React.Component {
  render() {
    return (
      <div className="footer-box">
        <div className="footer-first-list-box page-inner-width-box">
          <img
            className="footer-logo"
            src="/images/footer/logo.png"
            alt="logo"
          />
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 智赢VIP </h5>{' '}
            <ul>
              <li> 升级VIP </li> <li> 激活 </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 官方说明 </h5>{' '}
            <ul>
              <li> 意见反馈 </li> <li> 服务条款 </li> <li> 免责声明 </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 关于我们 </h5>{' '}
            <ul>
              <li> 团队介绍 </li> <li> 联系我们 </li> <li> 商务合作 </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 志愿填报 </h5>{' '}
            <img src="" alt="" />
          </div>{' '}
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 关注微信 </h5>{' '}
            <img src="" alt="" />
          </div>{' '}
          <div className="footer-list-item">
            <h5 className="footer-list-title"> 优惠团购 </h5>{' '}
            <ul>
              <li> 多人预定 </li> <li> 超值优惠 </li> <li> 如有需求请联系 </li>{' '}
              <li> 1234567890 </li>{' '}
            </ul>{' '}
          </div>{' '}
        </div>{' '}
        <div className="footer-second-list-box page-inner-width-box">
          <img
            src="/images/footer/title-logo.png"
            className="footer-title-logo"
            alt="title-logo"
          />
          <div className="footer-link-list-box">
            <h5> 友情链接 </h5>{' '}
            <ul>
              <li>
                <a href="https://gaokao.chsi.com.cn/"> 阳光高考 </a>{' '}
              </li>{' '}
              <li>
                <a href="http://www.gkzxw.net.cn/"> 高考在线 </a>{' '}
              </li>{' '}
              <li>
                <a href="http://www.lzk.hl.cn/"> 黑龙江龙招港 </a>{' '}
              </li>{' '}
              <li>
                <a href="http://www.cnrencai.com/ceping/"> 人才测评 </a>{' '}
              </li>{' '}
              <li>
                <a href="https://ke.qq.com/"> 腾讯课堂 </a>{' '}
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-icon-list">
            <div className="footer-icon-box">
              <Icon className="footer-icon" type="trophy" />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
          <div className="footer-icon-list">
            <div className="footer-icon-box">
              <Icon className="footer-icon" type="project" />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
          <div className="footer-icon-list">
            <div className="footer-icon-box">
              <Icon className="footer-icon" type="crown" />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    );
  }
}
export default FooterController;
