const db = require('../../../db/mongo');
const helpers = require('../../../utility/helpers');

const { rejectHandler, userCredentialsToSend } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email } = request.body;
    const respond = {
      success: false,
      message: ''
    };
    // If email is not empty, check db.
    // Else, send error.
    if (email) {
      db.ReadDB('users', { email }, {})
        .then(userResult => {
          // If the user is exist in db, respond the user details.
          // Else, send error.
          if (userResult.length > 0) {
            respond.success = true;
            respond.message = '';
            // Set credentials to send client
            const cart = userResult[0].cart;
            resolve({ ...userCredentialsToSend(respond, userResult[0]), cart });
          } else {
            reject(rejectHandler(respond, 'User not valid.'));
          }
        })
        .catch(err => reject(rejectHandler(respond, err)));
    } else {
      reject(reject(rejectHandler(respond, 'Email is not valid.')));
    }
  });
};
