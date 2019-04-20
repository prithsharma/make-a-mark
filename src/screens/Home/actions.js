import Snackbar from 'react-native-snackbar';
import GeocodingClient from '../../lib/mapsClient';
import { get, post } from '../../lib/request';
import Logger from '../../lib/logger';


export async function getAllMarkers() {
  try {
    const response = await get('/markers');
    const responseObj = await response.json();

    if (response.ok && responseObj && responseObj.length > 0) {
      const geocodeResults = await Promise.all(
        responseObj.map(async ({ lat, long }) => {
          const latitude = Number(lat);
          const longitude = Number(long);
          const result = await GeocodingClient.reverseGeocode({
            query: [longitude, latitude],
            countries: ['DE'],
          }).send();

          if (result && result.body.features.length > 0) {
            return result.body.features
              .find(f => f.center[0] === longitude && f.center[1] === latitude);
          }
          return null;
        }),
      );
      return geocodeResults.filter(g => g);
    }

    return [];
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    Logger.error(e);
    return [];
  }
}

export async function addMarker(locationObj) {
  const [long, lat] = locationObj.center;
  try {
    const response = await post('/markers', { lat, long });
    const responseObj = await response.json();

    if (!response.ok && responseObj.message !== 'TAKEN') {
      Snackbar.show({ title: 'Error syncing with the servers.' });
    }
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    Logger.error(e);
  }
}

export async function removeMarker(locationObj) {
  const [long, lat] = locationObj.center;
  try {
    const response = await post('/markers/delete', { lat, long });

    if (!response.ok) {
      Snackbar.show({ title: 'Error syncing with the servers.' });
      Logger.error(response);
    }
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    Logger.error(e);
  }
}
