const express = require("express");
const app = express();

const { initialDatabase } = require("./db/db.connect");
const Book = require("./models/book.models");

app.use(express.json());

initialDatabase();

// ROUTES :
// [ 1, 2 ]
async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully.", book: savedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

// [ 3 ]
async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    throw error;
  }
}

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();
    if (allBooks.length != 0) {
      res.json(allBooks);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

// [ 4 ]
async function readBookByTitle(bookTitle) {
  try {
    const bookByTitle = await Book.findOne({ title: bookTitle });
    return bookByTitle;
  } catch (error) {
    throw error;
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.bookTitle);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// [ 5 ]
async function readBooksByAuthor(authorName) {
  try {
    const booksByAuthor = await Book.find({ author: authorName });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:bookAuthor", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.bookAuthor);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// [ 6 ]
async function readBooksByGenre(bookGenre) {
  try {
    const booksByGenre = await Book.find({ genre: bookGenre });
    return booksByGenre;
  } catch (error) {
    throw error;
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const books = await readBooksByGenre(req.params.bookGenre);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// [ 7 ]
async function readBooksByReleasedYear(releasedYear) {
  try {
    const booksByReleasedYear = await Book.find({
      publishedYear: releasedYear,
    });
    return booksByReleasedYear;
  } catch (error) {
    throw error;
  }
}

app.get("/books/releasedYear/:releasedYear", async (req, res) => {
  try {
    const books = await readBooksByReleasedYear(req.params.releasedYear);
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

// [ 8 ]
async function updateBookById(bookId, dataToUpdate) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookById(req.params.bookId, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

// [ 9 ]
async function updateBookByTitle(bookTitle, dataToUpdate) {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedBook;
  } catch (error) {
    throw error;
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

// [ 10 ]
async function deleteBookById(bookId) {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    throw error;
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBookById(req.params.bookId);
    if (deletedBook) {
      res
        .status(200)
        .json({ message: "Book deleted successfully", book: deletedBook });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

// SERVER STARTER :
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
