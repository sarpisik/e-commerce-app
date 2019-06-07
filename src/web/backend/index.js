class Backend {
  constructor() {}

  getUserInfo = (url, session, callBack) => {
    this.makeApiCall(url, session)
      .then(({ success, message, ...authUser }) =>
        callBack(success, message, authUser)
      )
      .catch(err => console.error(err));
  };

  getSessionInfo = (url, formValues, callBack) => {
    this.makeApiCall(url, formValues)
      .then(({ success, message, ...authUser }) =>
        callBack(success, message, authUser)
      )
      .catch(err => console.error(err));
  };

  apiHandler = (url, data, callBack) => {
    this.makeApiCall(url, data)
      .then(({ success, message, ...authUser }) =>
        callBack(success, message, authUser)
      )
      .catch(err => console.error(err));
  };

  makeApiCall = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json());
  };
}

export default new Backend();
