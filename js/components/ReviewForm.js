import { addReview, editReview } from "../models/book.js";
import { getCurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/review-form.css">
    <link rel="stylesheet" href="https://i.icomoon.io/public/temp/5cef4fb803/staricon/style.css">
    <link rel="stylesheet" href="./css/star-rating.css">

    <form id="review-form">
        <div id="input-container">
            <textarea id="input-review" form="review-form" placeholder="Write your review here..."></textarea>
            <button id="button-send">Send</button>
        </div>

        <div id="star-rating">
            <p id="text">Rate this book: </p>
            <div id="rating">
                    <input type="radio" name="rating" id="10" value="10">
                    <label class="icon-star-right" for="10"></label>

                    <input type="radio" name="rating" id="9" value="9">
                    <label class="icon-star-left" for="9"></label>

                    <input type="radio" name="rating" id="8" value="8">
                    <label class="icon-star-right" for="8"></label>

                    <input type="radio" name="rating" id="7" value="7">
                    <label class="icon-star-left" for="7"></label>

                    <input type="radio" name="rating" id="6" value="6">
                    <label class="icon-star-right" for="6"></label>

                    <input type="radio" name="rating" id="5" value="5">
                    <label class="icon-star-left" for="5"></label>

                    <input type="radio" name="rating" id="4" value="4">
                    <label class="icon-star-right" for="4"></label>

                    <input type="radio" name="rating" id="3" value="3">
                    <label class="icon-star-left" for="3"></label>

                    <input type="radio" name="rating" id="2" value="2">
                    <label class="icon-star-right" for="2"></label>

                    <input type="radio" name="rating" id="1" value="1">
                    <label class="icon-star-left" for="1"></label>
            </div>
        </div>
    </form>
    <star-rating id="rating"></star-rating>
`;

export default class ReviewForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$reviewForm = this.shadowRoot.getElementById('review-form');
    }

    connectedCallback() {
        this.$reviewForm.onsubmit = async (event) => {
            event.preventDefault();

            let rating;
            for (let i = 1; i <= 10; i++) {
                if (this.shadowRoot.getElementById(i).checked) {
                    rating = this.shadowRoot.getElementById(i).value / 2;
                    break;
                }
                rating = 0.5;
            }

            let comment = this.shadowRoot.getElementById('input-review').value;
            let user = await getCurrentUser();
            let date = new Date();

            let review = {
                comment: comment,
                rating: rating,
                username: user.name,
                date: date.toDateString()
            }

            // editReview();
            addReview(review);
        }
    }
}

window.customElements.define('review-form', ReviewForm);