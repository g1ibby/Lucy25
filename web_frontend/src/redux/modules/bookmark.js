const _ = require('utils/lodash');

const LOAD = 'app/bookmarks/LOAD';
const LOAD_SUCCESS = 'app/bookmarks/LOAD_SUCCESS';
const LOAD_FAIL = 'app/bookmarks/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  list: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.list
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function load(idCollection) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      return new Promise((resolve, reject) => {
        const params = {};
        if (idCollection !== null) {
          params['filter[collection]'] = idCollection;
        }
        client.get('/bookmarks', { params: params }, true).then(
          (result) => {
            if (_.isEmpty(result)) {
              resolve({list: []});
              return;
            }
            resolve({ list: result.items });
          },
          (error) => {
            if (error.details.error.code === 404) {
              resolve({list: []});
            } else {
              reject(error);
            }
          }
        );
      });
    }
  };
}
