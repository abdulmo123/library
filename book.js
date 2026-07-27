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

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
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

function addBookToTable(id, title, author, pages, read) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    tr.dataset.id = id;

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
    editBtn.classList.add('edit');
    editBtn.dataset.id = id;

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
    console.log('id to EDIT ...', id);
    // TODO: modal popup (preferably with pre-populated fields)

    // TODO: go thru with updated modal values and set book object to updated values
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