import React, {Component, PropTypes} from 'react';
import { Collapse } from 'react-bootstrap';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import MenuItem from './MenuItem';
import {logout} from 'redux/modules/auth';

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
  {pushState: routeActions.push, logout: logout}
)
export default class Sidebar extends Component {

  static propTypes = {
    user: PropTypes.object,
    tags: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  render() {
    const {user, tags} = this.props;
    const faceImage = require('./04.jpg');
    return (
      <aside className="aside">
        <div className="aside-inner">
          <nav className="sidebar">
            <ul className="nav">
              <li className="has-user-block">
                <Collapse className="collapse in">
                  <div className="item user-block">
                    <div className="user-block-picture">
                        <div className="user-block-status">
                           <img src={faceImage} width="60" height="60" className="img-thumbnail img-circle" />
                           <div className="circle circle-success circle-lg"></div>
                        </div>
                     </div>
                    <div className="user-block-info">
                      <b className="user-block-name">{user.firstname} {user.lastname}</b>
                      <a href="#" onClick={this.handleLogout}>Выход</a>
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
