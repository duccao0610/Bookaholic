
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
        //get search value
        let searchValue = localStorage.getItem("search-value");
        //get results - string
        let resultsName = localStorage.getItem("resultsName");
        let resultsCategory = localStorage.getItem("resultsCategory");
        let resultsAuthor = localStorage.getItem("resultsAuthor");


        let resultNameArr = JSON.parse(resultsName);
        let resultsCategoryArr = JSON.parse(resultsCategory);
        let resultsAuthorArr = JSON.parse(resultsAuthor);
        let resultsArr = resultNameArr.concat(resultsCategoryArr, resultsAuthorArr);

        let results = JSON.stringify(resultsArr);
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