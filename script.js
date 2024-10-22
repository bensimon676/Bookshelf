window.onload = function() {
    loadBooks();
};

// Function to add a book
function addBook() {
    const titleInput = document.getElementById("book-title");
    const authorInput = document.getElementById("book-author");

    const title = titleInput.value;
    const author = authorInput.value;

    if (title === "" || author === "") {
        alert("Please fill in both the book title and author.");
        return;
    }

    createBookElement(title, author, '#B07A5B'); // Default book color
    saveBooks();

    titleInput.value = "";
    authorInput.value = "";
}

// Function to save books to localStorage
function saveBooks() {
    const bookDivs = document.getElementsByClassName("book");
    const books = [];

    for (let bookDiv of bookDivs) {
        const title = bookDiv.querySelector("p:nth-child(1)").textContent;
        const author = bookDiv.querySelector("p:nth-child(2)").textContent;
        const color = bookDiv.style.backgroundColor;
        books.push({ title, author, color });
    }

    localStorage.setItem("books", JSON.stringify(books));
}

// Function to load books from localStorage
function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    for (let book of books) {
        createBookElement(book.title, book.author, book.color);
    }
}

// Function to create and display a book element
function createBookElement(title, author, color) {
    const bookshelf = document.getElementById("bookshelf");

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.style.backgroundColor = color;

    const titlePara = document.createElement("p");
    titlePara.textContent = title;

    const authorPara = document.createElement("p");
    authorPara.textContent = author;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
        bookshelf.removeChild(bookDiv);
        saveBooks();
    };

    // Add edit color button
    const editColorBtn = document.createElement("button");
    editColorBtn.classList.add("edit-color-btn");
    editColorBtn.textContent = "🎨";

    // Color preset options
    editColorBtn.onclick = function () {
        const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD433"];
        const colorMenu = document.createElement("div");
        colorMenu.classList.add("color-menu");

        colorOptions.forEach(function (presetColor) {
            const colorOption = document.createElement("div");
            colorOption.classList.add("color-option");
            colorOption.style.backgroundColor = presetColor;
            colorOption.onclick = function () {
                bookDiv.style.backgroundColor = presetColor;
                saveBooks();
                colorMenu.remove(); // Remove the menu after color selection
            };
            colorMenu.appendChild(colorOption);
        });

        bookDiv.appendChild(colorMenu);
    };

    bookDiv.appendChild(titlePara);
    bookDiv.appendChild(authorPara);
    bookDiv.appendChild(editColorBtn);
    bookDiv.appendChild(deleteBtn);
    bookshelf.appendChild(bookDiv);
}

// Add event listeners for buttons
document.getElementById("add-book").onclick = addBook;
document.getElementById("save-books").onclick = saveBooks;
