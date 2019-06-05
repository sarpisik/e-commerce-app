const db = require('../../db/mongo');
const security = require('../security');

module.exports = function(userResult, respond, userName, password) {
  return new Promise((resolve, reject) => {
    const tokenHash = security.genRandomString(40);
    const loginTime = new Date();

    const difference = loginTime - userResult[0].lastTry;

    // If the last login try is more than 2 seconds ago, generate a new token hash.
    // Else, send DDOS error.
    if (difference / 1000 > 2) {
      // If the hash password is valid, update the token and send result.
      // Else, send error.
      if (
        security.checkPassword(
          userResult[0].password,
          password,
          userResult[0].salt
        )
      ) {
        const newPass = security.saltHashPassword(password);
        const tokenItem = {
          token: tokenHash,
          time: loginTime
        };
        db.UpdateDB(
          'users',
          { _id: userResult[0]._id },
          {
            $push: {
              tokens: {
                $each: [tokenItem],
                // Keep last 5 token sessions
                $slice: -5
              }
            },
            $set: {
              lastLogin: loginTime,
              lastTry: loginTime,
              salt: newPass.salt,
              password: newPass.passwordHash
            }
          }
        )
          .then(() => {
            respond.success = true;
            respond.message = '';
            respond.user = {
              userName,
              name: userResult[0].name
            };
            // This token will be used for backend access
            respond.session = tokenHash;
            resolve(respond);
          })
          .catch(() => {
            respond.success = false;
            respond.message = 'Login Error';
            reject(respond);
          });
      } else {
        respond.success = false;
        respond.message = 'Login Error';
        reject(respond);
      }
    } else {
      db.UpdateDB(
        'users',
        { _id: userResult[0]._id },
        {
          $set: { lastTry: loginTime }
        }
      )
        .then(() => {
          respond.success = false;
          respond.ddos = true;
          respond.message = 'Login Error DDOS';
          reject(respond);
        })
        .catch(() => {
          respond.success = false;
          respond.ddos = true;
          respond.message = 'Login Error DDOS';
          reject(respond);
        });
    }
  });
};
