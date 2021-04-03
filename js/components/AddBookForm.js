const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <form id="shelves-list">
        <p>Test</p>
    </form>
`;

export default class AddBookForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$shelvesList = this.shadowRoot.getElementById("shelves-list");
    }

    static get observedAttributes() {
        return ['shelves'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'shelves') {
            let shelves = JSON.parse(newValue);
        }
    }
}

window.customElements.define("add-book-form", AddBookForm);