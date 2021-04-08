import { listenBookInfoChanges } from "../models/book.js";
import { getCurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #all-reviews-container{
            display :flex;
            flex-direction : column;
            margin-top : 10vh;
        }
    </style>

    <div id="all-reviews-container">

    </div>
`;

export default class AllReviewsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$allReviewsContainer = this.shadowRoot.getElementById("all-reviews-container");
    }

    static get observedAttributes() {
        return ['all-reviews'];
    }

    async attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'all-reviews') {
            let currentUser = await getCurrentUser();
            let allReviews = JSON.parse(newValue);
            this.$allReviewsContainer.innerHTML = "";
            for (let review of allReviews) {
                let $reviewWrapper = document.createElement('review-wrapper');
                $reviewWrapper.setAttribute("review", JSON.stringify(review));
                if (review.userId == currentUser.id) {
                    $reviewWrapper.setAttribute("own-review", "true");
                    this.$allReviewsContainer.prepend($reviewWrapper);
                } else {
                    this.$allReviewsContainer.appendChild($reviewWrapper);
                }
            }
        }
    }

    connectedCallback() {
        listenBookInfoChanges((data) => {
            this.setAttribute("all-reviews", JSON.stringify(data.reviews));
        })
    }
}

window.customElements.define('all-reviews-container', AllReviewsContainer);