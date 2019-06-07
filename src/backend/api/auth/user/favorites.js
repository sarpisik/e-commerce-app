const db = require('../../../db/mongo');
const helpers = require('../../../utility/helpers');

const { rejectHandler, setArrayEvent } = helpers;

module.exports = function(request, response) {
  return new Promise((resolve, reject) => {
    const { email, action, product } = request.body;
    const respond = {
      success: false,
      message: ''
    };

    // If the fields are not empty, check db.
    // Else, send error.
    if (email) {
      db.ReadDB('users', { email }, { _id: 1 })
        .then(userResult => {
          // If the user is exist in db, update the fields and respond success.
          // Else, send error.
          if (userResult.length > 0) {
            const event = setArrayEvent(action, 'favorites', product);

            db.UpdateDB('users', { _id: userResult[0]._id }, event)
              .then(res => {
                respond.res = res;
                respond.success = true;
                respond.message = '';
                resolve(respond);
              })
              .catch(err => reject(rejectHandler(respond, err)));
          } else {
            reject(rejectHandler(respond, 'Invalid Email'));
          }
        })
        .catch(err => reject(rejectHandler(respond, err)));
    } else {
      reject(rejectHandler(respond, 'Invalid Email'));
    }
  });
};
