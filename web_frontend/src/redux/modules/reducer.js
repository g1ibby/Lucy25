import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import {reducer as form} from 'redux-form';
import entities from './entities';
import progress from './progress';
import tag from './tag';
import bookmark from './bookmark';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  progress,
  form,
  entities,
  tag,
  bookmark
});
