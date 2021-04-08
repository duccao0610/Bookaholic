import { listenShelvesChanges } from "../models/user.js";
import { getDataFromDoc, getDataFromDocs } from "../utils.js"

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #all-shelves-container {
            width: 100%;
            flex-wrap: wrap;
            margin-top : 10px;
            margin-left: 50px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    </style>

    <div id="all-shelves-container">
    
    </div>
`;

export default class AllShelvesContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$allShelvesContainer = this.shadowRoot.getElementById("all-shelves-container");
    }

    static get observedAttributes() {
        return ['all-shelves'];
    }

    async attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'all-shelves') {
            let allShelves = JSON.parse(newValue);
            for (let shelf of allShelves) {
                let $shelfWrapper = document.createElement("shelf-wrapper");
                $shelfWrapper.setAttribute('shelf-name', shelf.shelfName);
                $shelfWrapper.setAttribute("books", JSON.stringify(shelf.booksOnShelf));
                $shelfWrapper.setAttribute("delete-book", "true");
                this.$allShelvesContainer.appendChild($shelfWrapper);
            }
        }
    }

    connectedCallback() {
        listenShelvesChanges(async (data) => {
            let allShelves = [];
            for (let shelf of data.shelves) {
                let bookData = [];
                for (let book of shelf.booksOnShelf) {
                    let data = await book.get();
                    bookData.push(data);
                }
                let books = getDataFromDocs(bookData);
                let shelfData = { booksOnShelf: books, shelfName: shelf.shelfName }
                allShelves.push(shelfData);
            }
            this.$allShelvesContainer.innerHTML = "";
            this.setAttribute("all-shelves", JSON.stringify(allShelves));
        })
    }
}


window.customElements.define("all-shelves-container", AllShelvesContainer);