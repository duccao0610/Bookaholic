import InputWrapper from "./InputWrapper.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #form-container{
            display:flex;
            justify-content : space-around;
        }
        #form-container img {
            width : 502px;
        }
        #form-container #register-form{
            width: 502px;
            height : 470px;
        }
        #form-container #register-form h2 {
            text-align:center;
            text-transform : uppercase;
        }
        #form-container #register-form .button-container{
            display:flex;
            margin-top : 22px;
        }
        #form-container #register-form .button-container #btn-register {
            width : 175px;
            height : 73px;
            border-radius : 10px;
            font-size : 32px;
            color : #ffffff;
            background : linear-gradient(to right,#525252,#3D72B4);
        }
        #form-container #register-form .button-container .checkbox-wrapper{
            margin-left :21px;
            display:flex;
            justify-content :space-between;
            align-items: center;
        }
        #form-container #register-form .checkbox-wrapper #policy_checkbox{
            width:29px;
            height :29px;
        }
        #form-container #register-form .checkbox-wrapper #policy_text{
            font-size: 18px;
            margin-top : 5px;
        }
    </style>
    <div id="form-container">
        <form id="register-form">
            <h2>Register your account</h2>
            <input-wrapper id="name" type="text" placeholder="Name*"></input-wrapper>
            <input-wrapper id="email" type="email" placeholder="Email*"></input-wrapper>
            <input-wrapper id="password" type="password" placeholder="Password*"></input-wrapper>
            <input-wrapper id="confirm-password" type="password" placeholder="Confirm password*"></input-wrapper>
            <div class="button-container">
                <button id="btn-register">Register</button>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="policy_checkbox">
                    <label for="policy_check" id="policy_text">I have read and agree to the privacy policy</label><br>
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