import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { Layout, Result, Button } from 'antd';

import FooterController from '@/page/footer-controller';
import HeaderController from '@/page/header-controller';
import PageLoading from '@/page/index-components/page-loading';
import {
  INDEX,
  LOGIN,
  BCG_ROOT_NAME,
  SEARCH_SCHOOL,
  SEARCH_MAJOR,
  NEWS_DETAIL,
  NEWS_MORE,
  SCHOOL_DETAIL,
  MAJOR_DETAIL,
  VIP_PROFILE,
  SCHOOL_RECOMMEND,
  REGISTER,
} from '@/constants/route-constants';
import WarningController from '@/page/warning-controller';

const LoginController = lazy(() => import('@/page/login-controller'));
const IndexController = lazy(() => import('@/page/index-controller'));
const BackgroundController = lazy(() => import('@/page/home-controller'));
const NewsDetailController = lazy(() =>
  import('@/page/news/news-detail-controller')
);
const NewsMoreController = lazy(() =>
  import('@/page/news/news-more-controller')
);
const SchoolRecommendController = lazy(() =>
  import('@/page/school/school-recommend-controller')
);
const RegistrationController = lazy(() => import('@/page/register-controller'));
const SchoolSearchController = lazy(() =>
  import('@/page/search/school-search-controller')
);
const MajorSearchController = lazy(() =>
  import('@/page/search/major-search-controller')
);
const SchoolDetailController = lazy(() =>
  import('@/page/detail/school-detail-controller')
);
const MajorDetailController = lazy(() =>
  import('@/page/detail/major-detail-controller')
);
const vipPage = lazy(() => import('@/page/vip/vip-controller'));

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className='layout'>
        <WarningController />
        <HeaderController />
        <Suspense fallback={<PageLoading />}>
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
                  component={RegistrationController}
                />
                <Route
                  path={[
                    `/${SEARCH_SCHOOL.path}`,
                    `/${SEARCH_SCHOOL.path}/:searchName`,
                  ]}
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
                  path={`/${MAJOR_DETAIL.path}/:id`}
                  component={MajorDetailController}
                />
                <Route path={`/${VIP_PROFILE.path}`} component={vipPage} />
                <Route
                  path={`/${BCG_ROOT_NAME}`}
                  component={BackgroundController}
                />
                <Route
                  path={`/${SCHOOL_RECOMMEND.path}`}
                  component={SchoolRecommendController}
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
        </Suspense>
        <FooterController />
      </div>
    );
  }
}

export default App;
