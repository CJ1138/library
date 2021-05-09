let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let theHobbit = new Book("The Hobbit", 'JRR Tolkien', 304, 'Yes');
let greatGatsby = new Book('The Great Gatsby', 'F Scott Fitzgerald', 218, 'Yes');
let catsCradle = new Book('Cats Cradle', 'Kurt Vonnegut', 304, 'No');

function addBookToLibrary(title,author,pages,read){
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
}

myLibrary.push(theHobbit, greatGatsby, catsCradle);
addBookToLibrary("The Unbearable Lightness of Being", 'Milan Kundera', 393, 'Yes');
addBookToLibrary("Intimacy", 'Hanif Kureshi', 220, 'Yes');


const cardContainer = document.getElementById('card-container');

function generateCard(num, book){
    let bookDiv = document.createElement('div');
        bookDiv.id = "book" + num;
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = "Title: " + book.title + "</br> Author: " + 
        book.author + "</br> Page Count: " + book.pages + "</br> Have you read it? " +
        book.read + '</br> <span class = "book-delete">Delete</span>';
        cardContainer.appendChild(bookDiv);
}

function displayBooks(){
    let n = 0;
    myLibrary.forEach(function(book){
        generateCard(n, book);
        n++;
    })
}

displayBooks();

const newBookBtn = document.getElementById('new-book-btn');
const formContainer = document.getElementById('form-container');
const formX = document.getElementById('x');

function removeCards(){
    bookCards.forEach(book => book.remove());
}

function showForm(){
    formContainer.style.display = 'flex';
}

function hideForm(){
    formContainer.style.display = 'none';
}

newBookBtn.addEventListener('click', showForm);

formX.addEventListener('click', hideForm);

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', submitForm);
let formTitle = document.getElementById('form-title');
let formAuthor = document.getElementById('form-author');
let formPages = document.getElementById('form-pages');
let formRead = document.getElementById('form-read');
let formFields = document.querySelectorAll('input');

function clearForm(){
    formFields.forEach(field => 
       field.value = '' )
}

function submitForm(){
    console.log(formRead.value);
    let readTick = 'No';
    if (!formRead.value){
        readTick = "Yes"
    }
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, readTick);
    generateCard(myLibrary.length, myLibrary[(myLibrary.length)-1]);
    clearForm();
    hideForm();
}

let deleteButtons = document.querySelectorAll('.book-delete');
deleteButtons.forEach(deleteButton => addEventListener('click', deleteBook));

function deleteBook(e){
    console.log(myLibrary);
    console.log(e);
}