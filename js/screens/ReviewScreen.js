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

        let currentUser = await getCurrentUser();

        this.$bookInfo.setAttribute("shelves", JSON.stringify(currentUser.shelves));

        let reviews = book.reviews;
        if (book.reviews == undefined) {
            await firebase.firestore()
                .collection("books")
                .doc(book.id)
                .update({
                    reviews: []
                });
        }
        for (let review of reviews) {
            let $review = document.createElement("review-wrapper");
            $review.setAttribute("comment", review.comment);
            $review.setAttribute("rating", review.rating);
            $review.setAttribute("username", review.username);
            if (review.username == currentUser.name) {
                $review.style.background = "red";
            }
            this.$reviewList.appendChild($review);
        }

        listenBooksStatusChanges(async (data) => {
            // hiện các reviews
            for (let i = reviews.length; i < data.reviews.length; i++) {
                let $review = document.createElement("review-wrapper");
                $review.setAttribute("comment", data.reviews[i].comment);
                $review.setAttribute("rating", data.reviews[i].rating);
                $review.setAttribute("username", data.reviews[i].username);
                if (data.reviews[i].username == currentUser.name) {
                    $review.style.background = "red";
                }
                this.$reviewList.prepend($review);
            }
            this.$reviewForm.setAttribute('did-review', 'false');

            // ẩn dòng review-form nếu user đã từng review
            for (let i = 0; i < data.reviews.length; i++) {
                if (data.reviews[i].username == currentUser.name) {
                    this.$reviewForm.setAttribute('did-review', 'true');
                    break;
                }
            }
        });

    }
}

window.customElements.define('review-screen', ReviewScreen);
