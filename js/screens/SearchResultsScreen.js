import { searchBook } from "../models/book.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <my-header></my-header>
    <search-form></search-form>
    <category-container id="results"></category-container>
    <my-footer></my-footer>
`;

export default class SearchResultsScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$results = this.shadowRoot.getElementById("results");
    };

    connectedCallback() {
        let results = localStorage.getItem("results");
        let searchValue = localStorage.getItem("search-value");
        console.log(results);
        let response = "";
        if (results.length == 0) {
            response = "No result with [ " + searchValue + " ]";
        } else {
            response = JSON.parse(results).length + " Result(s) with [ " + searchValue + " ]";
            this.$results.setAttribute("name", response);
            this.$results.setAttribute("books", results);
        }


    }
};

window.customElements.define("search-results-screen", SearchResultsScreen);