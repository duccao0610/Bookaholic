const $template = document.createElement('template');
$template.innerHTML = /*html*/`
    <div id="book-info-wrapper">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link rel="stylesheet" href="./css/book-info-wrapper.css">


        <div id="book-cover-container">
            <img id="book-cover" src="https://images.squarespace-cdn.com/content/v1/55c934b2e4b07aa63f0469cb/1442861118190-0729GUG7PF44SAMYOUDA/ke17ZwdGBToddI8pDm48kBUDAxm-FLUF-OJf9moK1kV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UT_TXfTUFcrrnRvtinoH4JYxq5g0UB9t65pVePltZrd1IKYY7Qu0iTZQJ-GJ4dsqLQ/ZackCover.jpg">
        </div>
        <div id="aside-right">
            <h2 id="book-title">Book's title</h2>
            <p id="author">Author</p>
            <div id="status-container">
                <i class="fas fa-circle"></i>
                <h4 id="status">Status</h4>
            </div>
            <p id="intro">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, inventore iste ex veritatis ea porro saepe voluptate laborum eos! Veritatis a similique nobis atque doloribus dolorem voluptatum soluta quos. Corrupti?</p>
            <div id="button-group">
                <button id="button-add">Add to bookshelf</button>
                <button id="button-find-book">Find book</button>
            </div>
        </div>
    </div>
`;

export default class BookInfoWrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$bookCover = this.shadowRoot.getElementById('book-cover');
        this.$bookTitle = this.shadowRoot.getElementById('book-title');
        this.$author = this.shadowRoot.getElementById('author');
        this.$statusContainer = this.shadowRoot.getElementById('status-container');
        this.$status = this.shadowRoot.getElementById('status');
        this.$intro = this.shadowRoot.getElementById('intro');
    }

    static get observedAttributes() {
        return ['book-cover', 'book-title', 'author', 'status', 'intro'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'book-cover':
                this.$bookCover.setAttribute('src', newValue);
                break;
            case 'book-title':
                this.$bookTitle.innerHTML = newValue;
                break;
            case 'author':
                this.$author.innerHTML = newValue;
                break;
            case 'status':
                if (newValue == 'available') {
                    this.$statusContainer.style.color = '#1CE949';
                    this.$status.innerHTML = 'Available';
                } else {
                    this.$statusContainer.style.color = '#e9271c';
                    this.$status.innerHTML = 'Unavailable';
                }
                break;
            case 'intro':
                this.$intro.innerHTML = newValue;
                break;
        }
    }
}

window.customElements.define('book-info-wrapper', BookInfoWrapper);