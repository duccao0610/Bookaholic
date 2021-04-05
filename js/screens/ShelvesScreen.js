import { createShelf, getCurrentUser, listenShelvesChanges } from "../models/user.js";
import { getDataFromDoc, getDataFromDocs } from "../utils.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/shelves-screen.css">
    <style>

    </style>

    <my-header></my-header>
    <form id="create-shelf-form">
        <button id="btn-create-shelf">Create a new shelf</button>
        <input id="input-new-shelf-name" placeholder="New shelf's name here">
    </form>
    <div id="shelves-container">

    </div>
    <my-footer></my-footer>
`;

export default class ShelvesScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$shelvesContainer = this.shadowRoot.getElementById('shelves-container');
        this.$createShelf = this.shadowRoot.getElementById('btn-create-shelf');
        this.$inputNewShelfName = this.shadowRoot.getElementById('input-new-shelf-name');
    }

    async connectedCallback() {
        let currentUser = await getCurrentUser();
        for (let shelf of currentUser.shelves) {
            let bookData = [];
            for (let book of shelf.booksOnShelf) {
                let data = await book.get();
                bookData.push(data);
            }
            let books = getDataFromDocs(bookData);

            let $shelfWrapper = document.createElement("shelf-wrapper");
            $shelfWrapper.setAttribute('shelf-name', shelf.shelfName);
            $shelfWrapper.setAttribute("books", JSON.stringify(books));
            this.$shelvesContainer.appendChild($shelfWrapper);
        }

        listenShelvesChanges(async (data) => {
            if (data.shelves.length > currentUser.shelves.length) {
                let $shelfWrapper = document.createElement("shelf-wrapper");
                $shelfWrapper.setAttribute('shelf-name', data.shelves[data.shelves.length - 1].shelfName);
                $shelfWrapper.setAttribute("books", JSON.stringify(data.shelves[data.shelves.length - 1].booksOnShelf));
                this.$shelvesContainer.appendChild($shelfWrapper);
            }
        })



        this.$createShelf.onclick = async (event) => {
            event.preventDefault();
            for (let shelf of currentUser.shelves) {
                if (this.$inputNewShelfName.value == shelf.shelfName) {
                    return alert("You already had this shelf");
                }
            }
            if (this.$inputNewShelfName.value != "") {
                let newShelf = {
                    booksOnShelf: [],
                    shelfName: this.$inputNewShelfName.value
                }

                createShelf(newShelf);

                this.$inputNewShelfName.value = "";
            }
        }
    }
}

window.customElements.define('shelves-screen', ShelvesScreen);