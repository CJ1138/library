var firebaseConfig = {
    apiKey: "AIzaSyBpTcsAahSOjMpvesDSyvwz7vmWMA4TNtg",
    authDomain: "library-b9001.firebaseapp.com",
    projectId: "library-b9001",
    storageBucket: "library-b9001.appspot.com",
    databaseURL: "https://library-b9001-default-rtdb.europe-west1.firebasedatabase.app/",
    messagingSenderId: "335838617500",
    appId: "1:335838617500:web:d81c4284747c392af0f259"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const dbRoot = database.ref();

let cardNumber = 1110

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = parseInt(pages)
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

function pushToDB(t, a, p, r){
        dbRoot.child('books/'+cardNumber).set({
            title: t,
            author: a,
            pages: p,
            read: r
    })
    cardNumber++;
}


function addListeners(n){
    let currentDiv = document.getElementById(n);
    let delBtn = currentDiv.querySelector('.book-delete');
    delBtn.addEventListener('click', deleteBook);
    let cardRadios = currentDiv.querySelectorAll('.card-radio');
    cardRadios.forEach(button => button.addEventListener('click', setCardRead));
}

const cardContainer = document.getElementById('card-container');

let formRead = document.getElementsByName('read');

function generateCard(num, book){
    let bookDiv = document.createElement('div');
        bookDiv.id = num;
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = "Title: " + book.title + "</br> Author: " + 
        book.author + "</br> Page Count: " + book.pages + "</br> Have you read it? " +
        '<label for = "read">Yes </label>' +
        '<input type="radio" class = "card-radio" name="card-read'+num+'" value = "Yes" id = "form-read-yes-'+num+'">' +
        '     <label for = "read">No </label>' +
        '<input type="radio" class = "card-radio" name="card-read'+num+'" value = "No" id = "form-read-no-'+num+'">' +
        '</br> <span class = "book-delete">Delete Book</span>'
        cardContainer.appendChild(bookDiv);
        book.cardRef = cardNumber;
        setCardRadios(cardNumber);
        addListeners(num);
        cardNumber++;

}

function displayBooks(){
    myLibrary.forEach(function(book){
        generateCard(cardNumber, book);
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
let formFields = document.querySelectorAll('.ftext');

function clearForm(){
    formFields.forEach(field => 
       field.value = '' )
}

function getRadioValue(){
    let output;
    formRead.forEach(function(radio) {
        if (radio.checked){
            output = radio.value;
         }
    })
    return output;
}

function submitForm(){
    pushToDB(formTitle.value, formAuthor.value, formPages.value, getRadioValue());
    generateCard(cardNumber, myLibrary[(myLibrary.length)-1]);
    clearForm();
    hideForm();
}

function deleteBook(e){
    let divToDelete = document.getElementById(e.path[1].id);
    divToDelete.remove();
    deleteFromArray(e.path[1].id);

}

function findBook(ref){
    return myLibrary.findIndex(book => book.cardRef == ref);
}

function deleteFromArray(ref){
    myLibrary.splice(findBook(ref), 1);

}

function setCardRadios(ref){
    let yesRadio = document.getElementById('form-read-yes-'+ref);
    let noRadio = document.getElementById('form-read-no-'+ref);
    if(myLibrary[findBook(ref)].read == 'Yes'){
        yesRadio.checked = true;
    }else{
        noRadio.checked = true;
    }
}

function setCardRead(e){
    myLibrary[findBook(e.path[1].id)].read = this.value;
}