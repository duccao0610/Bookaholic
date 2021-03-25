const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <my-header></my-header>
    <div>
        <book-info-wrapper></book-info-wrapper>
    </div>
    <my-footer></my-footer>
`;

export default class ReviewScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('review-screen', ReviewScreen);
