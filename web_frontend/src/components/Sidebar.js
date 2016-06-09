import React, {Component, PropTypes} from 'react';
import { Collapse } from 'react-bootstrap';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import MenuItem from './MenuItem';

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    routing: state.routing,
    tags: state.tag.list,
    error: state.tag.error
  };
}

@connect(
  mapStateToProps,
  {pushState: routeActions.push}
)
export default class Sidebar extends Component {

  static propTypes = {
    user: PropTypes.object,
    tags: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  };
  render() {
    const {user, tags} = this.props;
    return (
      <aside className="aside">
        <div className="aside-inner">
          <nav className="sidebar">
            <ul className="nav">
              <li className="has-user-block">
                <Collapse className="collapse in">
                  <div className="item user-block">
                    <div className="user-block-info">
                      <b className="user-block-name">{user.firstname} {user.lastname}</b>
                    </div>
                  </div>
                </Collapse>
              </li>
              <MenuItem to={'/collection/all'} img="icon-shuffle">Все</MenuItem>
              <li className="nav-heading">
                <span>Мои коллекции</span>
              </li>
              {
                tags.map(item => <MenuItem to={`/collection/${item._id}`} img="icon-folder-alt" key={item._id}>{item.label}</MenuItem>)
              }
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
