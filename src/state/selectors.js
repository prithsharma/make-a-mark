// eslint-disable-next-line import/prefer-default-export
export function getMarkedLocations(state) {
  const {
    locationsById,
    markedLocations,
  } = state;
  return markedLocations.map(id => locationsById[id]);
}
