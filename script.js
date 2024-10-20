// Load books from localStorage
window.onload = function () {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    if (savedBooks) {
        savedBooks.forEach(book => addBookToShelf(book.title, book.author, book.color));
    }
};

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const color = document.getElementById('bookColor').value;

    if (title && author) {
        addBookToShelf(title, author, color);
        saveBooks();
    }
}
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    return result
        ? "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase()
        : rgb;
}

function addBookToShelf(title, author, color) {
    const bookshelf = document.getElementById('bookshelf');

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.style.backgroundColor = color;
    bookDiv.innerHTML = `<div>${title}</div><div>${author}</div>`;
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'X';
    deleteBtn.onclick = function () {
        bookDiv.remove();
        saveBooks();
    };
    bookDiv.appendChild(deleteBtn);
    
    // Add edit color button
    editColorBtn.onclick = function () {
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = rgbToHex(bookDiv.style.backgroundColor); // Set current color as the initial value
    
        // Trigger the color input dialog
        colorInput.click();
    
        colorInput.oninput = function () {
            bookDiv.style.backgroundColor = colorInput.value;
            saveBooks();
        };
    };
    
    
    // Add drag-and-drop functionality
    bookDiv.setAttribute('draggable', true);
    bookDiv.id = title.replace(/\s+/g, '') + author.replace(/\s+/g, '');
    
    addDragAndDropListeners(bookDiv);
    
    bookshelf.appendChild(bookDiv);
}

function addDragAndDropListeners(bookElement) {
    bookElement.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    bookElement.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    bookElement.addEventListener('drop', function (e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text');
        const draggedElement = document.getElementById(draggedId);
        const parent = bookElement.parentElement;

        parent.insertBefore(draggedElement, bookElement.nextSibling);
        saveBooks(); // Re-save order after drop
    });
}

function saveBooks() {
    const bookshelf = document.getElementById('bookshelf');
    const books = [];
    Array.from(bookshelf.children).forEach(bookDiv => {
        const title = bookDiv.children[0].innerText;
        const author = bookDiv.children[1].innerText;
        const color = bookDiv.style.backgroundColor;
        books.push({ title, author, color });
    });
    localStorage.setItem('books', JSON.stringify(books));
}
