const db = require('../../../db/mongo');
const security = require('../../../utility/security');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email, username, password } = request.body;
    const result = { success: false, message: '' };

    // If email, username and password fields filled, check database.
    // Else, send error.
    if ((email, username, password)) {
      const cryptoInfo = security.saltHashPassword(password);
      db.CreateDB('users', {
        email,
        username,
        password: cryptoInfo.passwordHash,
        salt: cryptoInfo.salt,
        lastLogin: '',
        tokens: [],
        lastTry: ''
      })
        .then(result => {
          console.log('result ,', result);
          // Call login api
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      reject(rejectHandler(result, 'SignUp Error'));
    }
  });
};

function rejectHandler(result, message) {
  result.success = false;
  result.message = message;
  return result;
}
