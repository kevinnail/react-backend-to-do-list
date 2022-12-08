const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  user_id;
  task;
  completed;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.task = row.task;
    this.completed = row.completed;
    this.created_at = row.created_at;
  }

  static async postNewToDo(task, user_id) {
    const { rows } = await pool.query(
      `
        INSERT INTO todos (task,user_id)
        VALUES ($1,$2)
        RETURNING *
        `,
      [task, user_id]
    );
    return new Todo(rows[0]);
  }

  static async toggleComplete(mark, todo_id) {
    const { rows } = await pool.query(
      `
        UPDATE todos
        SET completed = $1
        WHERE id = $2
        RETURNING *
        `,
      [mark, todo_id]
    );
    return new Todo(rows[0]);
  }

  static async deleteById(todo_id) {
    console.log('todo_id in model deleteById', todo_id);
    const { rows } = await pool.query(
      `
    DELETE from todos
    WHERE id = $1
    RETURNING *
    `,
      [todo_id]
    );
    console.log('rows[0]', rows[0]);

    return new Todo(rows[0]);
  }
};
