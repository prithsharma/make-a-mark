import {
  createAction,
  createReducer,
} from 'redux-starter-kit';

export const markLocation = createAction('MARK_LOCATION');
export const unmarkLocation = createAction('UNMARK_LOCATION');

export const byIdReducer = createReducer({}, {
  [markLocation]: (state, locationObj) => ({
    ...state,
    [locationObj.id]: locationObj,
  }),
  [unmarkLocation]: (state, locationId) => {
    const newState = {};
    Object.keys(state)
      .filter(id => id !== locationId)
      .forEach((id) => { newState[id] = state[id]; });
    return newState;
  },
});

export const markersReducer = createReducer([], {
  [markLocation]: (state, locationObj) => [...state, locationObj.id],
  [unmarkLocation]: (state, locationId) => state.filter(id => id !== locationId),
});
