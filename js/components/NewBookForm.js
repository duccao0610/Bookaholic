import { required } from "../utils.js";
import { addBook } from "../models/book.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #container #new-book-form {
            display :flex;
            flex-direction :column;
            justify-content:center;
            align-items:center;
            border : 1px solid black;
            border-radius : 10px;
            background :black;
            width:fit-content;
            padding :50px;
        }
        #container h3 {
            text-transform: uppercase;
            color: white;
        }
        #container #btn-submit {
            margin-top : 10px;
            padding: 10px;
            border-radius : 5px;
        }

        #container #btn-close {
            position :absolute;
            top : 10px;
            right : 10px;
        }

    </style>
    <div id="container">
        <form id='new-book-form'>
            <h3>Submit a book to Bookaholic's Community</h3>
            <input-wrapper id= "name" placeholder= "book's name"></input-wrapper>
            <input-wrapper id= "author" placeholder= "author"></input-wrapper>
            <input-wrapper id= "categories" placeholder= "(novel,fantasy,..)"></input-wrapper>
            <input-wrapper id= "intro" placeholder= "intro"></input-wrapper>
            <input-wrapper id= "cover_img" placeholder= "book's cover URL"></input-wrapper>
            <input-wrapper id= "publish_day" placeholder= "book's publish day"></input-wrapper>
            <button id="btn-submit">Submit</button>
            <button id="btn-close">X</button>
        </form>
    </div>
`;

export default class NewBookForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$btnSubmit = this.shadowRoot.getElementById("btn-submit");
        this.$btnClose = this.shadowRoot.getElementById("btn-close");

        this.$bookName = this.shadowRoot.getElementById("name");
        this.$author = this.shadowRoot.getElementById("author");
        this.$categories = this.shadowRoot.getElementById("categories");
        this.$coverImg = this.shadowRoot.getElementById("cover_img");
        this.$publish_day = this.shadowRoot.getElementById("publish_day");
    };

    connectedCallback() {
        this.$btnSubmit.onclick = (event) => {
            event.preventDefault();
            let newBook = {
                name: this.$bookName.value,
                author: this.$author.value,
                categories: this.$categories.value.split(","),
                cover_img: this.$coverImg.value,
                publish_day: this.$publish_day.value
            };

            let isPassed =
                this.$bookName.validate(required, "Not leave this field empty") &
                this.$author.validate(required, "Not leave this field empty") &
                this.$categories.validate(required, "Not leave this field empty") &
                this.$coverImg.validate(required, "Not leave this field empty") &
                this.$publish_day.validate(required, "Not leave this field empty")

            if (isPassed) {
                addBook(newBook);
                alert("Submit a new book success");
            }
        }

        this.$btnClose.onclick = (event) => {
            event.preventDefault();
            this.style.display = "none";
        }
    }

};

window.customElements.define("new-book-form", NewBookForm);