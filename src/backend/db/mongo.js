require('dotenv').config()
const connectionString =
  process.env['CUSTOMCONNSTR_mongoConnection'] ||
  process.env.MONGODB_CREDENTIALS

const MongoClient = require('mongodb').MongoClient
const dbName = process.env.DB_NAME
const client = new MongoClient(connectionString, { useNewUrlParser: true })

// CONNECT-DISCONNECT OPERATIONS
const OpenDB = () => {
  return new Promise((resolve, reject) => {
    if (!client.isConnected()) {
      client.connect(err => {
        if (err == null) {
          resolve('DB Connected!')
        } else {
          reject(err)
        }
      })
    } else {
      reject('Already Connected!')
    }
  })
}

const CloseDB = () => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client.close(err => {
        if (err == null) {
          resolve('Disconnected Success!')
        } else {
          reject(err)
        }
      })
    } else {
      reject('Already Disconnected!')
    }
  })
}

// CRUD OPERATIONS
const CreateDB = (table, model) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .insertMany(model)
        .then(res => resolve(res))
        .catch(err => reject(err))
    } else {
      reject('Not Connected!')
    }
  })
}

const ReadDB = (table, query, fields) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .find(query)
        .project(fields)
        .toArray((err, res) => (err ? reject(err) : resolve(res)))
    } else {
      reject('Not Connected!')
    }
  })
}

const UpdateDB = (table, query, values) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .updateMany(query, values, (err, res) =>
          err ? reject(err) : resolve(res)
        )
    } else {
      reject('Not Connected!')
    }
  })
}

const DeleteDB = (table, query) => {
  return new Promise((resolve, reject) => {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .deleteMany(query, (err, res) => (err ? reject(err) : resolve(res)))
    } else {
      reject('Not Connected!')
    }
  })
}

module.exports = {
  client,
  OpenDB,
  CloseDB,
  CreateDB,
  ReadDB,
  UpdateDB,
  DeleteDB
}
