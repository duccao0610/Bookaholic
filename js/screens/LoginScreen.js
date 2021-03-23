const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <div id="log-in-screen">
        <my-header></my-header>
        <login-form></login-form>
        <my-footer></my-footer> 
    </div>
`;

export default class LoginScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

    };

};

window.customElements.define("log-in-screen", LoginScreen);
