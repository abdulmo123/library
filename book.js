let library = [];

function Book(id, title, author, numPages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = 'no';
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.numPages} pages, ${this.isRead}`)
    }
}

function addBookToLibrary(id, title, author, numPages, isRead) {
    const book = new Book();
    book.id = id;
    book.title = title;
    book.author = author;
    book.numPages = numPages;
    book.isRead = isRead;

    library.push(book);
}

var addModal = document.getElementById("add-modal");
var addBtn = document.getElementById("add-btn");
var addClose = document.querySelector(".add-close");
var addSubmit = document.querySelector(".add-submit");


// When the user clicks the button, open the modal 
addBtn.onclick = function () {
    addModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
addClose.onclick = function () {
    addModal.style.display = "none";
}

// close modal on submit click
addSubmit.onclick = function () {
    addModal.style.display = "none";
}

const addForm = document.querySelector('.add-form');
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').valueAsNumber;
    const read = document.getElementById('read').value;

    if (title !== '' && author !== '' && !isNaN(pages)) {
        // add to library array
        addBookToLibrary(id, title, author, pages, read);

        // append it to the table
        addBookToTable(id, title, author, pages, read);
    }
})

const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', (e) => {
    const oldId = editForm.classList[0].substring(10);
    e.preventDefault();

    // get the values from the input form
    const newId = crypto.randomUUID();
    const title = editForm.querySelector('input#title').value;
    const author = editForm.querySelector('input#author').value;
    const pages = editForm.querySelector('input#pages').valueAsNumber;
    const read = editForm.querySelector('select#read').value;

    // find and update book object in library list
    const book = library.find(obj => obj.id === oldId)
    console.log('book ===>', book);
    book.title = title;
    book.author = author;
    book.numPages = pages;
    book.isRead = read.toUpperCase();

    // update the textContent in the DOM td
    const titleTd = document.querySelector(`.title-${oldId}`);
    const authorTd = document.querySelector(`.author-${oldId}`);
    const numPagesTd = document.querySelector(`.pages-${oldId}`);
    const readTd = document.querySelector(`.read-${oldId}`);

    titleTd.textContent = title;
    authorTd.textContent = author;
    numPagesTd.textContent = pages;
    readTd.textContent = read.toUpperCase();

})

function addBookToTable(id, title, author, pages, read) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    tr.dataset.id = id;

    // td items for each column
    const actionTdBtns = document.createElement('td');
    const titleTd = document.createElement('td');
    titleTd.classList.add(`title-${id}`);
    const authorTd = document.createElement('td');
    authorTd.classList.add(`author-${id}`);
    const numPagesTd = document.createElement('td');
    numPagesTd.classList.add(`pages-${id}`);
    const readTd = document.createElement('td');
    readTd.classList.add(`read-${id}`);

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
    editBtn.classList.add('edit');
    editBtn.dataset.id = id;
    editBtn.id = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete')
    deleteBtn.dataset.id = id;
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

    console.log('library ==>', library);
}


function deleteBookItem(id) {
    // remove table row element from DOM 
    const table = document.querySelector('table');
    const tr = document.querySelector(`[data-id="${id}"]`);
    table.removeChild(tr);

    // remove item from the library list
    const idx = library.findIndex(book => book.id === id);
    if (idx !== -1) {
        library.splice(idx, 1);
    }
}

function editBookItem(id) {
    // get edit modal and related elements
    var editModal = document.getElementById("edit-modal");
    var editBtn = document.getElementById("edit-btn");
    const editForm = document.querySelector('#edit-form');
    editForm.classList.replace('edit-form', `edit-form-${id}`);
    var editClose = document.querySelector(".edit-close");
    var editSubmit = document.querySelector(".edit-submit");


    // When the user clicks the button, open the modal 
    editBtn.onclick = function () {
        editModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    editClose.onclick = function () {
        editModal.style.display = "none";
    }

    // close modal on submit click
    editSubmit.onclick = function () {
        editModal.style.display = "none";
    }

    // grab inputs on the edit modal form
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readInput = document.getElementById('read');

    // pull up the preserved data to display
    const obj = library.find(book => book.id === id);
    titleInput.value = obj.title;
    authorInput.value = obj.author;
    pagesInput.valueAsNumber = obj.numPages;
    readInput.value = obj.isRead;
}

// event listener for edit/delete btn of each row
const table = document.querySelector('table');
table.addEventListener('click', (e) => {
    if (event.target.closest('button.delete')) {
        const id = event.target.dataset.id
        deleteBookItem(id);
    } else if (event.target.closest('button.edit')) {
        const id = event.target.dataset.id
        editBookItem(id);
    }
})