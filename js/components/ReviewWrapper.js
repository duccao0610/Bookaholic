const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <!-- fontawesome  -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/review-wrapper.css">

    <div id="review-wrapper">
        <div id="identity">
            <div id="cropped-avatar">
                <img id="avatar" src="https://znews-photo.zadn.vn/w660/Uploaded/aohvtsw/2019_09_28/o11_thumb.jpg">
            </div>
            <h4 id="username">Username here</h4>
        </div>
        <div id="review-content">
            <div id="rating"></div>
            <p id="comment">Book's comment here</p>
            <p id="review-date">Review date</p>
        </div>
    </div>
`;

export default class ReviewWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$avatar = this.shadowRoot.getElementById("avatar");
        this.$username = this.shadowRoot.getElementById("username");
        this.$rating = this.shadowRoot.getElementById("rating");
        this.$comment = this.shadowRoot.getElementById("comment");
    }

    static get observedAttributes() {
        return ['avatar', 'username', 'rating', 'comment'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'avatar':
                this.$avatar.setAttribute('src', newValue);
                break;
            case 'username':
                this.$username.innerHTML = newValue;
                break;
            case 'rating':
                for (let i = 0; i < Number(newValue); i++) {
                    if (Number(newValue) - i != 0.5) {
                        let $fullStar = document.createElement('i');
                        $fullStar.classList.add('fas', 'fa-star');
                        this.$rating.appendChild($fullStar);
                    } else {
                        let $halfStar = document.createElement('i');
                        $halfStar.classList.add('fas', 'fa-star-half-alt');
                        this.$rating.appendChild($halfStar);
                    }
                }
                break;
            case 'comment':
                this.$comment.innerHTML = newValue;
                break;
        }
    }
}

window.customElements.define('review-wrapper', ReviewWrapper);