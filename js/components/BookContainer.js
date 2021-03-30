import { viewBookDetail } from "../models/book.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/book-container.css">
    <div id="book-container">
        <div id="img-container">
            <img id="book-cover">
        </div>
        <p id="book-name">Ahihi</p>
    </div>
`;

export default class BookContainer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$bookImg = this.shadowRoot.getElementById("book-cover");
        this.$bookName = this.shadowRoot.getElementById("book-name");
    };

    static get observedAttributes() {
        return ["src", "name"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case "src":
                this.$bookImg.src = newValue;
                break;
            case "name":
                this.$bookName.innerHTML = newValue;
                break;
        };
    };

    connectedCallback() {
        let name = this.$bookName.innerHTML;
        this.$bookName.onclick = () => {
            sessionStorage.setItem("selected", name);
            console.log(name);
            router.navigate("/detail");
        }
    }

};

window.customElements.define("book-container", BookContainer);
