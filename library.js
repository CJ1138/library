let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let theHobbit = new Book("The Hobbit", 'JRR Tolkien', 304, true);
let greatGatsby = new Book('The Great Gatsby', 'F Scott Fitzgerald', 218, true);
let catsCradle = new Book('Cats Cradle', 'Kurt Vonnegut', 304, false);


function addBookToLibrary(title,author,pages,read){
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
}

myLibrary.push(theHobbit, greatGatsby, catsCradle);
addBookToLibrary("The Unbearable Lightness of Being", 'Milan Kundera', 393, true);

const cardContainer = document.getElementById('card-container');

function displayBooks(){
    let n = 0;
    myLibrary.forEach(function(book){
        let readIt = 'Yes';
        if(!book.read){
            readIt = 'No';
        }
        let bookDiv = document.createElement('div');
        bookDiv.id = "book" + n;
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = "Title: " + book.title + "</br> Author: " + 
        book.author + "</br> Page Count: " + book.pages + "</br> Have you read it? " +
        readIt;
        cardContainer.appendChild(bookDiv);
        n++;
    })
}

displayBooks();