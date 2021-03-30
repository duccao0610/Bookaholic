const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" integrity="sha512-YTuMx+CIxXa1l            +j5aDPm98KFbVcYFNhlr2Auha3pwjHCF1lLbY9/ITQQlsUzdM1scW45kHC5KNib4mNa1IFvJg==" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/review-form.css">

    <form id="review-form">
        <input id="input-review" type="text" placeholder="Write your review here">
        <button id="button-send">Send</button>
    </form>
    <star-rating></star-rating>
`;

export default class ReviewForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$reviewForm = this.shadowRoot.getElementById('review-form');
    }

    connectedCallback() {
        this.$reviewForm.onsubmit = (event) => {
            event.preventDefault();
        }
    }
}

window.customElements.define('review-form', ReviewForm);