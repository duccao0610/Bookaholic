import { book } from "../models/book.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <my-header></my-header>
    <book-info-wrapper id="book-info"></book-info-wrapper>
    <my-footer></my-footer>
`;

export default class ReviewScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$bookInfo = this.shadowRoot.getElementById("book-info");

    }

    connectedCallback() {
        this.$bookInfo.setAttribute("book-title", book.name);
        this.$bookInfo.setAttribute("author", book.author);
        this.$bookInfo.setAttribute("intro", book.intro);
        this.$bookInfo.setAttribute("book-cover", book.cover_img);
    }



}

window.customElements.define('review-screen', ReviewScreen);
