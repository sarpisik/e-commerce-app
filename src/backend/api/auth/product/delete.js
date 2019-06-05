const db = require('../../../db/mongo')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const result = {
      success: false,
      message: ''
    }
    const { products } = request.body
    const query = { _id: { $in: products } }

    if (products) {
      db.DeleteDB('products', query)
        .then(res => {
          result.success = true
          result.message = res.result.n + ' product(s) has been deleted!'

          resolve(result)
        })
        .catch(err => reject(err))
    } else {
      reject('Invalid Product Form!')
    }
  })
}
