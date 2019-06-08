class Backend {
  constructor() {
    this.urls = {
      session: process.env.API_AUTH_USER_INFO,
      login: process.env.API_LOGIN,
      signUp: process.env.API_SIGN_UP,
      cart: process.env.API_AUTH_USER_CART,
      favorite: process.env.API_AUTH_USER_FAVORITES,
      product: process.env.API_PRODUCT
    };
  }
  getUrl = type => this.urls[type];

  apiHandler = (request, data, callBack) => {
    const url = this.getUrl(request);
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
