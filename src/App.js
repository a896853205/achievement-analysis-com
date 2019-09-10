import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

// 组件
import HeaderController from './page/header-controller';
import FooterController from './page/footer-controller';
import LoginController from "./page/login-controller";
import IndexController from "./page/index-controller";
import BackgroundController from './page/home-controller';

// UI组件
import { Layout } from "antd";
const { Content } = Layout;

class App extends Component {
  render() {
    const NoMatch = () => <div>4 0 4  NOT  FOUND</div>

    return (
      <Layout className="layout">
        <HeaderController />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ boxSizing: 'border-box', padding: 24 }}>
            <Switch>
              <Route path='/' exact component={IndexController} />
              <Route path='/login' exact component={LoginController} />
              <Route path='/background' component={BackgroundController} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Content>
        <FooterController />
      </Layout>
    );
  }
}

export default App;
