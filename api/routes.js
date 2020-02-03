const express = require('express');
const _ = require('lodash');

const routes = express.Router();

const RequestController = require('./controllers/RequestController');
const ChatbotController = require('./controllers/ChatbotController');

// WEBHOOK
routes.get('/chatbot-webhook', ChatbotController.index);
routes.post('/chatbot-webhook', ChatbotController.message);

// PUBLIC
routes.get('/request', RequestController.index);
routes.post('/request/:slug', RequestController.createBySlug);

routes.post('/authenticate', (req, res) => {
  console.log(req.body);
  const email = _.get(req, 'body.email');
  const password = _.get(req, 'body.password');
  if (email !== 'admin@email.com' || password !== '123123123') {
    res.status(400).json({
      message: 'Invalid Credentials'
    });
    return;
  }
  res.json({ token: 'bd292479-36d8-4d47-bcd2-6aafb0ab7511' });
});

routes.use('/', (req, res, next) => {
  const token = _.get(req, 'headers.authorization');
  console.log(token);
  if (_.isEmpty(token || '') || token !== 'Bearer bd292479-36d8-4d47-bcd2-6aafb0ab7511') {
    res.status(403).json({
      message: 'Access Denied!',
    });
    return;
  }
  next();
});

// USER
routes.use('/my', require('./middleware/my'));
routes.get('/my/profile', (req, res) => res.json({ message: 'ok' }));
routes.get('/my/request', (req, res) => res.json({ message: 'ok' }));
routes.put('/my/request/:reference_number/status', (req, res) => res.json({ message: 'ok' }));

// ADMIN
routes.use('/mng', require('./middleware/mng'));

routes.get('/mng/request', (req, res) => res.json({ message: 'ok' }));
routes.post('/mng/request', (req, res) => res.json({ message: 'ok' }));
routes.put('/mng/request/:id', (req, res) => res.json({ message: 'ok' }));
routes.delete('/mng/request/:id', (req, res) => res.json({ message: 'ok' }));

routes.get('/mng/user', (req, res) => res.json({ message: 'ok' }));
routes.post('/mng/user', (req, res) => res.json({ message: 'ok' }));
routes.put('/mng/user/:id', (req, res) => res.json({ message: 'ok' }));
routes.delete('/mng/user/:id', (req, res) => res.json({ message: 'ok' }));

// OTHER
routes.all('/', (req, res) => {
  res.json({
    message: 'REQUEST BOARD API',
    version: '1.0',
  });
});

routes.use('*', (req, res) => {
  res.status(404);
  res.json({
    message: 'ROUTE NOT FOUD',
  });
});

module.exports = routes;
