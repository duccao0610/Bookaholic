const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        *{
            font-family: "Montserrat";
        }
        #container {
            display:flex;
            flex-direction : column;
            margin-bottom : 50px;
        }
        #container #book-list{            
            display:flex;
            flex-wrap : wrap;
            justify-content : space-around;
            margin : 0 auto;
        }
        #container h2 {
            font-size : 30px;
            margin-left  :100px;
        }
        
    </style>
    <div id="container">
        <h2 id="name">Ahihi</h2>
        <div id="book-list">
        </div>
    </div>
    
`;

export default class CategoryContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$name = this.shadowRoot.getElementById("name");
        this.$category = this.shadowRoot.getElementById("container");
        this.$bookList = this.shadowRoot.getElementById("book-list");
    };

    static get observedAttributes() {
        return ["books", "name"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "books") {
            let books = JSON.parse(newValue);
            for (let book of books) {
                let $bookContainer = document.createElement("book-container");
                $bookContainer.setAttribute("src", book.src);
                $bookContainer.setAttribute("info", book.info);
                this.$bookList.appendChild($bookContainer);
            }
        } else if (attrName == "name") {
            this.$name.innerHTML = newValue;
        }
    }
};

window.customElements.define("category-container", CategoryContainer);