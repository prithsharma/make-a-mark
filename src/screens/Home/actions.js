import Snackbar from 'react-native-snackbar';
import { get, post } from '../../lib/request';


export async function getAllMarkers() {
  try {
    const response = await get('/markers');
    const responseObj = await response.json();

    if (response.ok) {
      return responseObj;
    }
    return [];
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    console.log(e);
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
    console.log(e);
  }
}

export async function removeMarker(locationObj) {
  const [long, lat] = locationObj.center;
  try {
    const response = await post('/markers/delete', { lat, long });

    if (!response.ok) {
      Snackbar.show({ title: 'Error syncing with the servers.' });
    }
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    console.log(e);
  }
}
