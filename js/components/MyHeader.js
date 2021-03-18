const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <style>
        #header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin : 50px 200px;
        }
        #header #logo {
            width: 212px;
            height: 188px;
        }
        #header #nav-bar {
            display: flex;
            justify-content: space-between;
            width: 513px;
            height: 29px;
        }
        #header #nav-bar .nav-bar-item {
            font-size: 24px;
            background: linear-gradient(to right, #a17e7e, #491B1B);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            border-style: none;
            cursor : pointer;
        }
    </style>

    <div id="header">
        <img src="../images/logo.png" id="logo">
 
        <nav id="nav-bar">
            <span class="nav-bar-item" id="home">Home</span>
            <span class="nav-bar-item" id="about">About</span>
            <span class="nav-bar-item" id="contact">Contact</span>
            <span class="nav-bar-item" id="signIn">Sign in</span>
        </nav>
    </div>

`;

export default class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('my-header', MyHeader);
