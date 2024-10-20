// Array to hold books
let books = [];

<<<<<<< HEAD
<<<<<<< HEAD
// Load books from local storage
window.onload = function() {
    loadBooks();
}
=======
// Load books from localStorage on page load
window.onload = function () {
    const savedBooks = localStorage.getItem('bookshelf');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
        renderBooks();
    }
};
>>>>>>> parent of c29a25d (ahh)

// Function to add a book
=======
>>>>>>> parent of e687280 (blah)
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

<<<<<<< HEAD
// Function to render books on the shelf
=======
>>>>>>> parent of e687280 (blah)
function renderBooks() {
    const bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = ''; // Clear current books

    books.forEach((book, index) => {
<<<<<<< HEAD
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
=======
        const bookItem = document.createElement('li');
        bookItem.className = 'book';
        bookItem.draggable = true;
        bookItem.ondragstart = (event) => drag(event, index);
        bookItem.ondrop = (event) => drop(event, index);
        bookItem.ondragover = (event) => allowDrop(event);
        bookItem.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
        `;
        bookList.appendChild(bookItem);
    });
}

function allowDrop(event) {
    event.preventDefault();
>>>>>>> parent of e687280 (blah)
}

// Load books from local storage
function loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
        books = storedBooks;
        renderBooks();
    }
}
