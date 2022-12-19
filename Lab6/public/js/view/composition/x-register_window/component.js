import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-input/component.js'
import './../../component/x-text/component.js'

import { UserFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XRegisterWindow extends HTMLElement {
    constructor() {  
        super();   
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {  
        this._render();
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, prev, next) {

    }

    async _btn_register_listener(event) {
        event.stopPropagation();
        let login = (this.shadowRoot.childNodes[3].xValue);
        let password = (this.shadowRoot.childNodes[5].xValue);
        let email = (this.shadowRoot.childNodes[7].xValue);
        console.log(login);
        console.log(password);
        console.log(email);
        let user = UserFactory.createInstance();
        user.setUser(login, password, email);
        let result = await user.registerQuery();
        if (result.status == 200) {
            console.log("Register is complete! Please, go back to login.")
        }
        else if (result.status == 401) {
            console.log("User already exist! Try another login or email.")
        }
        else {
            console.log("Server error! Try again.")
        }
    }

    _btn_back_listener(event) {
        event.stopPropagation();
        let router = RouterFactory.createInstance();
        router.go('login')
    }

    _render() {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
        this.shadowRoot.childNodes[9].addEventListener('click', this._btn_register_listener.bind(this));
        this.shadowRoot.childNodes[11].addEventListener('click', this._btn_back_listener.bind(this));
    }
}

customElements.define('x-register_window',XRegisterWindow);