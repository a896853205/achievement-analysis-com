import React from "react";

import { Carousel, Row, Col, Card } from "antd";

import "../style/index-controller.css";

class IndexController extends React.Component {
  render() {
    return (
      <div className="index-container">
        <div className="outter-row-dark">
          <Row className="black-row">
            <Col span={12}>
              <Carousel className="carou" autoplay>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
            </Col>
            <Col span={12}>
              <Card style={{ width: 500 }} className="card">
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
              <p>高考资讯></p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default IndexController;
