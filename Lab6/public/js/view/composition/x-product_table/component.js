import template from './template.js'

import './../../component/x-button/component.js'
import './../../component/x-table/component.js'

import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

class XProductTable extends HTMLElement {
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

    _render() {     
        if(!this.ownerDocument.defaultView) return;
        this.shadowRoot.innerHTML = template(this);
    }
}

customElements.define('x-product_table', XProductTable);