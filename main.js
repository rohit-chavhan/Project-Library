let addBooksBtn = document.querySelector('.addBooks');
let submitBtn = document.querySelector('.submit');
const cardsMainDiv = document.querySelector('.gridCards');
const dialog = document.querySelector('dialog');

function Book(bookName, author, pages, status) {
  this.bookName = bookName;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function() {
  if(this.status === "Read") {
    this.status = "Not Read";
  }
  else {
    this.status = "Read";
  }
}

const myLibrary = [];

function getValues() {
  const bookName = document.getElementById('bookName').value;
  const numsOfPages = document.getElementById('numsOfPages').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status');

  let readOrNot = '';
  if(status.checked === true) {
    readOrNot = "Read";
  }
  else {
    readOrNot = "Not read"
  }

  const book = new Book(bookName, author, numsOfPages, readOrNot);
  myLibrary.push(book);
}

function getAttribute(elm) {
  const arrayIndex = Number(elm.getAttribute("index"));
  myLibrary[arrayIndex].changeStatus();
  removeCards();
  createCards();
}

function removeArrayElm(elm) {
  const index = Number(elm.getAttribute("removeIndex"));
  myLibrary.splice(index, 1);
  removeCards();
  createCards();
}

function createCards() {
  myLibrary.forEach((el, i) => {
    const div = document.createElement('div');
    const bookN = document.createElement("p");
    const bookP = document.createElement("p");
    const authorN = document.createElement("p");
    const status = document.createElement("button");
    const removeBtn = document.createElement("button");

    removeBtn.textContent = "Remove book";
    authorN.innerHTML = `"${el.author}"`;
    bookN.innerHTML = `${el.bookName}`;
    bookP.innerHTML = `${el.pages}`;
    status.innerHTML = `${el.status}`;
    status.classList.add('btn');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('width100');
    if(status.innerHTML === "Read") {
      status.classList.add('green-btn');
    }
    else {
      status.classList.add('red-btn');
    }

    status.setAttribute("index", `${i}`);
    removeBtn.setAttribute('removeIndex', `${i}`);

    status.addEventListener('click', function() {
      getAttribute(this);
    })

    removeBtn.addEventListener('click', function() {
      removeArrayElm(this);
    })

    div.appendChild(authorN);
    div.appendChild(bookN);
    div.appendChild(bookP);
    div.appendChild(status);
    div.classList.add('cards');
    div.appendChild(removeBtn);
    
    cardsMainDiv.appendChild(div);
  })
}

function openForms() {
  dialog.showModal();
}

function removeCards() {
  cardsMainDiv.textContent = "";
}

function submitButton(event) {
  getValues();
  if(myLibrary.length > 1 ) {
    removeCards();
  }
  createCards();
  dialog.close();
  event.preventDefault();
}

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
})

addBooksBtn.addEventListener('click', openForms);

submitBtn.addEventListener('click', submitButton);