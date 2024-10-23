const CLIENT_ID = '850860820123-fpd7jd5t040vflodkrao0cea57ufi4jq.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
let auth2, books = [];

// Initialize Google API client
function initClient() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPE
    });
  });
}

// Sign in and load books
document.getElementById('signin-button').onclick = function() {
  auth2.signIn().then(loadBooksFromGoogleDrive);
};

// Add new book
document.getElementById('add-book').onclick = function() {
  const book = {
    title: prompt("Enter book title:"),
    author: prompt("Enter book author:"),
    color: randomColor()
  };
  books.push(book);
  renderBooks();
  autoSave();
};

// Render the bookshelf UI
function renderBooks() {
  const bookshelf = document.getElementById('bookshelf');
  bookshelf.innerHTML = '';
  books.forEach((book, index) => {
    const bookElem = document.createElement('div');
    bookElem.className = 'book';
    bookElem.style.backgroundColor = book.color;

    const titleElem = document.createElement('div');
    titleElem.className = 'book-title';
    titleElem.textContent = book.title;

    const authorElem = document.createElement('div');
    authorElem.className = 'book-author';
    authorElem.textContent = book.author;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-book';
    deleteButton.textContent = 'X';
    deleteButton.onclick = function () {
      deleteBook(index);
    };

    bookElem.appendChild(deleteButton);
    bookElem.appendChild(titleElem);
    bookElem.appendChild(authorElem);
    bookshelf.appendChild(bookElem);
  });
}

// Random color generator for book covers
function randomColor() {
  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Delete a book
function deleteBook(index) {
  books.splice(index, 1);
  renderBooks();
  autoSave();
}

// Auto-save to Google Drive whenever the bookshelf is updated
function autoSave() {
  saveBooksToGoogleDrive();
}

// Save books to Google Drive
function saveBooksToGoogleDrive() {
  const fileContent = JSON.stringify(books);
  const file = new Blob([fileContent], { type: 'application/json' });

  gapi.client.load('drive', 'v3', function() {
    const metadata = {
      name: 'bookshelf.json',
      mimeType: 'application/json'
    };

    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
    }).then(response => response.json()).then(result => {
      console.log('File saved to Google Drive', result);
    }).catch(error => console.error('Error saving to Google Drive:', error));
  });
}

// Load books from Google Drive
function loadBooksFromGoogleDrive() {
  gapi.client.load('drive', 'v3', function() {
    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

    fetch('https://www.googleapis.com/drive/v3/files?q=name%3D\'bookshelf.json\'&spaces=drive&fields=files(id%2Cname)&access_token=' + accessToken)
    .then(response => response.json())
    .then(result => {
      if (result.files && result.files.length > 0) {
        const fileId = result.files[0].id;

        fetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media&access_token=' + accessToken)
        .then(response => response.json())
        .then(data => {
          books = data || [];
          renderBooks();
        });
      }
    });
  });
}
