import React from "react";

import { Carousel, Row, Col, Card } from "antd";

import "../style/index-controller.css";

class IndexController extends React.Component {
  examInfo() {
    let res = [];
    for (let i = 0; i < 5; i++) {
      res.push(
        <Col key={i} span={4}>
          <div className="news-img">
            <img
              className="news-img"
              height="100%"
              width="100%"
              alt=""
              src="https://image.gcores.com/478de810-3d09-4eef-8a29-369bbc016865.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_1600/quality,q_90"
            ></img>
            <div className="news_content">
              <h3>高考将于2020年全面取消</h3>
            </div>
          </div>
        </Col>
      );
    }
    return res;
  }
  render() {
    return (
      <div className="index-container page-min-width">
        <div className="outter-row-dark">
          <Row className="black-row">
            <Col span={15}>
              <Carousel className="carou" autoplay>
                <div>
                  <img
                    className="carou-img"
                    src="https://image.gcores.com/478de810-3d09-4eef-8a29-369bbc016865.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_1600/quality,q_90"
                    alt="banner1"
                  ></img>
                </div>
                <div>
                  <img
                    className="carou-img"
                    src="https://image.gcores.com/478de810-3d09-4eef-8a29-369bbc016865.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_1600/quality,q_90"
                    alt="banner2"
                  ></img>
                </div>
              </Carousel>
            </Col>
            <Col span={8}>
              <Card className="card">
                <p>2019志愿模拟填报</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="outter-row-light">
          <Row className="title">
            <Col span={2}>
              <h2 className="ah_title">
                <a href="/news" target="_blank">
                  高考资讯
                  <span className="pl-3 ah-title-arrow">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="gfas"
                      data-icon="angle-right"
                      className="svg-inline--fa fa-sm"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 8 12"
                    >
                      <path
                        fill="currentColor"
                        d="M5.22168604,6 L0.859497044,10.0506041 C0.404197905,10.4733818 0.377834128,11.1852038 0.8006119,11.640503 C1.22338967,12.0958021 1.93521165,12.1221659 2.39051079,11.6993881 L7.64050657,6.82439202 C8.11982954,6.3793064 8.11982954,5.6206936 7.64050657,5.17560798 L2.39051079,0.3006119 C1.93521165,-0.122165872 1.22338967,-0.0958020947 0.8006119,0.359497044 C0.377834128,0.814796182 0.404197905,1.52661816 0.859497044,1.94939593 L5.22168604,6 Z"
                      ></path>
                    </svg>
                  </span>
                </a>
              </h2>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" className="news-row">
            {this.examInfo()}
          </Row>
        </div>
        <div className="outter-row dark">
          <Row className="title">
            <Col span={2}>
              <h2 className="ah_title">
                <a href="/news" target="_blank">
                  名校推荐
                  <span className="pl-3 ah-title-arrow">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="gfas"
                      data-icon="angle-right"
                      className="svg-inline--fa fa-sm"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 8 12"
                    >
                      <path
                        fill="currentColor"
                        d="M5.22168604,6 L0.859497044,10.0506041 C0.404197905,10.4733818 0.377834128,11.1852038 0.8006119,11.640503 C1.22338967,12.0958021 1.93521165,12.1221659 2.39051079,11.6993881 L7.64050657,6.82439202 C8.11982954,6.3793064 8.11982954,5.6206936 7.64050657,5.17560798 L2.39051079,0.3006119 C1.93521165,-0.122165872 1.22338967,-0.0958020947 0.8006119,0.359497044 C0.377834128,0.814796182 0.404197905,1.52661816 0.859497044,1.94939593 L5.22168604,6 Z"
                      ></path>
                    </svg>
                  </span>
                </a>
              </h2>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" className="news-row">
            <Col span={4}>
              <div className="news-img"></div>
            </Col>
            <Col span={4}>
              <div className="news-img"></div>
            </Col>
            <Col span={4}>
              <div className="news-img"></div>
            </Col>
            <Col span={4}>
              <div className="news-img"></div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default IndexController;
