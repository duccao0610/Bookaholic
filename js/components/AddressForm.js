const $template = document.createElement("template");
$template.innerHTML =  /*html*/`
    <style>
        *{
            font-family: "Montserrat";
        }
        form {
            margin-left: 0;
            display: flex;
            flex-direction: column;
            width: 20%;
        }
        #form-container {
            
        }
    </style>

    <div id="form-container">
        <form>
            <input id="country" placeholder="Country">
            <input id="city" placeholder="City">
            <input id="district" placeholder="District">
            <button id="btn-save">Save</button>
        </form>
    </div>
`;

export default class AddressForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$btnSave = this.shadowRoot.getElementById("btn-save");
    }

    connectedCallback() {
        this.$btnSave.onclick = (event) => {
            event.preventDefault();
        }
    }
}

window.customElements.define("address-form", AddressForm);