import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Collapse } from 'react-bootstrap';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import MenuItem from './MenuItem';

@connect(
  state => ({
    user: state.auth.user,
    routing: state.routing
  }),
  {pushState: routeActions.push}
)
export default class Sidebar extends Component {

  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };
  handleClick = () => {
    this.props.pushState('/profile');
  };
  render() {
    const user = this.props.user;
    return (
      <aside className="aside">
        <div className="aside-inner">
          <nav className="sidebar">
            <ul className="nav">
              <li className="has-user-block" onClick={this.handleClick}>
                <Collapse className="collapse in">
                  <div className="item user-block">
                    <div className="user-block-info">
                      <b className="user-block-name">{user.fname} {user.sname}
                        <Link to="/profile" style={{'marginLeft': '5px'}}>
                          <em className="icon-settings" />
                        </Link>
                      </b>
                    </div>
                  </div>
                </Collapse>
              </li>
              <li className="nav-heading">
                <span>Меню</span>
              </li>
              <MenuItem to="/home" img="icon-chart" key="1">Статиситка</MenuItem>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
