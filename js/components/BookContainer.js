import { getCurrentUser, removeBookFromShelf } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/book-container.css">
    <div id="book-container">
        <div id="img-container">
            <img id="book-cover">
        </div>
        <p id="book-name">Ahihi</p>
        <button id="btn-del-book-from-shelf">⛔</button>
    </div>
`;

export default class BookContainer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$bookImg = this.shadowRoot.getElementById("book-cover");
        this.$bookName = this.shadowRoot.getElementById("book-name");
        this.$btnDelBookFromShelf = this.shadowRoot.getElementById("btn-del-book-from-shelf");
    };

    static get observedAttributes() {
        return ["src", "name", "id", "in-shelf-screen", "current-shelf"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case "src":
                this.$bookImg.src = newValue;
                break;
            case "name":
                this.$bookName.innerHTML = newValue;
                break;
            case "in-shelf-screen":
                if (newValue == "true") {
                    this.$btnDelBookFromShelf.style.display = "inline-block";
                }
        };
    };

    async connectedCallback() {
        this.$bookName.onclick = () => {
            sessionStorage.setItem("selected", this.id);
            router.navigate("/detail");
        }
        this.$btnDelBookFromShelf.onclick = async () => {
            let currentUser = await getCurrentUser();
            for (let shelf of currentUser.shelves) {
                if (this.getAttribute("current-shelf") == shelf.shelfName) {
                    for (let i = 0; i < shelf.booksOnShelf.length; i++) {
                        if (this.getAttribute("id") == shelf.booksOnShelf[i].id) {
                            shelf.booksOnShelf.splice(i, 1);
                            removeBookFromShelf(currentUser);
                            break;
                        }
                    }
                }
            }
        }
    };

};

window.customElements.define("book-container", BookContainer);
