import React, { Component } from 'react';

export default class WebsiteFooter extends Component {
  render() {
    // 根据编译时间设定年份
    const date = new Date();
    const year = date.getFullYear();

    return (
      <div className={'website-footer theme-color'}>
        <div className={'container vertical-middle'}>
          <p className={'footer-text'}>地址：广东省广州市黄埔大道西601号 | 邮编：510632 | 邮箱：tcuilin@jnu.edu.cn</p>
          <p className={'footer-text'}>Copyright © {year} AntLab | All Rights Reserved</p>
        </div>
      </div>
    );
  }
}
