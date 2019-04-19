# Make A Mark

React Native based mobile app experimenting with map rendering in apps.

## APK for download - [v0.1](https://github.com/prithsharma/make-a-mark/releases/download/0.1/make-a-mark.apk)

App Demo             |    Storybook
:-------------------:|:-------------------------:
<img src="./demo/make-a-mark.gif" alt="Demo GIF" width="432" height="768" /> | <img src="./demo/storybook.gif" alt="Demo GIF" width="432" height="768" />

## Instructions for dev setup

- `yarn rn start` will start the usual RN server for serving files in the debug mode.
- `yarn storybook` however serves the storybook mode, with all components shown independently in
the storybook. Helpful for manual testing and independently operating on components.
- `yarn android` for building and installing a debug build to an attached Android device
- `yarn lint .` for running lint tests.
- The dev setup is dependent on the environment config file(`.env`) that contains configuration
keys and secrets that the app needs. (Please get in touch with me for getting env secrets).
Sample env file [here](./env).
- The app communicates to the [API server](https://github.com/prithsharma/marker-api) using an
agreed upon pre-shared access token, based on JWT.

## Features and Considerations

- The app consists of the following features in the first version
  - Ability to view a map, with the usual map functions.
  - Ability to search addresses on the map and consequently mark them.
  - Ability to view all markers and cycle through them one by one.
  - Ability to remove a marker.
  - Server sync for storing coordinates store.
- Uses the [Mapbox Maps API](https://www.mapbox.com/maps/) for rendering maps and geocoding.
- The code is structure in way that the Geocoder component is independent and reusable.
That means not only can it be used at any other place without dependencies, all code dependent on
the geocoding service is isolated so that it can be plugged out and replaced with anything else if
needed.
- Since the app is all about maps and geocoding, the third party service is a clear single point
of failure. This is understood and a possible way to work around this is to have a fallback UX
devoid of the geocoding search(only map based). And have a fallback third party service in case the
primary service doesn't work. None of them were easy enough for v1.
- The app assumes **Germany** as the default area of operation, limiting search results to Germany
and the default map view to Germany.

## Notes

- Android as the primary choice of platform for testing, purely for ease of sharing. The code,
however, runs on both.
- Includes Storybook for manual testing of components.
- Given above, skips snapshot based unit-tests for components since all components are too simple
and volatile for unit tests to provide high value.
- There is a pending PR for Redux integration but I intentionally stayed away from introducing
Redux to the app. Especially when all the first-round features were limited to one container
component and could be handled easily with component state.

### TODOs

With more time, would have done the following -

- [ ] Implement 'Delete Marker' functionality.
- [ ] Abstract out color literals to Color Palette library.
- [ ] Refactor forward-geocoding logic out from the Geocoder component.
- [ ] Would integrate `react-redux`, `redux`, `redux-thunk` and the usual before moving to the next
set of features.
- [ ] Refactor out all geocoding service interactions to a service for better abstraction and
isolation. This is not straightforward. Would lead to the `Geocoder` component getting coupled with
a service and thus not easily reusable.
