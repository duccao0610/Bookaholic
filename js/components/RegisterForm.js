
const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/register-form.css">
    <div id="form-container">
        <form id="register-form">
            <h2>Register your account</h2>
            <input-wrapper id="name" type="text" placeholder="Name*"></input-wrapper>
            <input-wrapper id="email" type="email" placeholder="Email*"></input-wrapper>
            <input-wrapper id="password" type="password" placeholder="Password*"></input-wrapper>
            <input-wrapper id="confirm-password" type="password" placeholder="Confirm password*"></input-wrapper>
            <div id="button-container">
                <button id="btn-register">Register</button>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="policy_checkbox">
                    <label for="policy_checkbox" id="policy_text">I have read and agree to the <a id="strongText" href="">privacy policy</a></label><br>
                </div>
            </div>
        </form>
        <img src="../images/register.png" alt="register_ilus">
    </div>
`;

export default class RegisterForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$registerForm = this.shadowRoot.getElementById("register-form");
        this.$name = this.shadowRoot.getElementById("name");
        this.$email = this.shadowRoot.getElementById("email");
        this.$password = this.shadowRoot.getElementById("password");
        this.$confirmPassword = this.shadowRoot.getElementById("confirm-password");
    }


}

window.customElements.define("register-form", RegisterForm);