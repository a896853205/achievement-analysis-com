import React from "react";
import { Row, Col } from "antd";

// css
import "../style/footer.css";

// UI组件
import { Layout } from "antd";
const { Footer } = Layout;

class FooterController extends React.Component {
  render() {
    return (
      <Footer className="footer">
        <div className="container">
          <img
            src="https://static.gcores.com/assets/d100f2c66959cf55084aad5f7adb6761.png"
            alt="机核"
            className="footer-logo"
          />
          <Row type="flex" className="footer-body">
            <Col span={14} className="footer-body-left">
              <div className="footer-title"> </div>{" "}
              <div className="footer-intro">
                <p>
                  {" "}
                  机核从2010年开始一直致力于分享游戏玩家的生活，
                  以及深入探讨游戏相关的文化。 我们开发原创的电台以及视频节目，
                  一直在不断寻找民间高质量的内容创作者。{" "}
                </p>{" "}
                <p>
                  {" "}
                  我们坚信游戏不止是游戏， 游戏中包含的科学， 文化，
                  历史等各个层面的知识和故事，
                  它们同时也会辐射到二次元甚至电影的领域，
                  这些内容非常值得分享给热爱游戏的您。{" "}
                </p>{" "}
              </div>{" "}
            </Col>{" "}
            <Col span={10} className="footer-body-right">
              <div className="footer-title"> </div>{" "}
              <div className="footer-links footer-thirdPlatforms">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.zhihu.com/org/ji-he-61-7/activities"
                  className="footer_inlineblock"
                >
                  {" "}
                  知乎{" "}
                </a>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://weibo.com/gamecore"
                  className="footer_inlineblock"
                >
                  {" "}
                  微博{" "}
                </a>{" "}
                <span className="footer_inlineblock" title="gamecores">
                  {" "}
                  微信{" "}
                </span>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://podcasts.apple.com/cn/podcast/id420660752"
                  className="footer_inlineblock"
                >
                  {" "}
                  Podcast{" "}
                </a>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://shop124260606.taobao.com/"
                  className="footer_inlineblock"
                >
                  {" "}
                  机核铺{" "}
                </a>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://shop463835368.taobao.com/index.htm"
                  className="footer_inlineblock"
                >
                  {" "}
                  核市{" "}
                </a>{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.gcores.com/rss"
                  className="footer_inlineblock"
                >
                  {" "}
                  RSS{" "}
                </a>{" "}
              </div>{" "}
              <div>
                <p> 增值电信业务经营许可证 京B2 - 20191060 </p>{" "}
                <p> 京ICP备17068232号 - 1 </p>{" "}
                <p>
                  <a
                    href="https://alioss.gcores.com/download/wenwangwen.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    网络文化经营许可证京网文[2019] 1067 - 097 号{" "}
                  </a>{" "}
                </p>{" "}
                <p>
                  <img
                    src="https://alioss.gcores.com/assets/gonganbeian-a20583c81805fe64f7fa210851ce29754af9d25fd6aa5a3225a9557529602513.png"
                    alt=""
                  />
                  <span> 京公网安备 11010502036937 号 </span>{" "}
                </p>{" "}
              </div>{" "}
            </Col>{" "}
          </Row>{" "}
          <div className="footer-btm"> </div>{" "}
        </div>{" "}
      </Footer>
    );
  }
}
export default FooterController;
