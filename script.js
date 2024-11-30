document.addEventListener("DOMContentLoaded", () => {
    const shelves = document.querySelectorAll(".shelf");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const addButton = document.getElementById("addButton");

    let books = JSON.parse(localStorage.getItem("books")) || [];

    const MAX_BOOKS_PER_SHELF = 5;

    const renderBookshelf = () => {
        shelves.forEach((shelf) => (shelf.innerHTML = ""));
        books.forEach((book, index) => {
            const shelfNumber = Math.floor(index / MAX_BOOKS_PER_SHELF) + 1;
            const shelf = document.querySelector(`.shelf[data-shelf="${shelfNumber}"]`);
            if (!shelf) return;

            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.style.backgroundColor = book.color;
            bookDiv.setAttribute("draggable", "true");
            bookDiv.dataset.index = index;

            bookDiv.innerHTML = `
                <div class="spine"></div>
                <div class="book-content">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                </div>
            `;

            bookDiv.addEventListener("dragstart", (e) => dragStart(e, index));
            bookDiv.addEventListener("dragover", (e) => e.preventDefault());
            bookDiv.addEventListener("drop", (e) => drop(e, index));

            shelf.appendChild(bookDiv);
        });
    };

    const saveAndRender = () => {
        localStorage.setItem("books", JSON.stringify(books));
        renderBookshelf();
    };

    const addBook = () => {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        if (!title || !author) return alert("Both title and author are required!");

        if (books.length >= MAX_BOOKS_PER_SHELF * shelves.length) {
            alert("No more space on the shelves!");
            return;
        }

        books.push({ title, author, color: getRandomColor() });
        titleInput.value = "";
        authorInput.value = "";
        saveAndRender();
    };

    const getRandomColor = () => {
        const palette = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"];
        return palette[Math.floor(Math.random() * palette.length)];
    };

    const dragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
    };

    const drop = (e, targetIndex) => {
        const draggedIndex = e.dataTransfer.getData("text/plain");
        if (draggedIndex !== targetIndex) {
            const [draggedBook] = books.splice(draggedIndex, 1);
            books.splice(targetIndex, 0, draggedBook);
            saveAndRender();
        }
    };

    addButton.addEventListener("click", addBook);
    renderBookshelf();
});
