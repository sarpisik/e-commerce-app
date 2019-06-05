const db = require('../../../db/mongo')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { products } = request.body
    const result = {
      success: false,
      message: ''
    }
    if (products) {
      db.CreateDB('products', products)
        .then(res => {
          result.success = true
          result.message = res.result.n + ' product(s) uploaded!'

          resolve(result)
        })
        .catch(err => reject(err))
    } else {
      reject('Invalid Product Form!')
    }
  })
}
