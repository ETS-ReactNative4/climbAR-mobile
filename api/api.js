const BASE_URL = 'climbar.herokuapp.com/';

export const api = async (url, method, body = null, headers = {}) => {
  try {
    const endPoint = BASE_URL.concat(url);
    const reqBody = body ? JSON.stringify(body) : null;

    const fetchParams = {method, headers};

    if (method === 'POST' && method === 'PUT' && !body) {
      throw new Error('Request body required');
    }
    if (reqBody) {
      fetchParams.headers['Content-type'] = 'application/json';
      fetchParams.body = fetchParams;
    }
    const fetchPromise = fetch(endPoint, fetchParams);
    //if don't get the response in 10 secs, will reject the whole promise
    const timeOutPromise = newPromise((resolve, reject) => {
      setTimeOut(() => {
        reject();
      }, 10000);
    });
    const response = await Promise.race([fetchPromise, timeOutPromise]);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

//created own function for API requests for DRY princiiple
export const fetchApi = async (
  url,
  method,
  body,
  token = null,
  loader = false,
  promiseReturnType = 'json',
) => {
  try {
    const headers = {};
    const result = {
      token: null,
      success: false,
      responseBody: null,
    };
    if (token) {
      headers['x-auth'] = token;
    }
    const response = await api(url, method, body, headers);
    if (response.status === statusCode) {
      result.success = true;
      const responseBody = await response.json();
      return responseBody;
    }
    throw response;
  } catch (e) {
    throw error;
  } finally {
  }
};

// const response = await fetchApi('/api/user', 'POST', {}, 200, token, true);
