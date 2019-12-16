import React, { Component } from 'react';

import JnuLogo from '../../img/jnu-logo.png';
import { Dropdown, Menu } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default class WebsiteHeader extends Component {
  render() {
    return (
      <div>
        <div className={'website-header theme-color'}>
          <div className={'container'}>
            <div className={'header-block'} style={{ marginRight: '1rem' }}>
              <img className={'jnu-logo'} src={JnuLogo} alt={'JnuLogo'} />
            </div>
            <div className={'header-block'}>
              <p className={'title-paragraph'}>暨南大学先进网络实验室</p>
              <p className={'title-paragraph'}>Advanced Networking Laboratory</p>
            </div>
          </div>
        </div>
        <div className={'container nav-bar'}>
          <div className="nav-item">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
              最新消息
              </a>
            </Dropdown>
          </div>
          <div className="nav-item">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
              活动
              </a>
            </Dropdown>
          </div>
          <div className="nav-item">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
              简介
              </a>
            </Dropdown>
          </div>
          <div className="nav-item">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
              成员
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
