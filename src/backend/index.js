const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const port = process.env.PORT || 8080;
const db = require('./db/mongo');
const path = require('path');

const sessionUtil = require('./utility/sessions');
const log = require('./logger');

db.OpenDB()
  .then(result => {
    log.info('DB CONNECTION OK. ', result);
    const app = express();

    app.use(bodyParser.json());
    app.use(mongoSanitize({ replaceWith: '_' }));

    //request,response logger middleware
    app.use(function(req, res, next) {
      const send = res.send;

      res.send = function(data) {
        log.info('Response:' + data + '\n\n');
        send.call(this, data);
      };
      log.info('function: ' + req.url);
      log.info('Request' + JSON.stringify(req.body));
      next();
    });

    // Serve the static files from the React app
    app.use(express.static('dist'));

    // Respond session(token) info on success.
    app.post(['/api/open', '/api/open*'], (request, response, next) => {
      // Convert API path to local path
      const requestRedirect = require('./api/open' +
        request.url.replace('/api/open', ''));

      requestRedirect(request)
        .then(result => {
          response.json(result);
          next();
        })
        .catch(err => {
          response.json(err);
          next();
        });
    });

    // Respond authUser info on a valid session(token).
    app.post(['/api/auth', '/api/auth*'], (request, response, next) => {
      const { email, session } = request.body;

      // Convert API path to local path
      const requestRedirect = require('./api/auth' +
        request.url.replace('/api/auth', ''));

      // If the email and session(token) are valid, respond user data.
      // Else, respond error.
      if (email && session) {
        sessionUtil
          .checkSession(session, email)
          .then(() => {
            requestRedirect(request, response)
              .then(result => {
                result.session = session;
                response.json(result);
                next();
              })
              .catch(err => {
                response.json(err);
                next();
              });
          })
          .catch(err => {
            response.json(err);
            next();
          });
      } else {
        response.json({ result: false, message: 'Incorrect session.' });
        next();
      }
    });

    // Handles any requests that don't match the ones above
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    });

    // General Error Logger in logger file.
    app.use((err, req, res, next) => {
      if (err) {
        log.error('General Error:');
        log.error(err.stack);
      }
      res.json({ message: 'Global Error Occurred' });
      next();
    });

    // Listen to client.
    app.listen(port, () => {
      log.info('App initialized');
    });
  })
  .catch(err => log.error('DB ERROR ', err));
