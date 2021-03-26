import "../router.js";
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
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$logo = this.shadowRoot.getElementById("logo");
        this.$logInBtn = this.shadowRoot.getElementById("logIn");
        this.$homeBtn = this.shadowRoot.getElementById("home");
    };

    connectedCallback() {
        //logo click handle
        this.$logo.onclick = () => {
            router.navigate("/welcome");
        };

        this.$homeBtn.onclick = () => {
            router.navigate("/welcome");
        }


        //login
        this.$logInBtn.onclick = () => {
            console.log("HEHE");
        }
    }
}

window.customElements.define('my-header', MyHeader);
