import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// 组件
import HeaderController from './page/header-controller';
import FooterController from './page/footer-controller';
import LoginController from './page/login-controller';
import RegisterController from './page/register-controller';
import IndexController from './page/index-controller';
import BackgroundController from './page/home-controller';
import NewsDetailController from '@/page/news/news-detail-controller';
import NewsMoreController from '@/page/news/news-more-controller.jsx';

// search 组件
import SchoolSearchController from './page/search/school-search-controller';
import MajorSearchController from './page/search/major-search-controller.jsx';

// 详情 组件
import SchoolDetailController from '@/page/detail/school-detail-controller.jsx';
// UI组件
import { Layout, Result, Button } from 'antd';

import {
  INDEX,
  LOGIN,
  BCG_ROOT_NAME,
  REGISTER,
  SEARCH_SCHOOL,
  SEARCH_MAJOR,
  NEWS_DETAIL,
  NEWS_MORE,
  SCHOOL_DETAIL
} from '@/constants/route-constants';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className='layout'>
        <HeaderController />
        <Content>
          <div>
            <Switch>
              <Route
                path={`/${INDEX.path}`}
                exact
                component={IndexController}
              />
              <Route
                path={`/${LOGIN.path}`}
                exact
                component={LoginController}
              />
              <Route
                path={`/${REGISTER.path}`}
                exact
                component={RegisterController}
              />
              <Route
                path={`/${SEARCH_SCHOOL.path}`}
                exact
                component={SchoolSearchController}
              />
              <Route
                path={`/${SEARCH_MAJOR.path}`}
                exact
                component={MajorSearchController}
              />
              <Route
                path={`/${NEWS_DETAIL.path}/:uuid&:type`}
                component={NewsDetailController}
              />
              <Route
                path={`/${NEWS_MORE.path}/:type`}
                component={NewsMoreController}
              />
              <Route
                path={`/${SCHOOL_DETAIL.path}/:id`}
                component={SchoolDetailController}
              />
              <Route
                path={`/${BCG_ROOT_NAME}`}
                component={BackgroundController}
              />
              <Route
                component={() => (
                  <Result
                    status='404'
                    title='404'
                    subTitle='对不起,您访问的页面不存在'
                    extra={
                      <Button type='primary'>
                        <Link to={'/'}>回到首页</Link>
                      </Button>
                    }
                  />
                )}
              />
            </Switch>
          </div>
        </Content>
        <FooterController />
      </div>
    );
  }
}

export default App;
