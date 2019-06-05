const db = require('../../../db/mongo')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { _id, values } = request.body
    const result = {
      success: false,
      message: ''
    }

    if (_id && !values.hasOwnProperty('_id')) {
      db.UpdateDB(
        'products',
        { _id },
        {
          $set: values
        }
      )
        .then(res => {
          result.success = true
          result.message = res.result.n + ' product(s) uploaded!'
          resolve(result)
        })
        .catch(err => reject(err))
    } else {
      result.success = false
      result.message = 'Invalid Product Form!'
      reject(result)
    }
  })
}
