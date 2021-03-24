const $template = document.createElement("template");

$template.innerHTML = /*html*/`
    <style>
        .form-item{
            width : 500px;
            height : 57px;
            background : #D0C7C7;
            font-size : 20px;
            margin-bottom : 5px;
            border: none;
            border-radius : 5px;
            padding :  0px 10px;
        }
        .form-item:focus{
            outline :none;
        } 
        .form-item::placeholder {
            padding : 10px;
            color: #888383;
            font-size: 18px;
        }
        #error {
            color :red;
        }
        @media (max-width: 719px){
            .form-item{
                width: 70%;
                border-radius : 5px;
                margin-bottom : 10px;
            }
        }
        @media (max-width: 1023px) and (min-width: 720px){
            .form-item {
                width:90%;
                border-radius :5px;
            }
        }
    </style>
    <div class="input-container">
        <input class="form-item" type="text" id="input" placeholder="This is input*">
        <div id="error"></div>
    </div>
`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$input = this.shadowRoot.getElementById("input");
        this.$error = this.shadowRoot.getElementById("error");
    }

    static get observedAttributes() {
        return ['type', 'placeholder', 'error', 'default'];
    }


    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'type':
                this.$input.type = newValue;
                break;
            case 'placeholder':
                this.$input.placeholder = newValue;
                break;
            case 'error':
                this.$error.innerHTML = newValue;
                break;
            default:
                this.$input.value = newValue;
                break;
        }
    };

    get value() {
        return this.$input.value;
    }

    set error(message) {
        this.setAttribute("error", message);
    };

    validate(condition, message) {
        if (condition(this.value)) {
            this.error = "";
            return true;
        } else {
            this.error = message;
            return false;
        };
    };

}

window.customElements.define("input-wrapper", InputWrapper);