const db = require('../../db/mongo');
const security = require('../security');
const helpers = require('../helpers');

const { rejectHandler, userCredentialsToSend } = helpers;

module.exports = function(userResult, respond, email, password) {
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
            // This token will be used for backend access
            respond.session = tokenHash;
            // Set credentials to send client
            resolve(userCredentialsToSend(respond, userResult[0]));
          })
          .catch(err => {
            console.log(err);
            reject(rejectHandler(respond, err));
          });
      } else {
        reject(rejectHandler(respond, 'Wrong Password'));
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
          reject(rejectHandler(respond, 'Login Error DDOS'));
        })
        .catch(() => {
          reject(rejectHandler(respond, 'Login Error DDOS'));
        });
    }
  });
};
