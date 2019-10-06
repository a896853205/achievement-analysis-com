import React from 'react';

import { Carousel, Row, Col, Card, Icon } from 'antd';

// 路由
import { withRouter } from 'react-router-dom';

import { SEARCH_SCHOOL, SEARCH_MAJOR } from '../constants/route-constants';

import '../style/index-controller.css';

class IndexController extends React.Component {
  examInfo() {
    let res = [];
    for (let i = 0; i < 5; i++) {
      res.push(
        <Col key={i} span={4}>
          <div className='news-img'>
            <img
              className='news-img'
              height='100%'
              width='100%'
              alt=''
              src='http://img3.youzy.cn/content/media/thumbs/p00190135.jpeg'
            />
            <div className='news_content'>
              <h3>中国大学排名汇总</h3>
            </div>
          </div>
        </Col>
      );
    }
    return res;
  }
  render() {
    return (
      <div className='index-container page-min-width'>
        <div className='outter-row-dark'>
          <Row className='black-row'>
            <Col span={15}>
              <Carousel className='carou' autoplay>
                <div>
                  <img
                    className='carou-img'
                    src='https://cdn.dribbble.com/users/418188/screenshots/6665427/design_for_education_illustration_tubik_2x.png'
                    alt='banner1'
                  />
                </div>
                <div>
                  <img
                    className='carou-img'
                    src='https://cdn.dribbble.com/users/1355613/screenshots/6424710/communication.jpg'
                    alt='banner2'
                  />
                </div>
                <div>
                  <img
                    className='carou-img'
                    src='https://cdn.dribbble.com/users/2155177/screenshots/7080887/media/47a6904ef718d59a3900394bad12f867.png'
                    alt='banner3'
                  />
                </div>
              </Carousel>
            </Col>
            <Col span={8}>
              <Card className='card'>
                <p>2019志愿模拟填报</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className='outter-row-light'>
          <div className='search-row inner-box'>
            <div
              onClick={() => {
                this.props.history.push(`/${SEARCH_SCHOOL.path}`);
              }}
              className='search-outter-box school-background'
            >
              <div className='search-text-box'>
                <Icon type='bank' />
                <span className='search-title'>学校查询</span>
              </div>
              <div className='search-shadow-box' />
            </div>
            <div
              onClick={() => {
                this.props.history.push(`/${SEARCH_MAJOR.path}`);
              }}
              className='search-outter-box major-background'
            >
              <div className='search-text-box'>
                <Icon type='book' />
                <span className='search-title'>专业查询</span>
              </div>
              <div className='search-shadow-box' />
            </div>
          </div>
        </div>
        <div className='outter-row-light'>
          <Row className='title'>
            <Col span={2}>
              <h2 className='ah_title'>
                <a href='/news' target='_blank'>
                  高考资讯
                  <span className='pl-3 ah-title-arrow'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='gfas'
                      data-icon='angle-right'
                      className='svg-inline--fa fa-sm'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 8 12'
                    >
                      <path
                        fill='currentColor'
                        d='M5.22168604,6 L0.859497044,10.0506041 C0.404197905,10.4733818 0.377834128,11.1852038 0.8006119,11.640503 C1.22338967,12.0958021 1.93521165,12.1221659 2.39051079,11.6993881 L7.64050657,6.82439202 C8.11982954,6.3793064 8.11982954,5.6206936 7.64050657,5.17560798 L2.39051079,0.3006119 C1.93521165,-0.122165872 1.22338967,-0.0958020947 0.8006119,0.359497044 C0.377834128,0.814796182 0.404197905,1.52661816 0.859497044,1.94939593 L5.22168604,6 Z'
                      />
                    </svg>
                  </span>
                </a>
              </h2>
            </Col>
          </Row>
          <Row type='flex' justify='space-between' className='news-row'>
            {this.examInfo()}
          </Row>
        </div>
        <div className='outter-row dark'>
          <Row className='title'>
            <Col span={2}>
              <h2 className='ah_title'>
                <a href='/news' target='_blank'>
                  名校推荐
                  <span className='pl-3 ah-title-arrow'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='gfas'
                      data-icon='angle-right'
                      className='svg-inline--fa fa-sm'
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 8 12'
                    >
                      <path
                        fill='currentColor'
                        d='M5.22168604,6 L0.859497044,10.0506041 C0.404197905,10.4733818 0.377834128,11.1852038 0.8006119,11.640503 C1.22338967,12.0958021 1.93521165,12.1221659 2.39051079,11.6993881 L7.64050657,6.82439202 C8.11982954,6.3793064 8.11982954,5.6206936 7.64050657,5.17560798 L2.39051079,0.3006119 C1.93521165,-0.122165872 1.22338967,-0.0958020947 0.8006119,0.359497044 C0.377834128,0.814796182 0.404197905,1.52661816 0.859497044,1.94939593 L5.22168604,6 Z'
                      />
                    </svg>
                  </span>
                </a>
              </h2>
            </Col>
          </Row>
          <Row type='flex' justify='space-between' className='news-row'>
            <Col span={4}>
              <div className='news-img' />
            </Col>
            <Col span={4}>
              <div className='news-img' />
            </Col>
            <Col span={4}>
              <div className='news-img' />
            </Col>
            <Col span={4}>
              <div className='news-img' />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default withRouter(IndexController);
