// eslint-disable-next-line import/prefer-default-export
export function getMarkedLocations(state) {
  const {
    list,
    byId,
  } = state.locations;
  return list.map(id => byId[id]);
}
