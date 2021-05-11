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

function addDeleteListener(n){
    let currentDiv = document.getElementById(n);
    let delBtn = currentDiv.querySelector('.book-delete');
    delBtn.addEventListener('click', deleteBook);
}

let cardNumber = 1110;

const cardContainer = document.getElementById('card-container');

let formRead = document.getElementsByName('read');

function generateCard(num, book){
    let bookDiv = document.createElement('div');
        bookDiv.id = num;
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = "Title: " + book.title + "</br> Author: " + 
        book.author + "</br> Page Count: " + book.pages + "</br> Have you read it? " +
        '<label for = "read">Yes </label>' +
        '<input type="radio" name="card-read'+num+'" value = "Yes" id = "form-read-yes-'+num+'">' +
        '     <label for = "read">No </label>' +
        '<input type="radio" name="card-read'+num+'" value = "No" id = "form-read-no-'+num+'">' +
        '</br> <span class = "book-delete">Delete Book</span>'
        cardContainer.appendChild(bookDiv);
        book.cardRef = cardNumber;
        setCardRadios(cardNumber);
        addDeleteListener(num);
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
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, getRadioValue());
    generateCard(cardNumber, myLibrary[(myLibrary.length)-1]);
    clearForm();
    hideForm();
}

function deleteBook(e){
    let divToDelete = document.getElementById(e.path[1].id);
    divToDelete.remove();
    deleteFromArray(e.path[1].id);

}

function deleteFromArray(ref){
    let rightIndex = myLibrary.findIndex(book => book.cardRef == ref);
    myLibrary.splice(rightIndex, 1);

}

//Write a function that sets one of the radio buttons to checked, for each card,
//based on the value of 'read' for the associated book object

function setCardRadios(ref){
    let yesRadio = document.getElementById('form-read-yes-'+ref);
    let noRadio = document.getElementById('form-read-no-'+ref);
    let rightIndex = myLibrary.findIndex(book => book.cardRef == ref);
    if(myLibrary[rightIndex].read == 'Yes'){
        yesRadio.checked = true;
    }else{
        noRadio.checked = true;
    }
}

//Add listeners to each set of radio buttons on each card



//Write a function to be called by the radio button listers that sets the value
//of read in the associated book object to the value of the radio button clicked
//unless the value of read is already the 