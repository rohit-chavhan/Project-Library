// Query Selectors
let addBooksBtn = document.querySelector('.addBooks');
let submitBtn = document.querySelector('.submit');
const cardsMainDiv = document.querySelector('.gridCards');
const dialog = document.querySelector('dialog');
const form = document.getElementById('form');

// Book Class
class Book {
  constructor(bookName, author, pages, status) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
  toggleStatus() {
    this.status = this.status === 'Read' ? 'Not Read' : 'Read';
  }
}

// Library Array
const myLibrary = [];

// Dialog Event Listener
dialog.addEventListener('click', (event) => {
  if (event.target.id === 'form') {
    dialog.close();
  }
});

// Add Books Button Event Listener
addBooksBtn.addEventListener('click', () => {
  dialog.showModal();
});

function formReset() {
  document.getElementById('bookName').value = '';
  document.getElementById('numsOfPages').value = '';
  document.getElementById('author').value = '';
  document.getElementById('status').checked = false;
}

// Submit Button Event Listener
form.addEventListener('submit', (event) => {
  event.preventDefault();

  getValues();
  if (myLibrary.length > 1) {
    removeCards();
  }
  createCards();
  formReset();
  dialog.close();
});

// Function to Add Book to Library
function getValues() {
  const bookName = document.getElementById('bookName').value;
  const numsOfPages = document.getElementById('numsOfPages').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').checked
    ? 'Read'
    : 'Not read';
  console.log(status);
  const book = new Book(bookName, author, numsOfPages, status);
  myLibrary.push(book);
}

function domInAction() {
  removeCards();
  createCards();
}

function getAttribute(elm) {
  const arrayIndex = Number(elm.getAttribute('index'));
  console.log(elm, arrayIndex);
  myLibrary[arrayIndex].toggleStatus();
  domInAction();
}

function removeArrayElm(elm) {
  const index = Number(elm.getAttribute('removeIndex'));
  myLibrary.splice(index, 1);
  domInAction();
}

const removeCards = () => (cardsMainDiv.textContent = '');

function createCards() {
  myLibrary.forEach((el, i) => {
    const div = document.createElement('div');
    const bookN = document.createElement('p');
    const bookP = document.createElement('p');
    const authorN = document.createElement('p');
    const status = document.createElement('button');
    const removeBtn = document.createElement('button');

    removeBtn.textContent = 'Remove book';
    authorN.innerHTML = `"${el.author}"`;
    bookN.innerHTML = `${el.bookName}`;
    bookP.innerHTML = `${el.pages}`;
    status.innerHTML = `${el.status}`;

    status.classList.add('btn');
    removeBtn.classList.add('btn', 'width100');
    status.classList.add(status.innerHTML === 'Read' ? 'green-btn' : 'red-btn');

    status.setAttribute('index', `${i}`);
    removeBtn.setAttribute('removeIndex', `${i}`);

    status.addEventListener('click', () => {
      getAttribute(status);
    });

    removeBtn.addEventListener('click', () => {
      removeArrayElm(removeBtn);
    });

    div.classList.add('cards');
    div.append(authorN, bookN, bookP, status, removeBtn);
    cardsMainDiv.appendChild(div);
  });
}
