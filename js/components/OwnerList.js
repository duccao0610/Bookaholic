import { listenBookInfoChanges } from "../models/book.js";
import { getBookOwners, getCurrentUser } from "../models/user.js";
const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #owner-list{
            text-align :center;
            width :500px;
            height:fit-content;
        }
        h3{
            text-transform: uppercase;
            position :relative;
        }
        #btn-close{
            position :absolute;
            top: 22px;
            right : 20px;
        }
    </style>
    <h3>People owns this book</h3>
    <div id="owner-list">
    
    </div>
    <button id="btn-close">X</button>
`;

export default class OwnerList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$list = this.shadowRoot.getElementById("owner-list");
        this.$btnClose = this.shadowRoot.getElementById("btn-close");
    };

    static get observedAttributes() {
        return ["owners"];
    }
    async attributeChangedCallback(attrName, oldValue, newValue) {
        let currentUser = await getCurrentUser();
        if (attrName == "owners") {
            let owners = JSON.parse(newValue);
            for (let owner of owners) {
                if (owner.id != currentUser.id) {
                    let $newOwner = document.createElement("user-address-container");
                    $newOwner.setAttribute("name", owner.name);
                    $newOwner.setAttribute("address", JSON.stringify(owner.address));
                    this.$list.appendChild($newOwner);
                }
            }
        }

    }

    connectedCallback() {
        this.$btnClose.onclick = (event) => {
            event.preventDefault();
            this.style.display = "none";
        }

        listenBookInfoChanges(async (data) => {
            this.$list.innerHTML = "";
            let owners = await getBookOwners(data.id);
            this.$list.setAttribute("owners", JSON.stringify(owners));
        })
    }
}

window.customElements.define("owner-list", OwnerList);