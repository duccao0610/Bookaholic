import { book, listenBooksStatusChanges, viewBookDetail } from "../models/book.js";
import { getCurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    
    <link rel="stylesheet" href="./css/review-screen.css">

    <my-header></my-header>
    <search-form></search-form>
    <div id="review-screen">
        <book-info-wrapper id="book-info"></book-info-wrapper>
        <div id="reviews">

        </div>
        <review-form id="review-form"></review-form>
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
        this.$reviewForm = this.shadowRoot.getElementById("review-form");

    }

    async connectedCallback() {
        // get selected book
        let selectedBook = sessionStorage.getItem("selected");
        let book = await viewBookDetail(selectedBook);

        this.$bookInfo.setAttribute("book-title", book.name);
        this.$bookInfo.setAttribute("author", book.author);
        this.$bookInfo.setAttribute("intro", book.intro);
        this.$bookInfo.setAttribute("book-cover", book.cover_img);

        // hiện các reviews
        // let reviews = book.reviews;
        // for (let review of reviews) {
        //     let $review = document.createElement("review-wrapper");
        //     $review.setAttribute("comment", review.comment);
        //     $review.setAttribute("rating", review.rating);
        //     $review.setAttribute("username", review.username);
        //     this.$reviewList.appendChild($review);
        // }

        listenBooksStatusChanges(async (data) => {
            // hiện các reviews
            for (let review of data.reviews) {
                let $review = document.createElement("review-wrapper");
                $review.setAttribute("comment", review.comment);
                $review.setAttribute("rating", review.rating);
                $review.setAttribute("username", review.username);
                $review.setAttribute("review-date", review.date);
                this.$reviewList.appendChild($review);
            }

            // ẩn dòng review-form nếu user đã từng review
            let currentUser = await getCurrentUser();
            for (let i = 0; i < data.reviews.length; i++) {
                if (data.reviews[i].username == currentUser.name) {
                    this.$reviewForm.setAttribute("hidden", "true");
                    break;
                }
            }
        });

        sessionStorage.setItem('current-view-book-author', book.author);
    }
}

window.customElements.define('review-screen', ReviewScreen);
