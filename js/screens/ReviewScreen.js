import { book } from "../models/book.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <style>
        #reviews{
            display :flex;
            flex-direction : column;
            justify-content : space-between;
            margin : auto;
            width : 50%;
            margin-top : 10vh;
        }
    </style>
    <my-header></my-header>
    <book-info-wrapper id="book-info"></book-info-wrapper>
    <div id="reviews">

    </div>
    <my-footer></my-footer>
`;

export default class ReviewScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$bookInfo = this.shadowRoot.getElementById("book-info");
        this.$reviewList = this.shadowRoot.getElementById("reviews");

    }

    connectedCallback() {
        this.$bookInfo.setAttribute("book-title", book.name);
        this.$bookInfo.setAttribute("author", book.author);
        this.$bookInfo.setAttribute("intro", book.intro);
        this.$bookInfo.setAttribute("book-cover", book.cover_img);

        let reviews = book.reviews;
        for (let review of reviews) {
            let $review = document.createElement("review-wrapper");
            $review.setAttribute("comment", review.comment);
            $review.setAttribute("rating", review.rating);
            $review.setAttribute("username", review.username);
            this.$reviewList.appendChild($review);
        }
    }


}

window.customElements.define('review-screen', ReviewScreen);
