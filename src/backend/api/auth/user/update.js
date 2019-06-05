const db = require('../../../db/mongo')

module.exports = function(request, response) {
  return new Promise((resolve, reject) => {
    const { username, name, surname } = request.body
    const result = {
      success: false,
      message: ''
    }

    // If the fields are not empty, check db.
    // Else, send error.
    if (username && name && surname) {
      db.ReadDB('users', { username }, {})
        .then(userResult => {
          // If the user is exist in db, update the fields and respond success.
          // Else, send error.
          if (userResult.length > 0) {
            db.UpdateDB(
              'users',
              { _id: userResult[0]._id },
              {
                $set: { name: name, surname: surname }
              }
            )
              .then(() => {
                result.success = true
                result.message = ''
                resolve(result)
              })
              .catch(() => {
                result.success = false
                result.message = 'Error'
                reject(result)
              })
          } else {
            result.success = false
            result.message = 'Error'
            reject(result)
          }
        })
        .catch(() => {
          result.success = false
          result.message = 'Error'
          reject(result)
        })
    } else {
      result.success = false
      result.message = 'Error'
      reject(result)
    }
  })
}
