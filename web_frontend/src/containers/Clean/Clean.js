import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import {connect} from 'react-redux';
import {load as cleanPage} from 'redux/modules/clean';

@asyncConnect([{
  deferred: false,
  promise: ({store: {dispatch}, params}) => {
    return dispatch(cleanPage(atob(params.url)));
  }
}])
@connect(
  (state) => {
    return {
      content: state.clean.content,
      title: state.clean.title
    };
  },
  {pushState: routeActions.push}
)
export default class Clean extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    pushState: PropTypes.func.isRequired
  };
  render() {
    const {title, content} = this.props;
    return (
      <div>
        <Helmet title="Clean"/>
        <div id="main">
          <div className="inner">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </div>
      </div>
    );
  }
}
