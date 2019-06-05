const db = require('../../../db/mongo');
const security = require('../../../utility/security');
const getUser = require('../../../utility/users');
const tokenGenerator = require('../../../utility/token');
const helpers = require('../../../utility/helpers');

const { rejectHandler } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { email, userName, password } = request.body;
    const respond = { success: false, message: '' };

    // If email, userName and password fields filled, check database.
    // Else, send error.
    if ((email, userName, password)) {
      getUser(email)
        .then(userResult => {
          // If the account already exist, send error.
          // Else, create new user.
          if (userResult && userResult.length > 0) {
            reject(
              rejectHandler(respond, `${email} email account already exist.`)
            );
          } else {
            // Hashed password merged with salt.
            const cryptoInfo = security.saltHashPassword(password);
            // Create new user
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
                // Create a session token.
                tokenGenerator(resp.ops, respond, userName, password)
                  // Send user infos and token hash
                  .then(respond => resolve(respond))
                  .catch(err => reject(err));
              })
              .catch(err => rejectHandler(respond, err));
          }
        })
        .catch(err => reject(rejectHandler(err)));
    } else {
      reject(rejectHandler(respond, 'SignUp Error'));
    }
  });
};
