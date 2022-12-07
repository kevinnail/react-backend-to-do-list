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

  //   static async getAll() {
  //     const { rows } = await pool.query('SELECT * from todos;');
  //     return rows.map((row) => new Todo(row));
  //   }
};
