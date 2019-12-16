import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import { Layout } from 'antd';

import WebsiteHeader from './component/common/WebsiteHeader';
import WebsiteFooter from './component/common/WebsiteFooter';
import './App.css';

/**
 * 网站后台的默认入口
 */
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <WebsiteHeader />
          <div style={{ height: '6rem' }}>An Empty Body</div>
          <WebsiteFooter />
        </Layout>
      </HashRouter>
    );
  }
}
