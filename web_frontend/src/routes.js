import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    NotFound,
    Clean
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="clean/:url" component={Clean} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
