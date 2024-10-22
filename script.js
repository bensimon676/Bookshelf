document.addEventListener("DOMContentLoaded", function() {

    const bookshelfContainer = document.getElementById('bookshelf');
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const addButton = document.getElementById('addButton');
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Function to add a new book to the bookshelf
    function addBook() {
        const bookTitle = titleInput.value;
        const bookAuthor = authorInput.value;
        const bookColor = getRandomColor(); // Randomly generated color

        if (bookTitle && bookAuthor) {
            const newBook = { title: bookTitle, author: bookAuthor, color: bookColor };
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            renderBookshelf();
            titleInput.value = '';
            authorInput.value = '';
        }
    }

    // Function to generate a random book cover color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to render the bookshelf with the current books
    function renderBookshelf() {
        bookshelfContainer.innerHTML = ''; // Clear the container

        books.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.style.backgroundColor = book.color; // Set random book color

            // Set book content
            bookElement.innerHTML = `
                <div class="book-content">
                    <p>${book.title}</p>
                    <p>${book.author}</p>
                </div>
                <button class="delete-btn">X</button>
            `;

            // Delete button
            const deleteButton = bookElement.querySelector('.delete-btn');
            deleteButton.onclick = function() {
                books.splice(index, 1); // Remove book
                localStorage.setItem('books', JSON.stringify(books));
                renderBookshelf(); // Re-render the bookshelf
            };

            bookshelfContainer.appendChild(bookElement);
        });
    }

    // Event listeners for buttons
    addButton.onclick = addBook;

    // Initial render of the bookshelf
    renderBookshelf();
});
