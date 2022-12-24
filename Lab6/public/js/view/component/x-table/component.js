import template from './template.js'

import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XTable extends HTMLElement {
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

    async _render() {
        if(!this.ownerDocument.defaultView) return;
        let product = ProductFactory.createInstance();
        let result = await product.getList();
        if (result.status == 200) {
            this.shadowRoot.innerHTML = template(result);
        }
        else {
            localStorage.removeItem('AutoSellUserToken');
            let router = RouterFactory.createInstance();
            router.go('login')
        }
    }
}

customElements.define('x-table',XTable);