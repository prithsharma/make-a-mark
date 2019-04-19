import {
  createAction,
  createReducer,
} from 'redux-starter-kit';

export const markLocation = createAction('MARK_LOCATION');
export const unmarkLocation = createAction('UNMARK_LOCATION');

export const byIdReducer = createReducer({}, {
  [markLocation]: state => state,
  [unmarkLocation]: state => state,
});

export const markersReducer = createReducer([], {
  [markLocation]: state => state,
  [unmarkLocation]: state => state,
});
