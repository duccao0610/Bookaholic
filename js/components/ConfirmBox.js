import { removeShelf } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/`
    <style>
        #container{
            display:flex;
            flex-direction :column;
            justify-content :center;
            align-items:center;
            border : 1px solid black;
            border-radius : 5px;
            width: 300px;
        }
        #container #question-container{
            text-align:center;
            width:inherit;
            background: linear-gradient(to left, #a17e7e, #491B1B);
            color: white;
            font-weight :normal;
            font-size : 20px;
        }
        #container #question-container{
            text-transform : uppercase;
        }
        #container #button-container {
            padding: 20px 0px;
            display:flex;
            justify-content:space-around;
            width:inherit;
            background:white;
        }
        #container #button-container button {
            padding : 5px 15px;
            border-radius : 5px;
        }
        #container #button-container #btn-yes {
            background : linear-gradient(to left,#525252,#3D72B4);
        }

        #container #button-container #btn-yes:hover{
            background : linear-gradient(to right,#525252,#3D72B4);
        }
        #container #button-container #btn-no {
            background : gray;
        }
        #container #button-container #btn-no:hover{
            background: linear-gradient(to right, #a17e7e, #491B1B);
        }
    </style>
    <div id="container">
        <div id="question-container">
            <h4 id="question">Confirm question</h4>
        </div>
        <div id="button-container">
            <button id="btn-yes">YES</button>
            <button id =btn-no>NO</button>
        </div>
    </div>
`;

export default class ConfirmBox extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$btnYes = this.shadowRoot.getElementById("btn-yes");
        this.$btnNo = this.shadowRoot.getElementById("btn-no");
        this.$confirmBox = this.shadowRoot.getElementById("container");
        this.$question = this.shadowRoot.getElementById("question");
    };

    static get observedAttributes() {
        return ["action", "question"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // if (attrName == "action") {
        //     if (newValue == "delete") {
        //         console.log("DELETE SHELF");
        //     } else if (newValue == "logout") {
        //         console.log("LOG OUT");
        //     }
        // } else
        if (attrName == "question") {
            if (newValue == "delete") {
                this.$question.innerHTML = "Want to delete shelf?";
            } else if (newValue == "logout") {
                this.$question.innerHTML = "Want to log out ?";
            }
        }
    }
    connectedCallback() {
        this.$btnYes.onclick = (event) => {
            event.preventDefault();
            if (this.getAttribute("action") == "logout") {
                console.log("LOGOUT");
                localStorage.setItem("token", "");
                this.style.display = "none";
                router.navigate("/login");
            } else if (this.getAttribute("action") == "delete") {
                console.log("DELETE");
                let a = sessionStorage.getItem("itemDelete");
                removeShelf(a);
                this.style.display = "none";
            }
        }

        this.$btnNo.onclick = (event) => {
            event.preventDefault();
            this.style.display = "none";
        }
    }
};

window.customElements.define("confirm-box", ConfirmBox);