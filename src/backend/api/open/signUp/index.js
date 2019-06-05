const db = require('../../../db/mongo');
const security = require('../../../utility/security');
const tokenGenerator = require('../../../utility/token');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email, userName, password } = request.body;
    const respond = { success: false, message: '' };

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
        .then(resp => {
          // Call login api
          tokenGenerator(resp.ops, respond, userName, password)
            // Send user infos and token hash
            .then(respond => resolve(respond))
            .catch(err => reject(err));
        })
        .catch(err => rejectHandler(respond, err));
    } else {
      reject(rejectHandler(respond, 'SignUp Error'));
    }
  });
};

function rejectHandler(respond, message) {
  respond.success = false;
  respond.message = message;
  return respond;
}
