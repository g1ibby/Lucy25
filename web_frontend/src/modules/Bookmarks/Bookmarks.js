import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Content from 'components/Content';
import {load as loadTag} from 'redux/modules/tag';
import {load as loadBookmark} from 'redux/modules/bookmark';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import ItemBookmark from './ItemBookmark';

@asyncConnect([{
  deferred: false,
  promise: ({store: {dispatch}, params }) => {
    const idCollection = params.idCollection !== 'all' ? params.idCollection : null;
    return Promise.all([
      dispatch(loadTag()),
      dispatch(loadBookmark(idCollection))
    ]);
  }
}])
@connect(
  state => ({
    bookmarks: state.bookmark.list
  }),
  {pushState: routeActions.push}
)

export default class Bookmarks extends Component {
  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  };
  render() {
    const { bookmarks } = this.props;
    console.log(bookmarks);
    return (
      <Content>
        <Helmet title="Закладки"/>
        <h3>Bookmarks
          <small>Bookmarks Bookmarks Bookmarks</small>
        </h3>
        <div className="row">
          {
            bookmarks.map(item => <ItemBookmark bookmark={item} key={item.id} />)
          }
        </div>
      </Content>
    );
  }
}
