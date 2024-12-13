const Book = require('../model/book');

const sqlite3 = require('sqlite3').verbose();

module.exports.getDatabase = async () => {
  const db = new sqlite3.Database(':memory:');
  await populate(db);

  return new InMemoryDatabase(db);
}

class InMemoryDatabase {

  constructor(db) {
    this._db = db;
  }

  async getAllBooks() {
    const db = this._db;

    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM books`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results = [];

          rows.forEach(row => {
            results.push(new Book(row.title, row.author, row.image, row.rating, row.id));
          })

          resolve(results);
        }
      });
    })
  }

  async getBooksByAuthor(author) {
    const db = this._db;

    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM books WHERE author LIKE '%${author}%'`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results = [];

          rows.forEach(row => {
            results.push(new Book(row.title, row.author, row.image, row.rating, row.id));
          })

          resolve(results);
        }
      });
    });
  }

  async close() {
    if (this._db) {
      await this._db.close();
    }
  }
}

async function populate(db) {
  if (!db) {
    throw new Error('Database not initialized');
  }

  db.serialize(() => {
    // Create the books table in the database
    db.run(`CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT, image TEXT, rating, INTEGER)`);

    // Insert the books into the database
    const insertSql = 'INSERT INTO books (title, author, image, rating) VALUES (?, ?, ?, ?)';

    // Sample data
    const books = [
      // The hobbit
      new Book('The Hobbit', 'J.R.R. Tolkien', 'https://images-na.ssl-images-amazon.com/images/I/51Zt3J9ZBLL._SX331_BO1,204,203,200_.jpg', 4),
      // The Lord of the Rings
      new Book('The Lord of the Rings', 'J.R.R. Tolkien', 'https://images-na.ssl-images-amazon.com/images/I/51Zt3J9ZBLL._SX331_BO1,204,203,200_.jpg', 5)
    ];

    books.forEach(async (book) => {
      db.run(insertSql, book.title, book.author, book.image, book.rating);
      console.log(`Inserted Book: ${book.title}`);
    })
  });
}