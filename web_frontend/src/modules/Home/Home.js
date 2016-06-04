import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Content from 'components/Content';

export default class Home extends Component {
  render() {
    return (
      <Content>
        <Helmet title="Статистика"/>
        <h3>Home
          <small>home home Home</small>
        </h3>
        <div className="row">
          <h1>home</h1>
        </div>
      </Content>
    );
  }
}
