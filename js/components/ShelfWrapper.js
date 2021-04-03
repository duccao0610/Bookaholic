import { removeShelf } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        *{
            font-family: "Montserrat";
        }

        #book-list{            
            display: none;
            flex-wrap : wrap;
            justify-content: center;
            margin : 0 auto;
        }

        #btn-shelf {
            font-size: 25px;
            margin-left: 70px;
            background-color: white;
            border: none;
        }

        @media (max-width: 719px){
            #book-list {
                margin-top : 20px;
                flex-direction :column;
            }
        }

    </style>
    <div id="shelf-wrapper">
        <div id="btn-group">
            <button id="btn-shelf"></button>
            <button id="remove-shelf">❌</button>
        </div>
        <div id="book-list"></div>
    </div>
`;
export default class ShelfWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$btnShelf = this.shadowRoot.getElementById('btn-shelf');
        this.$shelfWrapper = this.shadowRoot.getElementById("shelf-wrapper");
        this.$bookList = this.shadowRoot.getElementById('book-list');
        this.$removeShelf = this.shadowRoot.getElementById('remove-shelf');
    }

    static get observedAttributes() {
        return ['shelf-name', "books"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'shelf-name') {
            this.$btnShelf.innerHTML = newValue;
        }
        if (attrName == "books") {
            let books = JSON.parse(newValue);
            for (let book of books) {
                let $bookContainer = document.createElement("book-container");
                $bookContainer.setAttribute("name", book.name);
                $bookContainer.setAttribute("src", book.cover_img);
                this.$bookList.appendChild($bookContainer);
            }
        }
    }

    connectedCallback() {
        this.$btnShelf.onclick = () => {
            if (this.$bookList.style.display == 'flex') {
                this.$bookList.style.display = 'none';
            } else {
                this.$bookList.style.display = 'flex';
            }
        }

        this.$removeShelf.onclick = () => {
            removeShelf(this.$btnShelf.innerHTML);
            this.$shelfWrapper.remove();
        }
    }


}

window.customElements.define('shelf-wrapper', ShelfWrapper);