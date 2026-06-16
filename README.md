# Personal Library

A personal book tracker built as part of The Odin Project's 
JavaScript course. Not a full reading platform — just a clean 
way to keep track of books you've read or plan to read.

## Features

- Add books through a dialog popup with title, author, 
  pages and reading status
- Each book displays as a card with its own remove and 
  toggle read button — not a general one affecting all books
- Toggle read status per book without removing it
- Click outside the dialog or press Enter to navigate 
  the form fields
- Books are stored in an array and displayed dynamically 
  — no page reloads needed
- Unique ID generated for each book using crypto.randomUUID()

## Built With

- HTML
- CSS (Grid, Custom Properties, Dialog element)
- JavaScript (Object Constructors, Prototypes, DOM Manipulation)

## Live Demo

https://mayor-mayowa.github.io/Library/

## What I Learned

Managing the relationship between the data (array) and the 
display (DOM) as separate concerns was the biggest lesson here. 
Also got more comfortable with object constructors and prototype 
functions — and learned that form inputs always return strings, 
not numbers.

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com)