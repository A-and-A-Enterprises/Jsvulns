module.exports = class API {
  database;

  constructor(database) {
    this.database = database;
  }

  async register(app) {
    app.get('/books', async (req, res) => {
      const books = await this.database.getAllBooks();
      res.json(books);
    });

    app.get('/books/author/:author', async (req, res) => {
      const author = req.params.author;

      const books = await this.database.getBooksByAuthor(author);

      res.json(books);
    });

    //TODO Specify an API to get books by title provided by the user request
  }
}
