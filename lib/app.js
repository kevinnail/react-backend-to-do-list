const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const authenticate = require('./middleware/authenticate.js');

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://todo-list-kn.netlify.app',
      'https://deploy-preview-1--todo-list-kn.netlify.app',
      'https://63928ff263e89b340663c48f--todo-list-kn.netlify.app',
    ],
    credentials: true,
  })
);
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/todos', authenticate, require('./controllers/todos'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
