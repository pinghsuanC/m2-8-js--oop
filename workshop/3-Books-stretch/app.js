/* NOTE: The question didn't specify how the system works, e.g. is the book read by sequence?
            So I made the assumption that the person will only add booklist once oneself
            finish reading the last one. That is the person won't start a new book unless finish
            the previous one.
*/

// get some important nodes
const h_node = getByTag("head")[0];
const b_node = getByTag("body")[0];
const m_node = getById("main");
// other wrapper nodes
const book_container = getByClass("container-book")[0];
const form_container = getByClass("container-form-info")[0];
const form_node = getByTag("form")[0];
const book_info_node = getByClass("book-info-txt")[0];
let BOOK_DICTIONARY = {};       // referencing the book and the html node

IMG_DEFAULT_PATH = "./asset/default_book.jpeg";
SUCCESS_ADD_MSG = "Successfully added a book!";

// The book class and booklist class
// NOTE: there may be some modifications to adapt to this webpage
class Book {
    // attributes
    title=undefined;
    genre=undefined;
    author=undefined;
    isRead=false;
    startDate=undefined;
    endDate=undefined;

    // getters
    getIsRead(){
        return this.isRead;
    }
    getTitle(){
        return this.title;
    }
    getGenre(){
        return this.genre;
    }
    getIsRead(){
        return this.isRead;
    }
    getAuthor(){
        return this.author;
    }
    getStartDate(){
        if(this.startDate!=undefined){
            return this.startDate;
        }else{
            return "The date is unknown";
        }
    }
    getEndDate(){
        if(this.endDate!=undefined){
            return this.endDate;
        }else{
            return "The date is unknown";
        }
    }

    // setters
    setIsRead(boo){
        this.isRead=true;
    }
    setStartDate(date_input){
        this.startDate=date_input;
    }
    setEndDate(date_input){
        this.endDate=date_input;
    }

    // constructor
    constructor(title, genre, author, isRead){
        this.title=title;
        this.genre=genre;
        this.author=author;
        if(isRead===true){
            this.setIsRead(true);
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
    getLastRead(){
        return this.lastRead;
    }
    // get all the book titles in the booklist
    getBookTitles(){
        let l = [];
        this.books.forEach(element => {
            l.push(element.getTitle());
        });
        return l;
    }

    // setter
    setCurrentReading(b){
        if(b==null){
        this.currentlyReading = b;
        return;
        }
        if(!b.getIsRead()){     // allow null, and when it's not read
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
            return true;
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
                // set current reading for booklist
                this.setCurrentReading(element);
                // set starting date for book
                let date_start = new Date();
                element.setStartDate(date_start.getFullYear()+"-"+(date_start.getMonth()+1)+"-"+date_start.getDate());
            }
        })
    }
    // end reading
        // t = title of a book, string
    finishReading = (t) => {
        /*When we finish reading a book, we should set `currentlyReading` back to `null`,
        and set `lastRead` to the book we just finished.*/
        
        // find the book on the bookshelf and set isRead to true
        this.getBooks().forEach(element => {
        // compare the title and set the book
            if(element.getTitle()===t){
                // set it to isRead=true
                element.setIsRead(true);
                // set ending date for a book
                let date_end = new Date();
                element.setEndDate(date_end.getFullYear()+"-"+(date_end.getMonth()+1)+"-"+ date_end.getDate());
            }
        })

        // modify the last reading and currently reading
        this.setLastReading(this.getCurrentlyReading());
        this.setCurrentReading(null);
    }
}
// ==================== Creat some books and a booklist ====================
// NOTE: All the books are retrieved form amazon.ca (because I am lazy)
// create some books that are already in the list
let book1 = new Book("Red Rising (Red Rising Series Book 1)", "fiction", "Pierce Brown", true);
let book2 = new Book("How to Read a Book", "criticism", "Mortimer J.Adler, Charles Van Doren", false);
let book3 = new Book("Books: A Living History", "history", "Martye Lyons", true);
let book4 = new Book("Books: A Living History 2", "history", "Martye Lyons", false);


let BookL = new BookList();

