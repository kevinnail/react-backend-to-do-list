const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');
const User = require('../models/User.js');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const user = await User.getByEmail(req.user.email);

    await user.getTodos();

    res.json(user.todos);
  })

  .post('/', authenticate, async (req, res) => {
    const todo = await Todo.postNewToDo(req.body.task, req.user.id);

    res.json(todo);
  })

  .put('/:id', authenticate, async (req, res) => {
    const todo = await Todo.toggleComplete(req.body.mark, req.body.todo_id);
    res.json(todo);
  })

  .delete('/:id', authenticate, async (req, res) => {
    const data = await Todo.deleteById(req.params.id);
    res.json(data);
  });
