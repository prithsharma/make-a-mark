import { createReducer } from 'redux-starter-kit';

// ACTION TYPES
const MARK = 'MARK_LOCATION';
const UNMARK = 'UNMARK_LOCATION';

const initialState = {
  locations: {
    byId: {},
    list: [],
  },
};

export default createReducer(initialState, {
  [MARK]: () => { },
  [UNMARK]: () => { },
});
