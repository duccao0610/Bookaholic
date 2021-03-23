const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <link rel="stylesheet" href="./css/footer.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <div id="footer">
        <div id="info-container">
            <div id="social">
                <h3 id="social-heading">Bookaholic</h3>
                <ul id="social-list">
                    <li><i class="fab fa-facebook"></i></li>
                    <li><i class="fab fa-instagram"></i></li>
                    <li><i class="fab fa-linkedin"></i></li>
                </ul>
            </div>
            <div id="support">
                <ul id="support-list">
                    <li><a href="">Contact us</a></li>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">ABC</a></li>
                    <li><a href="">XYZ</a></li>
                </ul>
            </div>
            <div id="about">
                <ul id="about-list">
                    <li><a href="">About us</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Community</a></li>
                </ul>
            </div>
            <div id="newsletter">
                <h3>Newsletter Subscription</h3>
                <form>
                    <input type="text" placeholder="Subscribe to our newsletter">
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
        <p id="copyright-text">Bookaholic , Copyright &copy; 2021</p>
    </div>
`;

export default class MyFooter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    };
};

window.customElements.define("my-footer", MyFooter);