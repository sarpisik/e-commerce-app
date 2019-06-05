const db = require('../../db/mongo');

module.exports = function(email) {
  return db.ReadDB(
    'users',
    { email },
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
  );
};
