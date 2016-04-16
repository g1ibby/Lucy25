import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import counter from './counter';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  })
});
