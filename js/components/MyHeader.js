import "../router.js";
import { getCurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/header.css">
    <div id="header">
        <img src="../images/logo-blue.png" id="logo">
        <nav id="nav-bar">
            <span class="nav-bar-item" id="home">Home</span>
            <span class="nav-bar-item" id="about">About</span>
            <span class="nav-bar-item" id="contact">Contact</span>
            <span class="nav-bar-item" id="logIn">Log in</span>
        </nav>
    </div>

`;

export default class MyHeader extends HTMLElement {
    currentUser = null;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$logo = this.shadowRoot.getElementById("logo");
        this.$logInBtn = this.shadowRoot.getElementById("logIn");
        this.$homeBtn = this.shadowRoot.getElementById("home");
    };

    async connectedCallback() {
        try {
            this.currentUser = await getCurrentUser();
            this.$logInBtn.innerHTML = "Hi, " + this.currentUser.name;
        } catch (error) {
            console.log(error);
        }

        //logo click handle
        this.$logo.onclick = () => {
            if (this.currentUser) {
                router.navigate("/welcome");
            } else {
                router.navigate("/login");
            }
        };

        this.$homeBtn.onclick = () => {
            if (this.currentUser) {
                router.navigate("/welcome");
            } else {
                router.navigate("/login");
            }
        }

        //login
        this.$logInBtn.onclick = () => {
            if (this.currentUser) {
                console.log("HEHE");
            } else {
                router.navigate("/login");
            }
        }
    }
}

window.customElements.define('my-header', MyHeader);