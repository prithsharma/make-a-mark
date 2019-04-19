# Make A Mark

React Native based mobile app experimenting with map rendering in apps.
<img
    src="https://github.com/prithsharma/make-a-mark/raw/a7683f3badb761303b3cb318a39906aee8b219a9/demo/make-a-mark.gif"
    alt="Demo GIF"
    width="288"
    height="512"
/>

yarn storybook
yarn rn start

## Notes

- Uses the [Mapbox Maps API](https://www.mapbox.com/maps/) for rendering maps and geocoding.
- Android as the primary choice of platform for testing, purely for ease of sharing. The code,
however, runs on both.
- Includes Storybook for manual testing of components.
- Given above, skips snapshot based unit-tests for components since all components are too simple
and volatile for unit tests to provide high value.

### TODOs

With more time, would have done the following -

- [ ] Implement 'Delete Marker' functionality.
- [ ] Abstract out color literals to Color Palette library.
- [ ] Refactor forward-geocoding logic out from the Geocoder component.
