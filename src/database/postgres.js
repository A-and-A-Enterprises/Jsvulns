const { Pool } = require('pg');
const Book = require('../model/book');

module.exports.getDatabase = () => {
  // Load the configuration from the .env file
  require('dotenv').config();

  const db = new PostgresDatabase();
  return db;
}

class PostgresDatabase {

  constructor() {
    this._pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async close() {
    if (this._pool) {
      this._pool.end();
    }
  }

  async getAllBooks() {
    const client = await this._pool.connect();

    const queryResult = await client.query('SELECT * FROM books');

    const results = [];
    queryResult.rows.forEach(book => {
      results.push(new Book(book.title, book.author, book.image, book.rating, book.id));
    });
    return results;
  }

  //TODO implement the getBooksByAuthor function
}