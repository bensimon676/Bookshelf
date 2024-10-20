let books = [];

// Load books from localStorage on page load
window.onload = function () {
    const savedBooks = localStorage.getItem('bookshelf');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
        renderBooks();
    }
};

// Add a new book to the bookshelf
function addBook() {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    if (title && author) {
        books.push({ title, author });
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        renderBooks();
    }
}

// Save the current books to localStorage
function saveBooks() {
    localStorage.setItem('bookshelf', JSON.stringify(books));
    alert('Bookshelf saved!');
}

// Render the list of books on the bookshelf
function renderBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; // Clear current books

    books.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.className = 'book';
        bookItem.draggable = true;
        bookItem.ondragstart = (event) => drag(event, index);
        bookItem.ondrop = (event) => drop(event, index);
        bookItem.ondragover = (event) => allowDrop(event);
        bookItem.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <button onclick="deleteBook(${index})">X</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Delete a specific book
function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
}

// Allow books to be reordered via drag and drop
function allowDrop(event) {
    event.preventDefault();
}

function drag(event, index) {
    event.dataTransfer.setData('text', index);
}

function drop(event, index) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text');
    const draggedBook = books[draggedIndex];
    books.splice(draggedIndex, 1);
    books.splice(index, 0, draggedBook);
    renderBooks();
}
