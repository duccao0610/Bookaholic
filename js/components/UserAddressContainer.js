const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        a,p {
            text-decoration :none;
            cursor: pointer;
            font-weight: normal;
            color :white;
            padding : 20px 50px;
        }
        a:hover {
            text-decoration :underline;
        }
        #user-address{
            display:flex;
            justify-content:space-around;
            align-items:center;
            border-top: 1px solid black;
        }
    </style>
    <div id="user-address">
        <a href="" id="name">Name</a>
        <p id="address">Location</p>
    </div>
`;

export default class UserAddressContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$name = this.shadowRoot.getElementById("name");
        this.$address = this.shadowRoot.getElementById("address");
    };

    static get observedAttributes() {
        return ["name", "address"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "name") {
            this.$name.innerHTML = "User :  " + newValue;
        } else if (attrName == "address") {
            this.$address.innerHTML = newValue;
        }
    }

};

window.customElements.define("user-address-container", UserAddressContainer);