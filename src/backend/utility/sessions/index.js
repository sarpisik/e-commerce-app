const db = require('../../db/mongo');
const helpers = require('../helpers');

const { rejectHandler } = helpers;

const checkSession = (session, email) => {
  return new Promise((resolve, reject) => {
    const respond = {
      success: false,
      message: 'No reason'
    };

    db.ReadDB(
      'users',
      {
        email,
        'tokens.token': session
      },
      { _id: 1, email: 1, tokens: 1 }
    )
      .then(userInfo => {
        // If the email and token are valid, respond success.
        // Else, token error.
        if (userInfo.length > 0) {
          respond.success = true;
          resolve(respond);
        } else {
          reject(rejectHandler(respond, 'Invalid Token'));
        }
      })
      .catch(err => reject(rejectHandler(respond, err)));
  });
};

module.exports = {
  checkSession
};
