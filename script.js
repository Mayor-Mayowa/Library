let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
};

function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
};

function createBookCard(book) {
    const card = document.createElement("div")
    card.classList.add('card')
    card.dataset.id = book.id;

    const title = document.createElement("p")
    title.textContent = book.title

    const author = document.createElement("p")
    author.textContent = book.author

    const pages = document.createElement("p")
    pages.textContent = `${book.pages} pages`

    const readingStatus = document.createElement("p")
    readingStatus.textContent = book.read ? 'Read' : 'Not Yet Read'

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'

    removeBtn.addEventListener('click', function() {
        const id = removeBtn.parentElement.dataset.id
        myLibrary = myLibrary.filter(book => book.id !== id)
        displayBooks()
    });

    const toggleBtn = document.createElement('button')
    toggleBtn.textContent = 'toggleRead'
    toggleBtn.addEventListener('click', function(){
        const id = toggleBtn.parentElement.dataset.id
        const book = myLibrary.find(b => b.id === id)
        book.toggleRead()
        displayBooks()
         
    });
   

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readingStatus);
    card.appendChild(removeBtn);
    card.appendChild(toggleBtn);


    return card;
};

Book.prototype.toggleRead = function() {
    this.read = !this.read
};

function displayBooks(){
    const container = document.getElementById("Library-container")
    container.innerHTML = ''

    myLibrary.forEach(book => {
        const card = createBookCard(book)
        container.appendChild(card)
    })
};

const openBtn = document.getElementById('newBook-btn');
const dialog = document.getElementById('add-book-dialog');
const form = document.getElementById('book-form')

openBtn.addEventListener('click', function(){
    dialog.showModal();
});

form.addEventListener('submit', function(e){
    e.preventDefault()
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="readingStatus"]:checked').value === "read";
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
    form.reset();
});

addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("To kill a Mockingbird", "Harper Lee", "281", true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", true);
addBookToLibrary("Harry Potter and the sorcerer's stone", "J.K. Rowling", "309", false);
displayBooks();
