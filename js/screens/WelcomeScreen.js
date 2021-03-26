const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <div id="welcome-screen">
        <my-header></my-header>
        <category-container books='[
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"},
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"}
        ]' name="Popular"></category-container>
        <category-container books='[
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"},
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"}
        ]' name="Novel"></category-container>
        <category-container books='[
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"},
            {"src":"../images/book1.jpg","info":"The imperfections of Memory"},
            {"src":"../images/book2.jpg","info":"The little story book"}
        ]' name="Fiction"></category-container>
        <my-footer></my-footer>
    </div>
`;
{/* <book-container src="../images/book1.jpg" desc= "The imperfections of Memory- Angelina Aludo"></book-container> */ }
// <book-container src="../images/book2.jpg" desc= "The little story book- Jean Lumier"></book-container>

export default class WelcomeScreen extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    };

};

window.customElements.define("welcome-screen", WelcomeScreen);