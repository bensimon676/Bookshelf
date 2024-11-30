document.addEventListener("DOMContentLoaded", () => {
    const bookshelf = document.getElementById("bookshelf");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const addButton = document.getElementById("addButton");

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const renderBookshelf = () => {
        bookshelf.innerHTML = books.length
            ? ""
            : '<p class="placeholder">Your bookshelf is empty. Add some books! 📖</p>';

        books.forEach((book, index) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.style.borderColor = book.color;
            bookDiv.innerHTML = `
                <div class="book-content">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                </div>
                <button class="delete-btn" title="Remove Book">❌</button>
            `;

            bookDiv.querySelector(".delete-btn").addEventListener("click", () => {
                books.splice(index, 1);
                saveAndRender();
            });

            bookshelf.appendChild(bookDiv);
        });
    };

    const saveAndRender = () => {
        localStorage.setItem("books", JSON.stringify(books));
        renderBookshelf();
    };

    addButton.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        if (!title || !author) return alert("Both title and author are required!");

        books.push({ title, author, color: getRandomColor() });
        titleInput.value = "";
        authorInput.value = "";
        saveAndRender();
    });

    const getRandomColor = () => {
        const palette = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"];
        return palette[Math.floor(Math.random() * palette.length)];
    };

    renderBookshelf();
});
