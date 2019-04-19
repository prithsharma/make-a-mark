import {
  createAction,
  createReducer,
} from 'redux-starter-kit';
import Snackbar from 'react-native-snackbar';
import { get, post, del } from '../lib/request';

const markLocation = createAction('MARK_LOCATION');
const unmarkLocation = createAction('UNMARK_LOCATION');

export async function fetchAllMarkers() {
  try {
    const response = await get('/markers');
    const responseObj = await response.json();
  } catch (e) {
    console.log(e);
  }
}

export function addMarker(locationObj) {
  return async (dispatch) => {
    const [long, lat] = locationObj.center;
    try {
      const response = await post('/markers', { lat, long });
      const responseObj = await response.json();

      if (!response.ok && responseObj.message !== 'TAKEN') {
        Snackbar.show({ title: 'Error syncing with the servers.' });
      }

      const apiId = responseObj.id;
      dispatch(markLocation({ ...locationObj, apiId }));
      console.log(responseObj);
    } catch (e) {
      Snackbar.show({ title: 'Unable to connect to the servers.' });
      console.log(e);
    }
  };
}

export function removeMarker(locationId) {
  return async (dispatch, getState) => {
    try {
      const store = getState();
      const { apiId } = store.locationsById[locationId];
      if (apiId) {
        const response = await del(`/markers/${apiId}`);
        const responseObj = await response.json();
        console.log(responseObj);
      }
      dispatch(unmarkLocation(locationId));
    } catch (e) {
      Snackbar.show({ title: 'Error unmarking location' });
    }
  };
}

export const byIdReducer = createReducer({}, {
  [markLocation]: (state, { payload: locationObj }) => ({
    ...state,
    [locationObj.id]: locationObj,
  }),
  [unmarkLocation]: (state, { payload: locationId }) => {
    const newState = {};
    Object.keys(state)
      .filter(id => id !== locationId)
      .forEach((id) => { newState[id] = state[id]; });
    return newState;
  },
});

export const markersReducer = createReducer([], {
  [markLocation]: (state, { payload: locationObj }) => {
    if (state.includes(locationObj.id)) {
      return state;
    }
    return [...state, locationObj.id];
  },
  [unmarkLocation]: (state, { payload: locationId }) => state.filter(id => id !== locationId),
});
