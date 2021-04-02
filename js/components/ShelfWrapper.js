const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        *{
            font-family: "Montserrat";
        }

        .btn-shelf {
            border: none;
            font-size: 30px;
            background-color: white;
        }
    </style>
    <div id="shelf-wrapper">
        <button id="btn-shelf"></button>
    </div>
`;
export default class ShelfWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$btnShelf = this.shadowRoot.getElementById('btn-shelf');
    }

    static get observedAttributes() {
        return ['shelf-name'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'shelf-name') {
            this.$btnShelf.innerHTML = newValue;
        }
    }
}

window.customElements.define('shelf-wrapper', ShelfWrapper);