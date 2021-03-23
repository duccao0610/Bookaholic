const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <div id="register-screen">
        <my-header></my-header>
        <register-form></register-form>
        <my-footer></my-footer>
    </div>
`;

export default class RegisterScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

    };

};

window.customElements.define("register-screen", RegisterScreen);