scheduleAddBook(BookL, book1, "https://images-na.ssl-images-amazon.com/images/I/71k2OJhI9AL.jpg");
scheduleAddBook(BookL, book2, "https://images-na.ssl-images-amazon.com/images/I/713sKWdmp7L.jpg");
scheduleAddBook(BookL, book3, "https://images-na.ssl-images-amazon.com/images/I/51ETl6bW+5L.jpg");
scheduleAddBook(BookL, book4, undefined);

scheduleStartReading(book1);
scheduleStartReading(book2);
scheduleStartReading(book2);
scheduleEndReading(book2);
scheduleStartReading(book3);            // book3 is already read so no reflection, and dates unknown
scheduleEndReading(book3);
scheduleStartReading(book4);


// ==================== event listener for submit ====================
form_node.addEventListener("submit", function(event){
    event.preventDefault(); // prevent default behavior of form
    // get all the inputs
    let form_inputs = getByTag("input");

    // check if you've got the book inside or not
        // in reality, there may be same titly by different authors
        // :) just leave it for now because I am lazy
    if(isInBooklist(BookL, form_inputs[0].value)){
        alert("You've already have this book in your list!");
        return;
    }
    // == Create a book with inputs ==
    // get the isRead property => 4th and 5th
    let isRead_input = false;
    if(form_inputs[4].checked){ // if 4th is checked, then they selected yes
        isRead_input = true;
    }
    let book_input = new Book(`${form_inputs[0].value}`, `${form_inputs[1].value}`, `${form_inputs[2].value}`, isRead_input);
    scheduleAddBook(BookL, book_input, form_inputs[3].value);
    
    // end reading and start reading
    // end reading the curReading
    scheduleEndReading(BookL.getCurrentlyReading());
    scheduleStartReading(book_input);

    // Reset the form
    clearForm();
})

// ==================== functions for this workshop ====================
// function to update start reading
function scheduleStartReading(book_input){
    if(!book_input.getIsRead()){                // when it's not read, it will be sure to pass to book
        let book_title = book_input.getTitle();
        // add property to the booklist
        BookL.startReading(book_title);
    
        // reflection on the html current reading
        let nodes_cur = getById("cur-read-book").children;
        // 0 = img, 1 = title
        nodes_cur[0].src = BOOK_DICTIONARY[book_title][2].src;
        nodes_cur[0].onerror = function(){
            nodes_cur[0].src = IMG_DEFAULT_PATH;
        }
        nodes_cur[1].innerHTML = book_title;
    }
}
// function to update end reading
function scheduleEndReading(book_input){

    if(!book_input.getIsRead()){                // when it's not read
        let book_title = book_input.getTitle();
        // add property to the booklist
        BookL.finishReading(book_title);
    
        // reflection on the html last reading
        let nodes_cur = getById("last-read-book").children;
        // 0 = img, 1 = title
        nodes_cur[0].src = BOOK_DICTIONARY[book_title][2].src;
        nodes_cur[0].onerror = function(){
            nodes_cur[0].src = IMG_DEFAULT_PATH;
        }
        nodes_cur[1].innerHTML = book_title;
    }
    
}
// function to clear up form
function clearForm(){
    form_node.reset();
}
// function to check if book is in the booklist
function isInBooklist(booklist_obj, title_input){
    let k = false;
    (booklist_obj.getBookTitles()).forEach(element => {
        if(title_input===element){
            k=true;
        }
    });
    return k;
}
// add firstly to booklist object
//      secondly to html element
            //scheduleAddBook(BookL, book1);
            //scheduleAddBook(BookL, book3, "https://images-na.ssl-images-amazon.com/images/I/51ETl6bW+5L.jpg");
