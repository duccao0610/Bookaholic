import { getCurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <div id="welcome-screen">
        <my-header></my-header>
        <search-form></search-form>
        <category-container books='[
            {"cover_img":"../images/book2.jpg","name":"The little story book"},
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"../images/book2.jpg","name":"The little story book"}
        ]' name="Popular"></category-container>
        <category-container books='[
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"../images/book2.jpg","name":"The little story book"},
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"../images/book2.jpg","name":"The little story book"}
        ]' name="Novel"></category-container>
        <category-container books='[
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"../images/book2.jpg","name":"The little story book"},
            {"cover_img":"../images/book1.jpg","name":"The imperfections of Memory"},
            {"cover_img":"https://edit.org/images/cat/book-covers-big-2019101610.jpg","info":"My cover book"}
        ]' name="Fiction"></category-container>
        <my-footer></my-footer>
    </div>
`;
{/* <book-container src="../images/book1.jpg" desc= "The imperfections of Memory- Angelina Aludo"></book-container> */ }
// <book-container src="../images/book2.jpg" desc= "The little story book- Jean Lumier"></book-container>

export default class WelcomeScreen extends HTMLElement {
    currentUser = null;
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    };

    async connectedCallback() {
        try {
            this.currentUser = await getCurrentUser();
        } catch (error) {
            router.navigate("/login");
        }
    }
};

window.customElements.define("welcome-screen", WelcomeScreen);