// Exercise 2.1
// ------------

// Create a Book class and then intantiate it 5 times with various books
// include the following properties in the constructor
//    - title (string)
//    - genre (string)
//    - author (string)
//    - isRead (boolean - whether or not you've read the book)
//
// Declare the books as book1, book2, book3, book4, book5
//
// If the book doesn't provide a value for `isRead`, it should default to
// `false`.
//
// Console.log them to verify that all is working.

class Book {
    // attributes
    title=undefined;
    genre=undefined;
    author=undefined;
    isRead=false;

    // constructor
    constructor(title, genre, author, isRead){
        this.title=title;
        this.genre=genre;
        this.author=author;
        if(isRead===true){
            this.isRead=isRead;
        }

    }

}

let book1 = new Book("Leave the World Behind: A Novel", "mystery", "Rumaan Alam", false);
let book2 = new Book("Winter's Mourn (Winter Black Series Book 1)", "mystery","Mary Stone", true);
let book3 = new Book("Humans", "travel", "Brandon Stanton", true);
let book4 = new Book("Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", "medical", "James Clear", undefined);
let book5 = new Book("The Haunting of Brynn Wilder: A Novel", "romance", "Wendy Webb", true);

console.log(book1, book2, book3, book4, book5);
