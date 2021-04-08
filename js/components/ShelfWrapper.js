import { removeShelf } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        *{
            font-family: "Montserrat";
        }

        #shelf-wrapper {
            margin-top: 5px;
        }

        #book-list{            
            display: none;
            flex-wrap : wrap;
            justify-content: center;
            margin : 0 auto;
        }

        #btn-shelf {
            font-size: 20px;
            margin-left: 70px;
            background-color: white;
            border: none;
            cursor: pointer;
            border: solid 1px;
            border-radius: 5px;
            padding: 5px;
        }

        #btn-shelf:hover{
            text-decoration: underline;
        }

        #btn-shelf:focus, #remove-shelf:focus {
            outline: none;
        }

        #remove-shelf {
            font-size: 20px;
            background: none;
            border: none;
            cursor: pointer;
        }

        button:active {
            transform: translateY(4px);
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
            <button id="remove-shelf">⛔</button>
        </div>
        <button id="btn-check" style="display: none">Check delete</button>
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
        this.$btnCheck = this.shadowRoot.getElementById("btn-check");
    }

    static get observedAttributes() {
        return ['shelf-name', "books", "is-deleted"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'shelf-name') {
            this.$btnShelf.innerHTML = newValue;
        }
        if (attrName == "books") {
            let books = JSON.parse(newValue);
            for (let book of books) {
                let $bookContainer = document.createElement("book-container");
                $bookContainer.setAttribute("id", book.id);
                $bookContainer.setAttribute("name", book.name);
                $bookContainer.setAttribute("src", book.cover_img);
                this.$bookList.appendChild($bookContainer);
            }
        }
        if (attrName == 'is-deleted') {
            if (newValue == 'true') {
                removeShelf(this.$btnShelf.innerHTML);
                this.$shelfWrapper.remove();
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
            // removeShelf(this.$btnShelf.innerHTML);
            // this.$shelfWrapper.remove();
            this.$btnCheck.style.display = "block";
        }
        this.$btnCheck.onclick = () => {
            this.setAttribute("is-deleted", "true");
        }
    }


}

window.customElements.define('shelf-wrapper', ShelfWrapper);