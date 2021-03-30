import { searchBook } from "../models/book.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <!-- fontawesome  -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/searchForm.css">

    <form id="search-form">
        <div id="input-icon">
            <input id="input" class="input-field" placeholder="Search books" size="5">
            <button class="fas fa-search icon"></button>
        </div>
    </form>
    
`;

export default class SearchForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$searchForm = this.shadowRoot.getElementById("search-form");
        this.$input = this.shadowRoot.getElementById("input");
    };

    connectedCallback() {
        this.$searchForm.onsubmit = async (event) => {
            event.preventDefault();
            let input = this.$input.value;
            let results = await searchBook(input);
            console.log(results);

            localStorage.setItem("results", JSON.stringify(results));
            localStorage.setItem("search-value", input);

        }
    }
};

window.customElements.define("search-form", SearchForm);
