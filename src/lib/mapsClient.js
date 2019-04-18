import mapboxClient from '@mapbox/mapbox-sdk';
import geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import Config from 'react-native-config';

const baseClient = mapboxClient({ accessToken: Config.MAPBOX_ACCESS_TOKEN });
const GeocodingClient = geocoding(baseClient);

export default GeocodingClient;
