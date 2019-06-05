const db = require('../../db/mongo')

const checkSession = (session, username) => {
  return new Promise((resolve, reject) => {
    const result = {
      success: false,
      message: 'No reason'
    }

    db.ReadDB(
      'users',
      {
        username: username,
        'tokens.token': session
      },
      { _id: 1, username: 1, tokens: 1 }
    )
      .then(userInfo => {
        // If the username and token are valid, respond success.
        // Else, token error.
        if (userInfo.length > 0) {
          result.success = true
          resolve(result)
        } else {
          result.message = 'Invalid Token'
          reject(result)
        }
      })
      .catch(() => {
        result.message = 'Invalid Token'
        reject(result)
      })
  })
}

module.exports = {
  checkSession
}
