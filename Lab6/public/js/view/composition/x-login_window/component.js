import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-input/component.js'
import './../../component/x-text/component.js'

import { UserFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XLoginWindow extends HTMLElement {
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

    async _btn_login_listener(event) {
        event.stopPropagation();
        let login = (this.shadowRoot.childNodes[3].xValue);
        let password = (this.shadowRoot.childNodes[5].xValue);
        console.log(login);
        console.log(password);
        let user = UserFactory.createInstance();
        user.setUser(login, password, undefined);
        let result = await user.authQuery();
        let router = RouterFactory.createInstance();
        if (result.status == 200) {
            localStorage.setItem('AutoSellUserToken', JSON.stringify(result.data));
            console.log("Logined! Please, wait for pesponse...")
        }
        else if (result.status == 401)
        {
            console.log("Failed to Login! Invalid Login or Password.")
        }
        else
        {
            console.log("Server error! Try again.")
        }
    }

    _btn_register_listener(event) {
        event.stopPropagation();
        let router = RouterFactory.createInstance();
        router.go('register')
    }

    _render() {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
        this.shadowRoot.childNodes[7].addEventListener('click', this._btn_login_listener.bind(this));
        this.shadowRoot.childNodes[9].addEventListener('click', this._btn_register_listener.bind(this));
    }
}

customElements.define('x-login_window',XLoginWindow);