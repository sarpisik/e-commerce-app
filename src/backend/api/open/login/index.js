const db = require('../../../db/mongo');
const getUser = require('../../../utility/users');
const tokenGenerator = require('../../../utility/token');
const helpers = require('../../../utility/helpers');

const { rejectHandler } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email, password } = request.body;
    const respond = {
      success: false,
      message: ''
    };

    // If email and password fields filled, check database.
    // Else, send error.
    if (email && password) {
      getUser(email)
        .then(userResult => {
          // If the user is exist, generate a new token hash.
          // Else, send error.
          if (userResult && userResult.length > 0) {
            tokenGenerator(userResult, respond, email, password)
              // Send user infos and token hash
              .then(respond => resolve(respond))
              .catch(err => reject(err));
          } else {
            reject(rejectHandler(respond, 'User Does Not Exist'));
          }
        })
        .catch(err => {
          reject(rejectHandler(respond, err));
        });
    } else {
      reject(rejectHandler(respond, 'Login Error'));
    }
  });
};
