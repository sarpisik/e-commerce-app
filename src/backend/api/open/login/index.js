const db = require('../../../db/mongo')
const security = require('../../../utility/security')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    const { username, password } = request.body
    const result = {
      success: false,
      message: ''
    }

    // If username and password fields filled, check database.
    // Else, send error.
    if (username && password) {
      db.ReadDB(
        'users',
        { username },
        {
          name: 1,
          password: 1,
          salt: 1,
          surname: 1,
          username: 1,
          tokens: 1,
          _id: 1,
          lastTry: 1
        }
      )
        .then(userResult => {
          // If the user is exist, generate a new token hash.
          // Else, send error.
          if (userResult && userResult.length > 0) {
            const tokenHash = security.genRandomString(40)
            const loginTime = new Date()

            const difference = loginTime - userResult[0].lastTry

            // If the last login try is more than 2 seconds ago, generate a new token hash.
            // Else, send DDOS error.
            if (difference / 1000 > 2) {
              // If the hash password is valid, update the token and send result.
              // Else, send error.
              if (
                security.checkPassword(
                  userResult[0].password,
                  password,
                  userResult[0].salt
                )
              ) {
                const newPass = security.saltHashPassword(password)
                const tokenItem = {
                  token: tokenHash,
                  time: loginTime
                }
                db.UpdateDB(
                  'users',
                  { _id: userResult[0]._id },
                  {
                    $push: {
                      tokens: {
                        $each: [tokenItem],
                        $slice: -5
                      }
                    },
                    $set: {
                      lastLogin: loginTime,
                      lastTry: loginTime,
                      salt: newPass.salt,
                      password: newPass.passwordHash
                    }
                  }
                )
                  .then(function() {
                    result.success = true
                    result.message = ''
                    result.user = {
                      username: username,
                      name: userResult[0].name,
                      surname: userResult[0].surname
                    }
                    result.session = tokenHash
                    resolve(result)
                  })
                  .catch(() => {
                    result.success = false
                    result.message = 'Login Error'
                    reject(result)
                  })
              } else {
                result.success = false
                result.message = 'Login Error'
                reject(result)
              }
            } else {
              db.UpdateDB(
                'users',
                { _id: userResult[0]._id },
                {
                  $set: { lastTry: loginTime }
                }
              )
                .then(() => {
                  result.success = false
                  result.ddos = true
                  result.message = 'Login Error DDOS'
                  reject(result)
                })
                .catch(() => {
                  result.success = false
                  result.ddos = true
                  result.message = 'Login Error DDOS'
                  reject(result)
                })
            }
          } else {
            result.success = false
            result.message = 'Login Error'
            reject(result)
          }
        })
        .catch(err => {
          result.success = false
          result.message = err
          reject(result)
        })
    } else {
      result.success = false
      result.message = 'Login Error'
      reject(result)
    }
  })
}
