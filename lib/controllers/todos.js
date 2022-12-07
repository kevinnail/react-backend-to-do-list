const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');
const User = require('../models/User.js');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const user = await User.getByEmail(req.user.email);
    //   console.log('user before getTodos', user);
    //   user.todos = 'hi';
    //   console.log('user after getTodos', user);
    await user.getTodos();

    res.json(user.todos);
  })

  .post('/', authenticate, async (req, res) => {
    const todo = await Todo.postNewToDo(req.body.task, req.user.id);

    // const todo = {
    //   message: `"${req.body.task}" has been successufully posted!`,
    // };
    res.json(todo);
  });
