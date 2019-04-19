import { combineReducers } from 'redux-starter-kit';
import {
  byIdReducer,
  markersReducer,
} from './locations';


export { markLocation, unmarkLocation } from './locations';
export default combineReducers({
  locationsById: byIdReducer,
  markedLocations: markersReducer,
});
export * from './selectors';
