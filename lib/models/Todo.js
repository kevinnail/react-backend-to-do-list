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

  static async postNewToDo({ task, user_id }) {
    console.log('task', task);

    const { rows } = await pool.query(
      `
        INSERT INTO todos (task,user_id)
        VALUES ($1,$2)
        RETURNING *
        `,
      [task, user_id]
    );
    return Todo(rows[0]);
  }
};
