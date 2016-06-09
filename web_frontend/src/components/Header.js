import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from 'redux/modules/auth';


@connect(
  null,
  {logout}
)
export default class Header extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <header className="topnavbar-wrapper">
          <nav role="navigation" className="navbar topnavbar">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <div className="brand-logo">
                  <h4 style={{marginTop: '5px', color: '#FFFFFF'}}>Lucy25</h4>
                </div>
              </Link>
            </div>
            <div className="nav-wrapper">
              <ul className="nav navbar-nav navbar-right">
                <li onClick={this.handleLogout} style={{cursor: 'pointer'}}>
                  <a>
                    <em className="icon-logout" /> Выход
                  </a>
                </li>
              </ul>
            </div>
            <form role="search" action="search.html" className="navbar-form">
               <div className="form-group has-feedback">
                  <input type="text" placeholder="Type and hit enter ..." className="form-control" />
                  <div data-search-dismiss="" className="fa fa-times form-control-feedback"></div>
               </div>
               <button type="submit" className="hidden btn btn-default">Submit</button>
            </form>
          </nav>
      </header>
    );
  }

}