function scheduleAddBook(booklist_obj, book_obj, img_link){
    // add to booklist
    let r_1 = booklist_obj.add(book_obj);
    // create html object
    let r_2 = addBookHTML(book_obj, img_link);

    if(r_1 && r_2){ // if both are true (success)
        console.log(SUCCESS_ADD_MSG);
    }
}
function addBookHTML(book, img_link){
    let inner = createNewNode("DIV", undefined, book_container, "book-inner");
    let img_inner = createImgNode(IMG_DEFAULT_PATH, undefined, inner, "book-obj-img");
    if(img_link!==undefined){
        img_inner.src = img_link;
    }
    // get not-found error
    img_inner.onerror = function(){
        img_inner.src = IMG_DEFAULT_PATH;
    }
    let title_inner = createNewNode("DIV", book.getTitle(), inner, "book-obj-title");

    // add event listener to inner container: show info when mouse over
    let createInfoDisplay = function(){
        // get the positions to display
        let info_list = getByClass("book-info-input");
        //title
        info_list[0].innerHTML = book.getTitle();
        // gebre
        info_list[1].innerHTML = book.getGenre();
        // author
        info_list[2].innerHTML = book.getAuthor();
        // isread
        info_list[3].innerHTML = book.getIsRead();
        // start date
        info_list[4].innerHTML = book.getStartDate();
        // end date
        info_list[5].innerHTML = book.getEndDate();
    }
    let removeInfoDisplay = function(){
        // get the positions to remove display
        let info_list = getByClass("book-info-input");
        for(var k = 0; k<info_list.length; k++){
            info_list[k].innerHTML = "";
        }
    }

    // mouse over
    inner.addEventListener("mouseover", createInfoDisplay);
    inner.addEventListener("mouseleave", removeInfoDisplay);
    // push the elements to the dictionary we created in case we need reference later
    BOOK_DICTIONARY[book.getTitle()] = [];
    BOOK_DICTIONARY[book.getTitle()].push(book);
    BOOK_DICTIONARY[book.getTitle()].push(inner);
    BOOK_DICTIONARY[book.getTitle()].push(img_inner);
    BOOK_DICTIONARY[book.getTitle()].push(title_inner);

    return true;
}
function getInput(input_ele){
    return input_ele.value;
}


// ==================== functions to use ====================
// I wrote these for a previous workshop so I just copy-pasted.
// and I added a few more
// NOTE: I wrote these assuming that the inputs will hit a target, therefore only type checking and no exception handling.
function getByTag(tagName){
    if(typeof(tagName)!=="string"){
        alert("Not correct tag name!");
    }   

    // return the node
    return document.getElementsByTagName(tagName.toUpperCase());
}
function getById(id){
    if(typeof(id)!=="string"){
        alert("Not correct id!");
    }   

    // return the node
    return document.getElementById(id);
}
function getByClass(className){
    if(typeof(className)!=="string"){
        alert("Not correct class!");
    }   

    // return the node, or an array of node depending on the items
    return document.getElementsByClassName(className);
}


function createNewNode(type, text, parent, className){
    // checking input
    if(typeof(type)!=="string"){
    alert("NOT VALID TYPE!!!");
    }

    // create basic element
    let ele = document.createElement(type);

    // handle inner text
    let t = "";
    if(text!==undefined){
        t_node = document.createTextNode(text);
        ele.appendChild(t_node);
    }

    // handle parent
    if(parent!==undefined){
        parent.appendChild(ele);
    }

    // handle className
    if(className!==undefined){
        ele.classList.add(className);
    }

    // return the element if needed.
    return ele; 
}
function createImgNode(img_link, alt_text, parent, className){
    let image = createNewNode("img", undefined, parent, className)

    // handle src link
    if(img_link!==undefined){
    image.src = img_link;       // the src link
    }
    // handle alt text
    if(alt_text!==undefined){
    image.alt=alt_text;     // the alt property
    }

    // return image node if needed
    return image;  
}
function createAnchorNode(href_input, text, parent, className){
    let a_node = createNewNode("A", text, parent, className);

    // handle href
    if(href_input!==undefined){
    a_node.href = href_input;
    }

    // return anchor node if needed
    return a_node;
}
function createStyleNode(href_input, text, parent){
    let style_node = createNewNode("link", text, parent, undefined);

    //handle rel
    style_node.rel = "stylesheet";

    // handle href
    if(href_input!==undefined){
        style_node.href = href_input;
    }

    // return node if needed
    return style_node;
}
function createLinkNode(href_input, text, parent, className){
    let link_node = createNewNode("link", text, parent, className);

    // handle href
    if(href_input!==undefined){
        link_node.href = href_input;
    }

    // return node if needed
    return link_node;
}
function createScriptNode(src_input, type, parent){
    let script_node = createNewNode("script", undefined, parent, undefined);

    // handle type
    if(type!==undefined){
    script_node.type=type;
    }
    // handle href
    if(src_input!==undefined){
    script_node.href = src_input;
    }

    // return node if needed
    return style_node;
}