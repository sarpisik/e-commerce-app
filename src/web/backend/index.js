class Backend {
  constructor() {
    this.urls = {
      session:
        process.env['CUSTOMCONNSTR_API_AUTH_USER_INFO'] ||
        process.env.API_AUTH_USER_INFO,
      login: process.env['CUSTOMCONNSTR_API_LOGIN'] || process.env.API_LOGIN,
      signUp:
        process.env['CUSTOMCONNSTR_API_SIGN_UP'] || process.env.API_SIGN_UP,
      userUpdate:
        process.env['CUSTOMCONNSTR_API_AUTH_USER_UPDATE'] ||
        process.env.API_AUTH_USER_UPDATE,
      cart:
        process.env['CUSTOMCONNSTR_API_AUTH_USER_CART'] ||
        process.env.API_AUTH_USER_CART,
      favorite:
        process.env['CUSTOMCONNSTR_API_AUTH_USER_FAVORITES'] ||
        process.env.API_AUTH_USER_FAVORITES,
      products:
        process.env['CUSTOMCONNSTR_API_PRODUCTS'] || process.env.API_PRODUCTS,
      product:
        process.env['CUSTOMCONNSTR_API_PRODUCT'] || process.env.API_PRODUCT,
      search:
        process.env['CUSTOMCONNSTR_API_PRODUCT_SEARCH'] ||
        process.env.API_PRODUCT_SEARCH
    };
  }
  getUrl = type => this.urls[type];

  apiHandler = (request, body, callBack) => {
    const url = this.getUrl(request);
    this.makeApiCall(url, body)
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
