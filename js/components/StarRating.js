const $template = document.createElement('template');
$template.innerHTML = /*html*/`

    <link rel="stylesheet" href="https://i.icomoon.io/public/temp/b9f15e4866/UntitledProject/style.css">
    <link rel="stylesheet" href="./css/star-rating.css">

    <div id="star-rating">
        <p id="text">Rate this book: </p>
        <div id="rating">
                <input type="radio" name="rating" id="half10" value="10">
                <label class="icon-star-right" for="half10"></label>

                <input type="radio" name="rating" id="half9" value="9">
                <label class="icon-star-left" for="half9"></label>

                <input type="radio" name="rating" id="half8" value="8">
                <label class="icon-star-right" for="half8"></label>

                <input type="radio" name="rating" id="half7" value="7">
                <label class="icon-star-left" for="half7"></label>

                <input type="radio" name="rating" id="half6" value="6">
                <label class="icon-star-right" for="half6"></label>

                <input type="radio" name="rating" id="half5" value="5">
                <label class="icon-star-left" for="half5"></label>

                <input type="radio" name="rating" id="half4" value="4">
                <label class="icon-star-right" for="half4"></label>

                <input type="radio" name="rating" id="half3" value="3">
                <label class="icon-star-left" for="half3"></label>

                <input type="radio" name="rating" id="half2" value="2">
                <label class="icon-star-right" for="half2"></label>

                <input type="radio" name="rating" id="half1" value="1">
                <label class="icon-star-left" for="half1"></label>
        </div>
    </div>
`;

export default class StarRating extends HTMLElement {
        constructor() {
                super();
                this.attachShadow({ mode: "open" });
                this.shadowRoot.appendChild($template.content.cloneNode(true));

        }
}

window.customElements.define('star-rating', StarRating);