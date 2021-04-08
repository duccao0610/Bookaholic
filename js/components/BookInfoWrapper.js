import { addBookToShelves, getCurrentUser, turnOffLending, turnOnLending, getBookOwners } from "../models/user.js";
import { getAllBookRefId, viewBookDetail, listenBookInfoChanges } from "../models/book.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/book-info-wrapper.css">
    <div id="book-info-wrapper">
        <img id="book-cover" src="">
        <div id="aside-right">
            <h2 id="book-title">Book's title</h2>
            <p id="author">Author</p>
            <div id="status-container">
                <i class="fas fa-circle"></i>
                <h4 id="status">Status</h4>
            </div>
            <p id="intro"></p>            
            <div id="button-group">
                <div id="switch-container">
                    <p>Lend this book?</p>
                    <input type="checkbox" id="switch" /><label id="slider" for="switch"></label>
                </div>
                <div id="btn-add-container">
                    <button id="button-add">Add to bookshelf</button>
                    <form id="add-book-form">
                        <button id="accept-add" type="submit">Save</button>
                    </form>
                </div>
                <button id="button-find-book">Find book</button>
                <owner-list id="owner-list"></owner-list>
            </div>
        </div>
    </div>
`;

export default class BookInfoWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$bookCover = this.shadowRoot.getElementById('book-cover');
        this.$bookTitle = this.shadowRoot.getElementById('book-title');
        this.$author = this.shadowRoot.getElementById('author');
        this.$statusContainer = this.shadowRoot.getElementById('status-container');
        this.$status = this.shadowRoot.getElementById('status');
        this.$intro = this.shadowRoot.getElementById('intro');

        this.$bookInfoWrapper = this.shadowRoot.getElementById('book-info-wrapper');
        this.$addBookForm = this.shadowRoot.getElementById('add-book-form');
        this.$btnGroup = this.shadowRoot.getElementById('button-group');
        this.$btnAdd = this.shadowRoot.getElementById('button-add');
        this.$btnAccept = this.shadowRoot.getElementById("accept-add");
        this.$lendSwitch = this.shadowRoot.getElementById("switch");

        this.$ownerList = this.shadowRoot.getElementById("owner-list");
        this.$btnFind = this.shadowRoot.getElementById("button-find-book");

    }

    static get observedAttributes() {
        return ['book-cover', 'book-title', 'author', 'status', 'intro', 'shelves', 'book-info'];
    }

    async attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'book-info':
                let bookInfo = JSON.parse(newValue);
                this.$bookCover.setAttribute('src', bookInfo.cover_img);
                this.$bookTitle.innerHTML = bookInfo.name;
                this.$author.innerHTML = bookInfo.author;
                this.$intro.innerHTML = bookInfo.intro;
                break;
            case 'status':
                if (newValue == "avalable") {
                    this.$status.innerHTML = "Available";
                    this.$statusContainer.style.color = "Green";
                }
                if (newValue == "unavailable") {
                    this.$status.innerHTML = "Unavailable";
                    this.$statusContainer.style.color = "Red";
                }
                break;
            case 'shelves':
                let bookId = sessionStorage.getItem('selected'); // setItem ở CategoryContainer
                let currentViewingBook = await viewBookDetail(bookId);

                let currentUser = await getCurrentUser();
                for (let shelf of currentUser.shelves) {
                    let $input = document.createElement('input');
                    Object.assign($input, {
                        type: 'checkbox',
                        name: shelf.shelfName,
                        value: shelf.shelfName
                    });
                    $input.classList.add("shelf-checkbox");
                    let allBookRefId = getAllBookRefId(shelf.booksOnShelf);
                    if (allBookRefId.includes(currentViewingBook.id)) {
                        Object.assign($input, {
                            checked: true,
                            disabled: true
                        });
                    }

                    this.$addBookForm.insertBefore($input, this.$btnAccept);

                    let $label = document.createElement('label');
                    $label.setAttribute('for', shelf.shelfName);
                    $label.innerHTML = shelf.shelfName;
                    this.$addBookForm.insertBefore($label, this.$btnAccept);

                    let $br = document.createElement('br');
                    this.$addBookForm.insertBefore($br, this.$btnAccept);
                }
                break;
        }
    }

    async connectedCallback() {
        let currentUser = await getCurrentUser();
        let bookId = sessionStorage.getItem('selected');
        let currentViewingBook = await viewBookDetail(bookId);

        listenBookInfoChanges(async (data) => {
            let owners = await getBookOwners(data.id);
            this.$ownerList.setAttribute("owners", JSON.stringify(owners));
            this.$btnFind.onclick = (event) => {
                event.preventDefault();
                if (data.owners.length == 0) {
                    alert("Nobody owns this book");
                } else if (data.owners.length == 1 && data.owners[0] == currentUser.id) {
                    alert("Only you own this book.");
                } else {
                    this.$ownerList.style.display = "block";
                }
            }

            // thay đổi trạng thái available
            if (data.owners.length == 0) {
                this.setAttribute("status", "unavailable");
            } else {
                this.setAttribute("status", "available");
            }
        });

        // bấm hiển thị shelves để thêm book
        this.$btnAdd.onclick = () => {
            if (this.$addBookForm.style.display == 'inline-block') {
                this.$addBookForm.style.display = 'none';
            } else {
                this.$addBookForm.style.display = 'inline-block';
            }
        }
        // xác nhận thêm book vào shelf
        this.$btnAccept.onclick = async (event) => {
            event.preventDefault();

            let updatedShelves = [];
            let checkboxes = this.$addBookForm.querySelectorAll('input.shelf-checkbox[type="checkbox"]:checked');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].disabled == false) {
                    updatedShelves.push(checkboxes[i].value);
                    checkboxes[i].disabled = true;
                }
            }
            addBookToShelves(currentUser, updatedShelves, bookId);
        }
        if (currentViewingBook.owners.includes(currentUser.id)) {
            this.$lendSwitch.checked = true;
        }

        this.$lendSwitch.onclick = () => {
            if (this.$lendSwitch.checked == true) turnOnLending(currentUser, bookId);
            if (this.$lendSwitch.checked == false) turnOffLending(currentUser, bookId, currentViewingBook);
        }
    }
}

window.customElements.define('book-info-wrapper', BookInfoWrapper);