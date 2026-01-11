const db = require('./in-memory');

describe('database tests', () => {

  describe('getAllBooks', () => {

    it('should fetch all the books', async () => {
      const database = await db.getDatabase();

      const books = await database.getAllBooks();
      expect(books).toBeDefined();
      expect(books).toHaveLength(2);
    });
  });

  describe('getBooksByAuthor', () => {

    it('should fetch all the books by author', async () => {
      const database = await db.getDatabase();

      const books = await database.getBooksByAuthor('J.R');
      expect(books).toBeDefined();
      expect(books).toHaveLength(2);
    });
  });
});