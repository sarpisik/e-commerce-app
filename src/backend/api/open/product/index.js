const db = require('../../../db/mongo')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { products, values } = request.body
    if (products) {
      db.ReadDB('products', products, values)
        .then(res => resolve(res))
        .catch(err => reject(err))
    } else {
      reject('Invalid Product Form!')
    }
  })
}
