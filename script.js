document.addEventListener("DOMContentLoaded", function() {

    const bookshelfContainer = document.getElementById('bookshelf');
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const addButton = document.getElementById('addButton');
    const saveButton = document.getElementById('saveButton');
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Function to add a new book to the bookshelf
    function addBook() {
        const bookTitle = titleInput.value;
        const bookAuthor = authorInput.value;
        const bookColor = "#d3a383"; // Default color

        if (bookTitle && bookAuthor) {
            const newBook = { title: bookTitle, author: bookAuthor, color: bookColor };
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            renderBookshelf();
            titleInput.value = '';
            authorInput.value = '';
        }
    }

    // Function to render the bookshelf with the current books
    function renderBookshelf() {
        bookshelfContainer.innerHTML = ''; // Clear the container

        books.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.style.backgroundColor = book.color;

            // Set book content
            bookElement.innerHTML = `
                <div class="book-content">
                    <p>${book.title}</p>
                    <p>${book.author}</p>
                </div>
                <button class="delete-btn">X</button>
                <div class="color-picker">
                    <label>Color:</label>
                    <select class="color-selection">
                        <option value="#d3a383">Brown</option>
                        <option value="#f28b82">Red</option>
                        <option value="#fbbc04">Yellow</option>
                        <option value="#34a853">Green</option>
                        <option value="#4285f4">Blue</option>
                    </select>
                </div>
            `;

            // Delete button
            const deleteButton = bookElement.querySelector('.delete-btn');
            deleteButton.onclick = function() {
                books.splice(index, 1); // Remove book
                localStorage.setItem('books', JSON.stringify(books));
                renderBookshelf(); // Re-render the bookshelf
            };

            // Color picker
            const colorPicker = bookElement.querySelector('.color-selection');
            colorPicker.value = book.color; // Set the current color
            colorPicker.onchange = function() {
                books[index].color = colorPicker.value; // Update book color
                localStorage.setItem('books', JSON.stringify(books));
                renderBookshelf(); // Re-render the bookshelf
            };

            bookshelfContainer.appendChild(bookElement);
        });
    }

    // Event listeners for buttons
    if (addButton) {
        addButton.onclick = addBook;
    }
    
    if (saveButton) {
        saveButton.onclick = function() {
            localStorage.setItem('books', JSON.stringify(books));
        };
    }

    // Initial render of the bookshelf
    renderBookshelf();
});
