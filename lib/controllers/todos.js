const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');
const User = require('../models/User.js');

module.exports = Router().get('/', authenticate, async (req, res) => {
  const user = await User.getByEmail(req.user.email);
  //   console.log('user before getTodos', user);
  //   user.todos = 'hi';
  //   console.log('user after getTodos', user);
  user.getTodos();
  res.json(req.body);
});
