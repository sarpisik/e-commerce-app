const db = require('../../../db/mongo');
const helpers = require('../../../utility/helpers');

const { rejectHandler } = helpers;

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { category, search } = request.body;
    const respond = {
      success: false,
      message: ''
    };
    const searchExpression = new RegExp(search);

    // If the fields are not empty, check db.
    // Else, send error.
    if (category && search) {
      db.ReadDB(
        category,
        {
          name: {
            $regex: searchExpression
          }
        },
        {}
      )
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
