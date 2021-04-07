const $template = document.createElement("template");
$template.innerHTML =  /*html*/`
    <form>
        <input id="country" placeholder="Country">
        <input id="city" placeholder="City">
        <input id="district" placeholder="district">
        <button id="btn-save">Save</button>
    </form>
`;

export default class AddressForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define("address-form", AddressForm);