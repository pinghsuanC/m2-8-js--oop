// get some important nodes
let h_node = getByTag("head")[0];
let b_node = getByTag("body")[0];
let m_node = getById("main");

// The book class and booklist class
// NOTE: there may be some modifications to adapt to this webpage
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
        
        // find the book on the bookshelf and set isRead to true
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
// ==================== Creat some books and a booklist ====================
// NOTE: All the books are retrieved form amazon.ca (because I am lazy)
// create some books that are already in the list


// ==================== html&css manipulation ====================



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