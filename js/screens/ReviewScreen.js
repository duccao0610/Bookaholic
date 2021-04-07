import { listenBookInfoChanges, viewBookDetail } from "../models/book.js";
import { getCurrentUser, getBookOwners } from "../models/user.js";

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
        let selectedBookId = sessionStorage.getItem("selected");
        let book = await viewBookDetail(selectedBookId);

        // let owners = await getBookOwners(selectedBookId);
        // console.log(typeof owners);
        // for (let owner of owners) {
        //     console.log(owner.name);
        // }
        // this.$ownerList.setAttribute("owners", JSON.stringify(owners));
        // console.log(this.$ownerList);

        // hiện thông tin book
        this.$bookInfo.setAttribute("book-title", book.name);
        this.$bookInfo.setAttribute("author", book.author);
        this.$bookInfo.setAttribute("intro", book.intro);
        this.$bookInfo.setAttribute("book-cover", book.cover_img);

        let currentUser = await getCurrentUser();
        this.$bookInfo.setAttribute("shelves", JSON.stringify(currentUser.shelves));

        // hiện review lần load đầu tiên
        let reviews = book.reviews;
        for (let review of reviews) {
            let $review = document.createElement("review-wrapper");
            $review.setAttribute("comment", review.comment);
            $review.setAttribute("rating", review.rating);
            $review.setAttribute("username", review.username);
            $review.setAttribute("review-date", review.date);
            if (review.username == currentUser.name) {
                $review.style.background = "red";
            }
            this.$reviewList.appendChild($review);
        }

        listenBookInfoChanges(async (data) => {
            // hiện các review mới thêm
            for (let i = reviews.length; i < data.reviews.length; i++) {
                let $review = document.createElement("review-wrapper");
                $review.setAttribute("comment", data.reviews[i].comment);
                $review.setAttribute("rating", data.reviews[i].rating);
                $review.setAttribute("username", data.reviews[i].username);
                $review.setAttribute("review-date", data.reviews[i].date);
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

            // thay đổi trạng thái
            if (data.owners.length == 0) {
                this.$bookInfo.setAttribute("status", "unavailable");
            } else {
                this.$bookInfo.setAttribute("status", "available");
            }
        });

    }
}

window.customElements.define('review-screen', ReviewScreen);
