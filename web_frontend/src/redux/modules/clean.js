const CLEAN = 'app/months/CLEAN';
const CLEAN_SUCCESS = 'app/months/CLEAN_SUCCESS';
const CLEAN_FAIL = 'app/months/CLEAN_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  list: [],
  isNext: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAN:
      return {
        ...state,
        loading: true
      };
    case CLEAN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        content: action.result.content,
        title: action.result.title
      };
    case CLEAN_FAIL:
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

export function load(url) {
  return {
    types: [CLEAN, CLEAN_SUCCESS, CLEAN_FAIL],
    promise: (client) => {
      return new Promise((resolve) => {
        client.get('/clean', {params: { url }}, true).then(
          (result) => {
            resolve({content: result.content, title: result.title});
          },
          () => {
            resolve({content: '', title: ''});
          }
        );
      });
    }
  };
}
