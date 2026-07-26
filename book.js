let library = [];

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = 'no';
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.numPages} pages, ${this.isRead}`)
    }
}

function addBookToLibrary(title, author, numPages, isRead) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.numPages = numPages;
    book.isRead = isRead;

    library.push(book);
}

initTableData();
// addBookToLibrary('To Kill A MockingBird', 'Harper Lee', 255, true);
// addBookToLibrary('1984', 'George Orwell', 160, false);

function initTableData() {
    const table = document.querySelector('table');
    for (let i = 0; i < library.length; i++) {
        // action buttons
        const tr = document.createElement('tr');

        // td items for each column
        const actionTdBtns = document.createElement('td');
        const titleTd = document.createElement('td');
        const authorTd = document.createElement('td');
        const numPagesTd = document.createElement('td');
        const readTd = document.createElement('td');

        titleTd.textContent = library[i].title;
        authorTd.textContent = library[i].author;
        numPagesTd.textContent = library[i].numPages;
        readTd.textContent = library[i].isRead ? 'Yes' : 'No';

        // create div to store buttons
        const divBtns = document.createElement('div');
        divBtns.classList.add('action-btns');

        // create buttons 
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        // put the edit/delete btns in the div
        divBtns.appendChild(editBtn);
        divBtns.appendChild(deleteBtn);


        // add div that stores buttons to the td
        actionTdBtns.appendChild(divBtns);

        // add all td elements to tr
        tr.appendChild(actionTdBtns);
        tr.appendChild(titleTd);
        tr.appendChild(authorTd);
        tr.appendChild(numPagesTd);
        tr.appendChild(readTd);

        // append tr to table
        table.appendChild(tr);
    }
}

var modal = document.getElementById("modal");
var btn = document.getElementById("btn");
var span = document.querySelector(".close");
var submit = document.querySelector(".submit");


// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// close modal on submit click
submit.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').valueAsNumber;
    const read = document.getElementById('read').value;

    // add to library array
    addBookToLibrary(title, author, pages, read);

    // append it to the table
    addBookToTable(title, author, pages, read);

})

function addBookToTable(title, author, pages, read) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');

    // td items for each column
    const actionTdBtns = document.createElement('td');
    const titleTd = document.createElement('td');
    const authorTd = document.createElement('td');
    const numPagesTd = document.createElement('td');
    const readTd = document.createElement('td');

    titleTd.textContent = title;
    authorTd.textContent = author;
    numPagesTd.textContent = pages;
    readTd.textContent = read.toUpperCase();

    // create div to store buttons
    const divBtns = document.createElement('div');
    divBtns.classList.add('action-btns');

    // create buttons 
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // put the edit/delete btns in the div
    divBtns.appendChild(editBtn);
    divBtns.appendChild(deleteBtn);


    // add div that stores buttons to the td
    actionTdBtns.appendChild(divBtns);

    // add all td elements to tr
    tr.appendChild(actionTdBtns);
    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(numPagesTd);
    tr.appendChild(readTd);

    // append tr to table
    table.appendChild(tr);
}