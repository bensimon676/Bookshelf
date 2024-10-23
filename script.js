let GoogleAuth;

const SCOPE = 'https://www.googleapis.com/auth/drive.file';

document.addEventListener('DOMContentLoaded', function () {
    gapi.load('client:auth2', initClient);

    document.getElementById("google-signin-btn").onclick = handleAuthClick;
    document.getElementById("save-bookshelf-btn").onclick = saveBookshelf;
    document.getElementById("load-bookshelf-btn").onclick = loadBookshelf;
});

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
    });
}

function handleAuthClick() {
    GoogleAuth.signIn().then(() => {
        console.log("User signed in");
    });
}

function saveBookshelf() {
    const currentBookshelfState = {
        books: [...], // Your bookshelf data
    };
    saveToGoogleDrive(currentBookshelfState);
}

function loadBookshelf() {
    loadFromGoogleDrive();
}

// Save to Google Drive function
function saveToGoogleDrive(content) {
    const fileMetadata = {
        'name': 'bookshelf-data.json',
        'mimeType': 'application/json'
    };
    const fileContent = new Blob([JSON.stringify(content)], { type: 'application/json' });
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', fileContent);

    gapi.client.drive.files.create({
        resource: fileMetadata,
        media: {
            mimeType: 'application/json',
            body: fileContent
        },
        fields: 'id'
    }).then(function (response) {
        console.log('File saved:', response);
    });
}

// Load from Google Drive function
function loadFromGoogleDrive() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(function (response) {
        const files = response.result.files;
        if (files && files.length > 0) {
            const fileId = files[0].id;
            gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media'
            }).then(function (fileResponse) {
                const bookshelfData = JSON.parse(fileResponse.body);
                console.log('Loaded bookshelf data:', bookshelfData);
            });
        }
    });
}
