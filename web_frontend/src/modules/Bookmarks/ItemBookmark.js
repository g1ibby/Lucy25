import React, { Component, PropTypes } from 'react';

export default class ItemBookmark extends Component {
  static propTypes = {
    bookmark: PropTypes.object.isRequired
  };
  render() {
    const { bookmark } = this.props;
    return (
      <div className="item col-xs-12 col-lg-12" style={{'backgroundColor': '#fff', 'marginBottom': '10px'}}>
        <div className="row">
          <div className="col-xs-2">
            <a href="">
               <img src={bookmark.image} className="img-responsive" />
            </a>
          </div>
          <div className="col-xs-10">
            <h4> <a href="">{bookmark.title}</a>
            </h4>
            <p>{bookmark.subtitle}</p>
          </div>
        </div>
      </div>
    );
  }
}
