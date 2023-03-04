const Todo = require('../models/Todo');

module.exports = async (req, res, next) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (todo && (req.user.email === 'admin' || todo.user_id === req.user.id)) {
      next();
    } else {
      throw new Error('You do not have access to this page');
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
