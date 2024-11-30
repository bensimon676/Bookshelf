document.addEventListener("DOMContentLoaded", () => {
    const bookshelf = document.getElementById("bookshelf");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const addButton = document.getElementById("addButton");

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const renderBookshelf = () => {
        bookshelf.innerHTML = "";
        books.forEach((book, index) => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.style.backgroundColor = book.color;
            bookElement.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
                <button class="delete-btn" title="Remove Book">✖</button>
            `;

            // Attach delete functionality
            bookElement.querySelector(".delete-btn").addEventListener("click", () => {
                books.splice(index, 1);
                saveAndRender();
            });

            bookshelf.appendChild(bookElement);
        });
    };

    const saveAndRender = () => {
        localStorage.setItem("books", JSON.stringify(books));
        renderBookshelf();
    };

    addButton.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        if (!title || !author) return alert("Please fill out both fields!");

        books.push({
            title,
            author,
            color: generateRandomColor(),
        });
        titleInput.value = "";
        authorInput.value = "";
        saveAndRender();
    });

    const generateRandomColor = () => {
        const colors = ["#FFDAB9", "#FAF0E6", "#FFE4C4", "#F4A460", "#D2B48C"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    renderBookshelf();
});
