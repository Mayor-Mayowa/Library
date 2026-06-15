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

Book.prototype.toggleRead = function() {
    this.read = !this.read
};

function createBookCard(book) {
    const card = document.createElement("div")
    card.classList.add('card')
    card.dataset.id = book.id;

    const title = document.createElement("p")
    title.textContent = book.title

    const author = document.createElement("p")
    author.textContent = `by ${book.author}`

    const pages = document.createElement("p")
    pages.textContent = `${book.pages} pages`

    const readingStatus = document.createElement("p")
    readingStatus.textContent = book.read ? 'Read' : 'Not Yet Read'

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.classList.add('remove-btn')
    removeBtn.addEventListener('click', function() {
        const id = removeBtn.parentElement.dataset.id
        myLibrary = myLibrary.filter(book => book.id !== id)
        displayBooks()
    });

    const toggleBtn = document.createElement('button')
    toggleBtn.textContent = 'ToggleRead'
    toggleBtn.classList.add('toggle-btn')
    toggleBtn.addEventListener('click', function(){
        const id = toggleBtn.parentElement.dataset.id
        const book = myLibrary.find(b => b.id === id)
        book.toggleRead()
        displayBooks()
         
    });

    const cover = document.createElement('div')
    cover.classList.add('book-cover')
    cover.textContent = book.title[0].toUpperCase()
    const colors = ['#2d6a4f', '#52b788', '#74c69d', '#1b4332', '#40916c']
    cover.style.background = colors[Math.floor(Math.random() * colors.length)]

    card.appendChild(cover);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readingStatus);
    card.appendChild(removeBtn);
    card.appendChild(toggleBtn);

    return card;
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
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.querySelector('input[name="readingStatus"]:checked').value === "read";
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
    form.reset();
});

form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        const inputs = Array.from(form.querySelectorAll('input:not([type="radio"]), button[type="submit"]'));
        const currentIndex = inputs.indexOf(document.activeElement);
        
        if (currentIndex > -1 && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else if (currentIndex === inputs.length - 1) {
            form.requestSubmit(); 
        }
    }
});

dialog.addEventListener('click', function(event) {
    const rect = dialog.getBoundingClientRect();
    const isClickOutside = (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    );

    if (isClickOutside) {
        dialog.close();
        form.reset(); 
    }
});

addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("To kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Harry Potter and the sorcerer's stone", "J.K. Rowling", 309, false);
displayBooks();
