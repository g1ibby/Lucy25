import React from 'react';
import {IndexRedirect, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    NotFound,
  } from 'containers';

import Protected from 'components/Wrappers/Protected';
import Public from 'components/Wrappers/Public';

import Bookmarks from 'modules/Bookmarks/Bookmarks';
import Login from 'modules/Login/Login';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth, checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>

      <Route component={Protected} onEnter={requireLogin}>
        <IndexRedirect to="/collection/all" />
        <Route path="collection(/:idCollection)" component={Bookmarks}/>
      </Route>

      <Route component={Public}>
        <Route path="login" component={Login} onEnter={Login.onEnter(store)}/>
          <Route path="*" component={NotFound} status={404} />
      </Route>

    </Route>
  );
};
