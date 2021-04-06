import { book, getBooksByCategory, getPopularBook } from "../models/book.js";
import { getCurrentUser } from "../models/user.js";
import { getRandomIndexes } from "../utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #new-book-form{
            position : fixed;
            left : 50%;
            top : 50%;
            transform: translate(-50%,-50%);
            z-index : 10000;
            display:none;
        }
    </style>
    <div id="welcome-screen">
        <my-header></my-header>
        <search-form></search-form>
        <button id="new-btn">New</button>
        <new-book-form id="new-book-form"></new-book-form>
        <div id="categories-list">
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
        this.$newBtn = this.shadowRoot.getElementById("new-btn");
        this.$newBookForm = this.shadowRoot.getElementById("new-book-form");
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
        let $popularContainer = document.createElement("category-container");
        $popularContainer.setAttribute("books", JSON.stringify(popularBooks));
        $popularContainer.setAttribute("name", "Popular");
        this.$list.appendChild($popularContainer);


        // this.$popular.setAttribute("books", JSON.stringify(popularBooks));

        let categories = ["novel", "fiction", "fantasy"];
        for (let category of categories) {
            let books = await getBooksByCategory(category);
            let booksToShow;
            //Chi hien thi 4 quyen sach RANDOM trong moi category
            if (books.length > 4) {
                do {
                    booksToShow = [];
                    let randoms = getRandomIndexes(books);
                    console.log(randoms);
                    for (let index of randoms) {
                        if (books[index].isChecked == true) {
                            booksToShow.push(books[index]);
                        } else {
                            break;
                        }
                    }
                } while (booksToShow.length < 4)
            } else {
                booksToShow = books;
            }

            let $categoryContainer = document.createElement("category-container");
            $categoryContainer.setAttribute("books", JSON.stringify(booksToShow));
            $categoryContainer.setAttribute("name", category);
            $categoryContainer.style.textTransform = "capitalize";
            this.$list.appendChild($categoryContainer);
        }


        this.$newBtn.onclick = (event) => {
            // if (this.$newBookForm.style.display === "none") {
            this.$newBookForm.style.display = "block";
            // } else {
            //     this.$newBookForm.style.display = "none";
            // }
        }
    }
};

window.customElements.define("welcome-screen", WelcomeScreen);