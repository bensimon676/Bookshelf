document.addEventListener("DOMContentLoaded", () => {
    const shelves = document.querySelectorAll(".shelf");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const addButton = document.getElementById("addButton");

    let books = JSON.parse(localStorage.getItem("books")) || [];
    const MAX_BOOKS_PER_SHELF = 7;

    const renderBookshelf = () => {
        shelves.forEach((shelf) => (shelf.innerHTML = ""));
        books.forEach((book, index) => {
            const shelfNumber = Math.floor(index / MAX_BOOKS_PER_SHELF) + 1;
            const shelf = document.querySelector(`.shelf[data-shelf="${shelfNumber}"]`);
            if (!shelf) return;

            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.style.backgroundColor = book.color;
            bookDiv.dataset.index = index;
            bookDiv.draggable = true;

            bookDiv.innerHTML = `
                <div class="spine"></div>
                <div class="book-content">
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                </div>
            `;

            // Add drag-and-drop events
            bookDiv.addEventListener("dragstart", dragStart);
            bookDiv.addEventListener("dragover", dragOver);
            bookDiv.addEventListener("drop", drop);
            bookDiv.addEventListener("dragend", dragEnd);

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

    let draggedIndex = null;

    const dragStart = (e) => {
        draggedIndex = e.target.dataset.index;
        e.dataTransfer.effectAllowed = "move";
    };

    const dragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const drop = (e) => {
        e.preventDefault();
        const targetIndex = e.target.closest(".book").dataset.index;
        if (targetIndex == null || draggedIndex == null) return;

        const [draggedBook] = books.splice(draggedIndex, 1);
        books.splice(targetIndex, 0, draggedBook);
        saveAndRender();
    };

    const dragEnd = () => {
        draggedIndex = null;
    };

    addButton.addEventListener("click", addBook);
    renderBookshelf();
});
