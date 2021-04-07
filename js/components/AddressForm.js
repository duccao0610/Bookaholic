import { getCurrentUser, updateAddress } from "../models/user.js";
import { removeAccents } from "../utils.js";

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
        }
        #address-form-container {
            
        }
        input {
            margin-bottom :5px;
        }
    </style>

    <div id="address-form-container">
        <form>
            <input id="country" placeholder="Country" disabled>
            <input id="city" placeholder="City" disabled>
            <input id="district" placeholder="District" disabled>
            <div>
                <button id="btn-edit" type="button">Edit</button>
                <button id="btn-save" type="submit" disabled>Save</button>
            </div>
        </form>
    </div>
`;

export default class AddressForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$country = this.shadowRoot.getElementById("country");
        this.$city = this.shadowRoot.getElementById("city");
        this.$district = this.shadowRoot.getElementById("district");
        this.$btnSave = this.shadowRoot.getElementById("btn-save");
        this.$btnEdit = this.shadowRoot.getElementById("btn-edit");
    }

    async connectedCallback() {
        let currentUser = await getCurrentUser();
        this.$country.value = currentUser.address.country;
        this.$city.value = currentUser.address.city;
        this.$district.value = currentUser.address.district;

        this.$btnSave.onclick = (event) => {
            event.preventDefault();
            this.$country.disabled = true;
            this.$city.disabled = true;
            this.$district.disabled = true;
            this.$btnEdit.disabled = false;
            this.$btnSave.disabled = true;

            let sortString = (removeAccents(this.$country.value).toUpperCase() + removeAccents(this.$city.value).toUpperCase() + removeAccents(this.$district.value).toUpperCase()).replace(/\s/g, '');
            console.log(sortString);

            let newAddress = {
                country: removeAccents(this.$country.value).toUpperCase(),
                city: removeAccents(this.$city.value).toUpperCase(),
                district: removeAccents(this.$district.value).toUpperCase(),
                sortString: sortString
            }

            updateAddress(currentUser.id, newAddress);
        }
        this.$btnEdit.onclick = (event) => {
            this.$country.disabled = false;
            this.$city.disabled = false;
            this.$district.disabled = false;
            this.$btnEdit.disabled = true;
            this.$btnSave.disabled = false;
        }
    }
}

window.customElements.define("address-form", AddressForm);