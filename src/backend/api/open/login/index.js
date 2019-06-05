const db = require('../../../db/mongo');
const tokenGenerator = require('../../../utility/token');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { userName, password } = request.body;
    const respond = {
      success: false,
      message: ''
    };

    // If userName and password fields filled, check database.
    // Else, send error.
    if (userName && password) {
      db.ReadDB(
        'users',
        { userName },
        {
          name: 1,
          password: 1,
          salt: 1,
          surname: 1,
          username: 1,
          tokens: 1,
          _id: 1,
          lastTry: 1
        }
      )
        .then(userResult => {
          // If the user is exist, generate a new token hash.
          // Else, send error.
          if (userResult && userResult.length > 0) {
            tokenGenerator(userResult, respond, userName, password)
              // Send user infos and token hash
              .then(respond => resolve(respond))
              .catch(err => reject(err));
          } else {
            respond.success = false;
            respond.message = 'User Does Not Exist';
            reject(respond);
          }
        })
        .catch(err => {
          respond.success = false;
          respond.message = err;
          reject(respond);
        });
    } else {
      respond.success = false;
      respond.message = 'Login Error';
      reject(respond);
    }
  });
};
