const db = require('../../../db/mongo');
const helpers = require('../../../utility/helpers');

const { rejectHandler } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { category, skip, limit } = request.body;
    const respond = {
      success: false,
      message: ''
    };

    // If the fields are not empty, check db.
    // Else, send error.
    if (category) {
      db.ReadDB(category, {}, {}, skip, limit)
        .then(productResult => {
          if (productResult.length > 0) {
            respond.success = true;
            respond.products = productResult;
            resolve(respond);
          } else {
            reject(rejectHandler(respond, 'Invalid Product!'));
          }
        })
        .catch(err => reject(rejectHandler(respond, err)));
    } else {
      reject('Invalid Category or Product!');
    }
  });
};
