import { getCurrentUser } from "../models/user.js";
import { getDataFromDocs } from "../utils.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/shelves-screen.css">

    <my-header></my-header>
    <div id="shelves-container">

    </div>
    <my-footer></my-footer>
`;

export default class ShelvesScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$shelvesContainer = this.shadowRoot.getElementById('shelves-container');

    }

    async connectedCallback() {
        let currentUser = await getCurrentUser();
        console.log(currentUser.shelves);
        for (let shelf of currentUser.shelves) {
            let $shelfWrapper = document.createElement("shelf-wrapper");
            $shelfWrapper.setAttribute('shelf-name', shelf.shelfName);
            this.$shelvesContainer.appendChild($shelfWrapper);
        }
    }
}

window.customElements.define('shelves-screen', ShelvesScreen);