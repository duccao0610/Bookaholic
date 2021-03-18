const $template = document.createElement("template");

$template.innerHTML = /*html*/`
    <style>
        #input{
            border: none;
            border-radius : 5px;
            background : #D0C7C7;
            font-size : 20px;
        }
        #input::placeholder {
            padding : 10px;
            color: #888383;
            font-size: 10px;
        }
    </style>
    <div class="input-container">
        <input type="text" id="input" class="form-control" placeholder="This is input">
        <div class="text-danger" id="error"></div>
    </div>
`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ['type', 'placeholder', 'error', 'default'];
    }
    attributesChangedCallback() {

    }
}

window.customElements.define("input-wrapper", InputWrapper);