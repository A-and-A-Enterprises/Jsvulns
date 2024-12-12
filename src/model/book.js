// A definition of the book object that we are storing in the database

module.exports = class Book {

  constructor(title, author, image, rating, id) {
    this._id = id;
    this.title = title;
    this._author = author;
    this._image = image;
    this._rating = rating;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get image() {
    return this._image;
  }

  get rating() {
    return this._rating;
  }

  set title(title) {
    this._title = title;
  }
}