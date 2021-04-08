import { listenBookInfoChanges, viewBookDetail } from "../models/book.js";
import { getCurrentUser, getBookOwners } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    
    <link rel="stylesheet" href="./css/review-screen.css">
    <my-header></my-header>
    <search-form></search-form>
    <div id="review-screen">
        <book-info-wrapper id="book-info"></book-info-wrapper>
        <all-reviews-container id="all-reviews-container"></all-reviews-container>
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

        this.$allReviewsContainer = this.shadowRoot.getElementById("all-reviews-container");
    }

    async connectedCallback() {

        // get selected book
        let selectedBookId = sessionStorage.getItem("selected");
        let book = await viewBookDetail(selectedBookId);

        // hiện thông tin book
        this.$bookInfo.setAttribute("book-info", JSON.stringify(book));

        // hiện shelves để tick
        let currentUser = await getCurrentUser();
        this.$bookInfo.setAttribute("shelves", JSON.stringify(currentUser.shelves));

        // hiện review lần load đầu tiên
        this.$allReviewsContainer.setAttribute("all-reviews", JSON.stringify(book.reviews));

        listenBookInfoChanges(async (data) => {

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
