const db = require('../../../db/mongo');
const helpers = require('../../../utility/helpers');

const { rejectHandler } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { category, _id } = request.body;
    const respond = {
      success: false,
      message: ''
    };

    // If the fields are not empty, check db.
    // Else, send error.
    if (category && _id) {
      db.ReadDB(category, { _id }, {})
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
