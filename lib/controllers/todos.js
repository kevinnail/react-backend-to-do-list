const { Router } = require('express');
const authDelUp = require('../middleware/authDelUp');
const Todo = require('../models/Todo');
const User = require('../models/User.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const user = await User.getByEmail(req.user.email);
    await user.getTodos();
    res.json(user.todos);
  })

  .post('/', async (req, res) => {
    const todo = await Todo.postNewToDo(req.body.task, req.user.id);

    res.json(todo);
  })

  .put('/:id', [authDelUp], async (req, res) => {
    const todo = await Todo.toggleComplete(req.body.mark, req.body.todo_id);
    res.json(todo);
  })

  .delete('/:id', [authDelUp], async (req, res) => {
    const data = await Todo.deleteById(req.params.id);
    res.json(data);
  })

  .get('/:id', [authDelUp], async (req, res) => {
    const data = await Todo.getById(req.params.id);
    res.json(data);
  })

  .put('/edit/:id', [authDelUp], async (req, res) => {
    const data = await Todo.updateById(req.body.id, req.body.task);
    res.json(data);
  });
