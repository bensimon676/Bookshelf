// Array to hold books
let books = [];

// Load books from local storage when the page loads
window.onload = function() {
    loadBooks();
}

// Function to add a book
function addBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    if (title && author) {
        books.push({ title, author });
        renderBooks();
        document.getElementById("bookTitle").value = '';
        document.getElementById("bookAuthor").value = '';
    }
}

// Function to render books on the shelf
function renderBooks() {
    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = ''; // Clear current books

    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const titleElement = document.createElement("div");
        titleElement.classList.add("book-title");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("div");
        authorElement.classList.add("book-author");
        authorElement.textContent = book.author;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = 'X';
        deleteButton.onclick = function() {
            deleteBook(index);
        };

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(deleteButton);

        bookshelf.appendChild(bookElement);
    });
}

// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
}

// Save books to local storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Load books from local storage
function loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
        books = storedBooks;
        renderBooks();
    }
}
