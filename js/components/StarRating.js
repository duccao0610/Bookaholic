const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" integrity="sha512-YTuMx+CIxXa1l+j5aDPm98KFbVcYFNhlr2Auha3pwjHCF1lLbY9/ITQQlsUzdM1scW45kHC5KNib4mNa1IFvJg==" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/star-rating.css">

    <div class="rate">
        <input type="radio" id="rating10" name="rating" value="10" /><label for="rating10" title="5 stars"></label>
        <input type="radio" id="rating9" name="rating" value="9" /><label class="half" for="rating9"
            title="4 1/2 stars"></label>
        <input type="radio" id="rating8" name="rating" value="8" /><label for="rating8" title="4 stars"></label>
        <input type="radio" id="rating7" name="rating" value="7" /><label class="half" for="rating7"
            title="3 1/2 stars"></label>
        <input type="radio" id="rating6" name="rating" value="6" /><label for="rating6" title="3 stars"></label>
        <input type="radio" id="rating5" name="rating" value="5" /><label class="half" for="rating5"
            title="2 1/2 stars"></label>
        <input type="radio" id="rating4" name="rating" value="4" /><label for="rating4" title="2 stars"></label>
        <input type="radio" id="rating3" name="rating" value="3" /><label class="half" for="rating3"
            title="1 1/2 stars"></label>
        <input type="radio" id="rating2" name="rating" value="2" /><label for="rating2" title="1 star"></label>
        <input type="radio" id="rating1" name="rating" value="1" /><label class="half" for="rating1"
            title="1/2 star"></label>
        <input type="radio" id="rating0" name="rating" value="0" /><label for="rating0" title="No star"></label>
    </div>
`;

export default class StarRating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

    }

    connectedCallback() {
        // function calcRate(r) {
        //     const f = ~~r,//Tương tự Math.floor(r)
        //         id = 'star' + f + (r % f ? 'half' : '')
        //     id && (document.getElementById(id).checked = !0)
        // }
    }
}

window.customElements.define('star-rating', StarRating);