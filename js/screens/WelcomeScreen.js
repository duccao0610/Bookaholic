import { getBooksByCategory, getPopularBook } from "../models/book.js";
import { getCurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <div id="welcome-screen">
        <my-header></my-header>
        <search-form></search-form>
        <div id="categories-list">
            <category-container id="popular" name="Popular"></category-container>
        </div>
        <my-footer></my-footer>
    </div>
`;

export default class WelcomeScreen extends HTMLElement {
    currentUser = null;
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$popular = this.shadowRoot.getElementById("popular");
        this.$list = this.shadowRoot.getElementById("categories-list");
    };

    async connectedCallback() {
        let currentUser = await getCurrentUser();
        if (currentUser.shelves == undefined) {
            await firebase.firestore()
                .collection("users")
                .doc(currentUser.id)
                .update({
                    shelves: []
                });
        }


        try {
            this.currentUser = await getCurrentUser();
        } catch (error) {
            router.navigate("/login");
        }

        let popularBooks = await getPopularBook();
        this.$popular.setAttribute("books", JSON.stringify(popularBooks));

        let categories = ["novel", "fiction", "fantasy"];
        for (let category of categories) {
            let books = await getBooksByCategory(category);
            let $categoryContainer = document.createElement("category-container");
            $categoryContainer.setAttribute("books", JSON.stringify(books));
            $categoryContainer.setAttribute("name", category);
            $categoryContainer.style.textTransform = "capitalize";
            this.$list.appendChild($categoryContainer);
        }

    }
};

window.customElements.define("welcome-screen", WelcomeScreen);