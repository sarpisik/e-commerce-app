const db = require('../../../db/mongo')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { username } = request.body
    const result = {
      success: false,
      message: ''
    }
    // If username is not empty, check db.
    // Else, send error.
    if (username) {
      db.ReadDB('users', { username }, {})
        .then(userResult => {
          // If the user is exist in db, respond the user details.
          // Else, send error.
          if (userResult.length > 0) {
            result.success = true
            result.message = ''
            result.userInfo = {}
            result.userInfo.username = userResult[0].username
            result.userInfo.name = userResult[0].name
            result.userInfo.surname = userResult[0].surname
            result.userInfo.lastLogin = userResult[0].lastLogin

            resolve(result)
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
