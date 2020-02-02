const express = require('express');
const routes = express.Router();

const RequestController = require('./controllers/RequestController');
const ChatbotController = require('./controllers/ChatbotController');

// WEBHOOK
routes.get('/chatbot-webhook', ChatbotController.index);
routes.post('/chatbot-webhook', ChatbotController.message);

// PUBLIC
routes.get('/request', RequestController.index);
routes.post('/request/:slug', RequestController.createBySlug);

routes.post('/authenticate', (req, res) => res.json({ token: '' }));

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
