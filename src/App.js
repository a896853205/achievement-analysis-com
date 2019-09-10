import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
// 组件
import LoginController from "./page/login-controller.js";
import IndexController from "./page/index-controller.js";
import BackgroundController from './page/home-controller';

class App extends Component {
  render () {
    const NoMatch = () => <div>4 0 4  NOT  FOUND</div>
    
    return (
      <div>
        <Switch>
          <Route path='/' exact component={IndexController} />
          <Route path='/login' exact component={LoginController} />
          <Route path='/background' component={BackgroundController} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
