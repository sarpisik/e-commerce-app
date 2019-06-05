const db = require('../../../db/mongo');
const security = require('../../../utility/security');
const login = require('../login');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email, userName, password } = request.body;
    const result = { success: false, message: '' };

    // If email, userName and password fields filled, check database.
    // Else, send error.
    if ((email, userName, password)) {
      const cryptoInfo = security.saltHashPassword(password);
      db.CreateDB('users', [
        {
          email,
          userName,
          password: cryptoInfo.passwordHash,
          salt: cryptoInfo.salt,
          lastLogin: '',
          tokens: [],
          lastTry: ''
        }
      ])
        .then(() => {
          // Call login api
          login({ username, password })
            // Send user infos and token hash
            .then(result => resolve(result))
            .catch(err => reject(err));
        })
        .catch(err => rejectHandler(result, err));
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
