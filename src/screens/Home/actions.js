import Snackbar from 'react-native-snackbar';
import { post, del } from '../../lib/request';


// eslint-disable-next-line import/prefer-default-export
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
    const response = await del('/markers', { lat, long });
    await response.json();

    if (!response.ok) {
      Snackbar.show({ title: 'Error syncing with the servers.' });
    }
  } catch (e) {
    Snackbar.show({ title: 'Unable to connect to the servers.' });
    console.log(e);
  }
}
