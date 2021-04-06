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
            background: linear-gradient(to left, #a17e7e, #491B1B);
            width:fit-content;
            padding :30px;
            position : relative;
        }
        #container h3 {
            text-transform: uppercase;
        }
        #container #btn-submit {
            font-weight :15px;
            margin-top : 10px;
            padding: 10px;
            border-radius : 5px;
            background : linear-gradient(to left,#525252,#3D72B4);
        }
        #container #btn-submit:hover{
            background : linear-gradient(to right,#525252,#3D72B4);
        }

        #container #btn-close {
            border-radius : 5px;
            position :absolute;
            top : 20px;
            right : 10px;
        }

        @media (max-width: 719px){
            #container h3 {
                font-size : 15px;
                text-align :center;
            }
        }
    </style>
    <div id="container">
        <form id='new-book-form'>
            <h3>Submit a book to Bookaholic's Community</h3>
            <input-wrapper id= "name" placeholder= "book's name" class="item"></input-wrapper>
            <input-wrapper id= "author" placeholder= "author" class="item"></input-wrapper>
            <input-wrapper id= "categories" placeholder= "(novel,fantasy,..)" class="item"></input-wrapper>
            <input-wrapper id= "intro" placeholder= "intro" class="item"></input-wrapper>
            <input-wrapper id= "cover_img" placeholder= "book's cover URL" class="item"></input-wrapper>
            <input-wrapper id= "publish_day" placeholder= "book's publish day" class="item"></input-wrapper>
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
        this.$intro = this.shadowRoot.getElementById("intro");
    };

    connectedCallback() {
        this.$btnSubmit.onclick = (event) => {
            event.preventDefault();
            let newBook = {
                name: this.$bookName.value,
                author: this.$author.value,
                categories: this.$categories.value.split(","),
                cover_img: this.$coverImg.value,
                publish_day: this.$publish_day.value,
                intro: this.$intro.value
            };

            let isPassed =
                this.$bookName.validate(required, "Not leave this field empty") &
                this.$author.validate(required, "Not leave this field empty") &
                this.$categories.validate(required, "Not leave this field empty") &
                this.$coverImg.validate(required, "Not leave this field empty") &
                this.$publish_day.validate(required, "Not leave this field empty") &
                this.$intro.validate(required, "Not leave this field empty")

            if (isPassed) {
                addBook(newBook);
                alert("Submit a new book success");
                this.style.display = "none";
            }
        }

        this.$btnClose.onclick = (event) => {
            event.preventDefault();
            this.style.display = "none";
        }
    }
};

window.customElements.define("new-book-form", NewBookForm);