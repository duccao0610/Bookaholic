import { addBookToShelves, getCurrentUser } from "../models/user.js";
import { getAllBookRefId, viewBookDetail } from "../models/book.js";
import { getDataFromDocs, getDataFromDoc } from "../utils.js";

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
            <p id="intro">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, inventore iste ex veritatis ea porro saepe voluptate laborum eos! Veritatis a similique nobis atque doloribus dolorem voluptatum soluta quos. Corrupti?</p>            
            <div id="button-group">
                <div id="btn-add-container">
                    <button id="button-add">Add to bookshelf</button>
                    <form id="add-book-form">
                        <button id="accept-add" type="submit">Ok</button>
                    </form>
                </div>
                <button id="button-find-book">Find book</button>
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
    }

    static get observedAttributes() {
        return ['book-cover', 'book-title', 'author', 'status', 'intro', 'shelves'];
    }

    async attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'book-cover':
                this.$bookCover.setAttribute('src', newValue);
                break;
            case 'book-title':
                this.$bookTitle.innerHTML = newValue;
                break;
            case 'author':
                this.$author.innerHTML = newValue;
                break;
            case 'status':
                if (newValue == 'available') {
                    this.$statusContainer.style.color = '#1CE949';
                    this.$status.innerHTML = 'Available';
                } else {
                    this.$statusContainer.style.color = '#e9271c';
                    this.$status.innerHTML = 'Unavailable';
                }
                break;
            case 'intro':
                this.$intro.innerHTML = newValue;
                break;
            case 'shelves':
                // let shelves = JSON.parse(newValue);

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
        }
    }

    connectedCallback() {
        this.$btnAdd.onclick = () => {
            if (this.$addBookForm.style.display == 'inline-block') {
                this.$addBookForm.style.display = 'none';
            } else {
                this.$addBookForm.style.display = 'inline-block';
            }
        }
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
            sessionStorage.setItem('updatedShelves', updatedShelves);
            addBookToShelves();
        }
    }
}

window.customElements.define('book-info-wrapper', BookInfoWrapper);