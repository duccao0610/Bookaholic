const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/book-container.css">
    <div id="book-container">
        <div id="img-container">
            <img id="book-cover">
        </div>
        <p id="book-info">Ahihi</p>
    </div>
`;

export default class BookContainer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$bookImg = this.shadowRoot.getElementById("book-cover");
        this.$bookInfo = this.shadowRoot.getElementById("book-info");
    };

    static get observedAttributes() {
        return ["src", "info"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case "src":
                this.$bookImg.src = newValue;
                break;
            case "info":
                this.$bookInfo.innerHTML = newValue;
                break;
        };
    }

};

window.customElements.define("book-container", BookContainer);
