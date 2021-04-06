import { validateEmail, required } from "../utils.js";
import { login } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/login-form.css">
    <div id="form-container">
        <form id="login-form">
            <h2>Log in to your account</h2>
            <input-wrapper id="email" type="email" placeholder="Email*"></input-wrapper>
            <input-wrapper id="password" type="password" placeholder="Password*"></input-wrapper>
            <div id="button-container">
                <div id="option-container">
                    <div id="checkbox-wrapper">
                        <input type="checkbox" id="remember_checkbox">
                        <label for="remember_checkbox" id="policy_text">Remember Me</label><br>
                    </div>
                    <a id="forgot-password" href="#">Forgot password?</a>
                </div>
                <div id="button-list">
                    <button id="btn-login">Login</button>
                    <button id="btn-register">Register</button>
                </div>
            </div>
        </form>
        <img src="../images/login.png" alt="login_ilus">
    </div>
`;

export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$loginForm = this.shadowRoot.getElementById("login-form");
        this.$checked = this.shadowRoot.getElementById("remember_checkbox");
        this.$email = this.shadowRoot.getElementById("email");
        this.$password = this.shadowRoot.getElementById("password");
        this.$registerBtn = this.shadowRoot.getElementById("btn-register");
    };

    connectedCallback() {
        this.$loginForm.onsubmit = (event) => {
            event.preventDefault();

            let email = this.$email.value;
            let password = this.$password.value;

            let isPassed =
                (
                    this.$email.validate(required, "Input your email") &&
                    this.$email.validate(validateEmail, "Wrong email format")
                ) &
                this.$password.validate(required, "Input your password");

            if (isPassed) {
                login(email, password);
            }
        };

        this.$registerBtn.onclick = () => {
            router.navigate("/register");
            console.log("HUHU");
        };
    }
};

window.customElements.define("login-form", LoginForm);
