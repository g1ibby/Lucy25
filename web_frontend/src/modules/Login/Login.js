import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import LoginForm from './LoginForm';
import {reset as resetForm} from 'redux-form';

@connect(
  null,
  {...authActions, resetForm}
)
class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };


  handleSubmit = (data) => {
    const { login, load } = this.props;

    return login(data.username, data.password)
      .then(result => {
        if (result && typeof result.error === 'object') {
          return Promise.reject(result.error);
        }
        return load().then(res => {
          if (res && typeof res.error === 'object') {
            return Promise.reject(res.error);
          }
        });
      }, () => {
        this.props.resetForm('login');
        return Promise.reject({ password: 'Wrong password', _error: 'Login failed!' });
      });
  };

  render() {
    return (
      <div className="block-center mt-xl wd-xl">
        <Helmet title="Войти"/>
        <div className="panel panel-dark panel-flat">
          <div className="panel-heading text-center">
            <a href="#">
              <div className="block-center">
                <h1 className="text-muted" style={{'color': '#fff'}}>Lucy25</h1>
              </div>
            </a>
          </div>
          <div className="panel-body">
            <p className="text-center pv">ВХОД В СИСТЕМУ</p>
            <LoginForm onSubmit={this.handleSubmit} />
          </div>
        </div>
        <div className="p-lg text-center">
            <span>&copy;</span>
            <span>2016</span>
            <span>  Lucy25 - suribit</span>
         </div>
      </div>
    );
  }
}

Login.onEnter = (store) => {
  return (nextState, replace, cb) => {
    const { auth: { user }} = store.getState();

    if (user) {
      replace('/');
    }
    cb();
  };
};

export default Login;
