import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';


@connect(
  null,
  {pushState: routeActions.push}
)
export default class Home extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  };

  submitUrl = (event) => {
    event.preventDefault();
    const codeUrl = btoa(this.refs.Url.value);
    this.props.pushState(`/clean/${codeUrl}`);
  };

  render() {
    return (
      <div>
        <Helmet title="Главная"/>
        <header id="header">
          <div className="inner">
            <a href="index.html" className="logo">
              <span className="symbol"><img src="images/logo.svg" alt="" /></span><span className="title">Lucy25</span>
            </a>
          </div>
        </header>
        <div id="main">
          <div className="inner">
            <header>
              <h1>Делаем некрасивое красивым.</h1>
            </header>
            <section className="tiles">
              <h2 style={{width: '100%'}}>Введите адресс страницы</h2>
              <br />
              <form style={{width: '50%'}} action="">
                <div className="field half first">
                  <input ref="Url" type="text" name="url" id="url" placeholder="URL" />
                </div>
                <ul className="actions">
                  <li><input onClick={this.submitUrl} type="submit" value="Обработать" className="special" /></li>
                </ul>
              </form>
            </section>
          </div>
        </div>

        <footer id="footer">
          <div className="inner">
            <ul className="copyright">
              <li>&copy; Lucy25. All rights reserved</li>
              <li><a target="_blank" href="http://github.com/suribit/Lucy25">suribit</a> 2016</li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}
