import Config from 'react-native-config';

const HOST = Config.API_HOST;
const ACCESS_TOKEN = Config.API_ACCESS_TOKEN;

function createQueryParamString(params) {
  function createQueryParam(name, value) {
    const esc = encodeURIComponent;
    return `${esc(name)}=${esc(value)}`;
  }

  /**
   * Takes in params object and returns a flat list of
   * query params, values to stringify. Handles array query params.
   */
  function flattenParamList(paramsObj) {
    return Object.entries(paramsObj).reduce(
      (flatList, [param, value]) => {
        if (Array.isArray(value)) {
          return [
            ...flatList,
            ...value.map(val => [param, val]),
          ];
        }

        return [
          ...flatList,
          [param, value],
        ];
      },
      [],
    );
  }

  return flattenParamList(params)
    .map(([name, value]) => createQueryParam(name, value))
    .join('&');
}

function executeRequest(urlSuffix, method, params) {
  const headers = {
    Authorization: ACCESS_TOKEN,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  const options = {
    method,
    headers,
  };
  let url = `https://${HOST}${urlSuffix}`;

  if (method === 'GET') {
    url += createQueryParamString(params);
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(url, options);
}

export function get(urlSuffix, params = {}) {
  return executeRequest(urlSuffix, 'GET', params);
}

export function post(urlSuffix, params = {}) {
  return executeRequest(urlSuffix, 'POST', params);
}

export function del(urlSuffix) {
  return executeRequest(urlSuffix, 'DELETE');
}
