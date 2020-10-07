// From 2.3
// Copy over all of the code from 2.3...

class Book {
  // attributes
  title=undefined;
  genre=undefined;
  author=undefined;
  isRead=false;

  // getters
  getIsRead(){
    return this.isRead;
  }
  getTitle(){
    return this.title;
  }

  // setters
  setIsRead(){
    this.isRead=true;
  }

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
class BookList {
  // Code here
  books=[];
  lastRead=null;
  currentlyReading=null;

  // getter
  getBooks(){
    return this.books;
  }
  getCurrentlyReading(){
    return this.currentlyReading;
  }

  // setter
  setCurrentReading(b){
    if(b==null){
      this.currentlyReading = b;
      return;
    }
    if(!b.getIsRead()){     // allow null
      this.currentlyReading = b;
      return;
    }
  }
  setLastReading(b){
    this.lastRead = b;
  }

  // method to add book
    // b is a book instance
  add = (b) => {
    // push to the bookshelf
    if(b!=null){        // check for null
      this.books.push(b);
    }
    // check whether read or not and set if it's read
    this.setCurrentReading(b);
  }
  // method to get read
  getNumRead = () => {
    let count = 0;
    this.getBooks().forEach(element => {
      if(element.getIsRead()){
        count++;
      }
    });
    return count;
  }

  // method to get unread
  getNumUnread = () => {
    let count = 0;
    this.getBooks().forEach(element => {
      if(!element.getIsRead()){
        count++;
      }
    });
    return count;
  }

  // start reading
    // t = title of a book, string
  startReading = (t) => {
    // When we start reading a book, we should set the `currentlyReading` property to point to it.
    // find the book on the bookshelf
    this.getBooks().forEach(element => {
      // compare the title and set the book
        if(element.getTitle()===t){
          this.setCurrentReading(element);
          return;
        }
    })
  }
  // end reading
     // t = title of a book, string
  finishReading = (t) => {
    /*When we finish reading a book, we should set `currentlyReading` back to `null`,
      and set `lastRead` to the book we just finished.*/
      
      // find the book on the bookshelf and set isRead
      this.getBooks().forEach(element => {
      // compare the title and set the book
        if(element.getTitle()===t){
          element.setIsRead(true);
        }
      })

    // modify the last reading and currently reading
      this.setLastReading(this.getCurrentlyReading());
      this.setCurrentReading(null);
  }


}

// Exercise 2.4
/*

In our BookList, we have properties to track:
- The last book we've read
- The book we're currently reading
- The next book up

We're not using these properties yet; they're always null.

Our new task is to make them functional. When we add our first book to the
list, `currentlyReading` should get set to it.

We need two new methods:

- startReading
- finishReading

Both of these methods will take a book title, as a string.

When we start reading a book, we should set the `currentlyReading` property to point to it.

When we finish reading a book, we should set `currentlyReading` back to `null`,
and set `lastRead` to the book we just finished.

Your goal is to add the methods and behaviour necessary so that the following
code runs well and produces the expected output.
*/

const homeLibrary = new BookList();

homeLibrary.add(new Book('The Shining', 'Horror', 'Stephen King'));
homeLibrary.add(new Book('American Gods', 'Fiction', 'Neil Gaiman'));
homeLibrary.add(
  new Book('Eloquent JavaScript', 'Programming', 'Marijn Haverbeke', true)
);
homeLibrary.add(new Book('The Eire Affair', 'Fantasy', 'Jasper Fforde'));
homeLibrary.add(
  new Book('The Revisionists', 'Science-fiction', 'thomas Mullen')
);

console.log('initial state', homeLibrary.currentlyReading); // should be The Shining book object
console.log('initial last-read', homeLibrary.lastRead); // should be null

homeLibrary.finishReading('The Shining');
console.log(
  'Currently reading, after finishing The Shining',
  homeLibrary.currentlyReading
); // should be null
console.log('Last-read, after finishing The Shining', homeLibrary.lastRead); // should be The Shining

homeLibrary.startReading('The Revisionists');
console.log(
  'Currentky reading, After starting The Revisionists',
  homeLibrary.currentlyReading
); // should be The Revisionists book
