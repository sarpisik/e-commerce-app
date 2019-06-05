const mongo = require('../../../src/backend/db/mongo')
const sinon = require('sinon')

describe('Mongo Library', () => {
  describe('Connection Operations', () => {
    context('OpenDB method', () => {
      it('should fail on already connected.', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)

        mongo
          .OpenDB()
          .then(() => done('It should not connected'))
          .catch(err => (err === 'Already Connected!' ? done() : done(err)))

        // Reset fake respond
        testConnectionRespond.restore()
      })
      it('should success on connection request resolved.', done => {
        // Create fake responds
        const testConnectionRespond = dbConnectionProvided(false)
        const connectionSucceedRespond = dbMethod('connect')

        handleSuccess(mongo.OpenDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        connectionSucceedRespond.restore()
      })
      it('should fail on connection request rejected.', done => {
        // Create fake responds
        const testConnectionRespond = dbConnectionProvided(false)
        const connectionFailedRespond = dbMethod('connect', true)

        handleFail(mongo.OpenDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        connectionFailedRespond.restore()
      })
    })
    describe('CloseDB method', () => {
      it('should fail on already disconnected', done =>
        dbNotConnected(done, 'Already Disconnected!', mongo.CloseDB))
      it('should success on disconnection request resolved', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const disconnectSuccessRespond = dbMethod('close', null)

        handleSuccess(mongo.CloseDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        disconnectSuccessRespond.restore()
      })
      it('should fail on disconnection request rejected', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const disconnectFailedRespond = dbMethod('close', true)

        handleFail(mongo.CloseDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        disconnectFailedRespond.restore()
      })
    })
  })
  describe('CRUD Operations', () => {
    describe('CreateDB method', () => {
      it('should fail on disconnected', done =>
        dbNotConnected(done, 'Not Connected!', mongo.CreateDB))
      it('should success on request resolved', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const createSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              insertMany: () => new Promise(resolve => resolve())
            })
          }))

        handleSuccess(mongo.CreateDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        createSuccessRespond.restore()
      })
      it('should fail on request rejected', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const createSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              insertMany: () =>
                new Promise((resolve, reject) => reject('rejected'))
            })
          }))

        handleFail(mongo.CreateDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        createSuccessRespond.restore()
      })
    })
    describe('ReadDB method', () => {
      it('should fail on disconnected', done =>
        dbNotConnected(done, 'Not Connected!', mongo.ReadDB))
      it('should success on request resolved', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const readSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              find: () => ({
                project: () => ({ toArray: err => err(false) })
              })
            })
          }))

        handleSuccess(mongo.ReadDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        readSuccessRespond.restore()
      })
      it('should fail on request rejected', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const readFailRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              find: () => ({
                project: () => ({ toArray: err => err(true) })
              })
            })
          }))

        handleFail(mongo.ReadDB, done)

        // Reset fake respond
        testConnectionRespond.restore()
        readFailRespond.restore()
      })
    })
    describe('UpdateDB method', () => {
      it('should fail on disconnected', done =>
        dbNotConnected(done, 'Not Connected!', mongo.UpdateDB))
      it('should success on request resolved', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const updateSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              updateMany: (query, values, err) => err(false)
            })
          }))

        handleSuccess(mongo.UpdateDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        updateSuccessRespond.restore()
      })
      it('should fail on request rejected', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const updateSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              updateMany: (query, values, err) => err(true)
            })
          }))

        handleFail(mongo.UpdateDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        updateSuccessRespond.restore()
      })
    })
    describe('DeleteDB method', () => {
      it('should fail on disconnected', done =>
        dbNotConnected(done, 'Not Connected!', mongo.DeleteDB))
      it('should success on request resolved', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const deleteSuccessRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              deleteMany: (query, err) => err(false)
            })
          }))

        handleSuccess(mongo.DeleteDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        deleteSuccessRespond.restore()
      })
      it('should fail on request rejected', done => {
        // Create fake respond
        const testConnectionRespond = dbConnectionProvided(true)
        const deleteFailRespond = sinon
          .stub(mongo.client, 'db')
          .callsFake(() => ({
            collection: () => ({
              deleteMany: (query, err) => err(true)
            })
          }))

        handleFail(mongo.DeleteDB, done)

        // Reset fake responds
        testConnectionRespond.restore()
        deleteFailRespond.restore()
      })
    })
  })
})

function dbConnectionProvided(condition) {
  return sinon.stub(mongo.client, 'isConnected').callsFake(() => condition)
}
function dbMethod(method, result) {
  return sinon
    .stub(mongo.client, method)
    .callsFake(callBack => (result ? callBack(result) : callBack()))
}
function dbNotConnected(done, text, method) {
  // Create fake respond
  const testConnectionRespond = dbConnectionProvided(false)

  method()
    .then(() => done('it must success on error'))
    .catch(err => (err === text ? done() : done('test fail on reject')))

  // Reset fake respond
  testConnectionRespond.restore()
}
function handleSuccess(method, done) {
  method()
    .then(() => done())
    .catch(err => done(err))
}
function handleFail(method, done) {
  method()
    .then(() => done('test must be passed on rejected'))
    .catch(() => done())
}
