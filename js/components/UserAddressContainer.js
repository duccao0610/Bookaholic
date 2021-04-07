const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        a,p {
            text-decoration :none;
            cursor: pointer;
            font-weight: normal;
            color :white;
            padding : 0;
            font-size: 10px;
            flex :1;
        }   
        a:hover {
            text-decoration :underline;
        }
        #user-address{
            text-align:left;
            display:flex;
            justify-content:space-around;
            align-items:center;
            border-top: 1px solid black;
            padding-left: 35px;
        }
    </style>
    <div id="user-address">
        <a href="" id="name">Name</a>
        <p id="country">Country</p>
        <p id="city">City</p>
        <p id="district">District</p>
    </div>
`;

export default class UserAddressContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$name = this.shadowRoot.getElementById("name");
        this.$country = this.shadowRoot.getElementById("country");
        this.$city = this.shadowRoot.getElementById("city");
        this.$district = this.shadowRoot.getElementById("district");
    };

    static get observedAttributes() {
        return ["name", "address"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "name") {
            this.$name.innerHTML = "User :  " + newValue;
        } else if (attrName == "address") {
            this.$country.innerHTML = `${JSON.parse(newValue).country}`;
            this.$city.innerHTML = `${JSON.parse(newValue).city}`;
            this.$district.innerHTML = `${JSON.parse(newValue).district}`;
        }
    }

};

window.customElements.define("user-address-container", UserAddressContainer);