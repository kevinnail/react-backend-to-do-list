const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize.js');
const authDelUp = require('../middleware/authDelUp');
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

  .put('/:id', [authenticate, authDelUp], async (req, res) => {
    const todo = await Todo.toggleComplete(req.body.mark, req.body.todo_id);
    // const todo = await Todo.toggleComplete(req.body.mark, req.params.id);
    res.json(todo);
  })

  .delete('/:id', [authenticate, authDelUp], async (req, res) => {
    const data = await Todo.deleteById(req.params.id);
    res.json(data);
  });
