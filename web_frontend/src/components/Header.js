import React, {Component} from 'react';
import {Link} from 'react-router';
import SearchAdd from './SearchAdd';

export default class Header extends Component {

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
            <SearchAdd />
          </nav>
      </header>
    );
  }
}
