"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[282],{282:(t,e,n)=>{function r(t){var e=' \n  <div>\n  <br>\n  <table border="1" bordercolor = "black" bgcolor = "CornflowerBlue">\n  <caption><b>Products</b></caption>\n  <tr>\n  <th>ID</th>\n  <th>Name</th>\n  <th>Price</th>\n  <th>Description</th>\n  <th>Delete</th>\n  </tr>          \n   ';return t.data.forEach((function(t){e+="\n    <tr><td>".concat(t.id,"</td><td>").concat(t.name,"</td><td>").concat(t.price,"</td><td>").concat(t.description,"</td><td><button value=").concat(t.id,"><slot>Delete</slot></button></td></tr>          \n    ")})),e+="\n  </table>\n  </div>\n  "}n.r(e),n(745),n(507);var o=n(112),i=n(89);function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(t,e,n,r,o,i,c){try{var u=t[i](c),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){u(i,r,o,c,a,"next",t)}function a(t){u(i,r,o,c,a,"throw",t)}c(void 0)}))}}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){if(e&&("object"===c(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function s(t){var e="function"==typeof Map?new Map:void 0;return s=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return p(t,arguments,h(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),y(r,t)},s(t)}function p(t,e,n){return p=d()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&y(o,n.prototype),o},p.apply(null,arguments)}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function y(t,e){return y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},y(t,e)}function h(t){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},h(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&y(t,e)}(w,t);var e,n,c,u,s,p,b,v=(e=w,n=d(),function(){var t,r=h(e);if(n){var o=h(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return f(this,t)});function w(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,w),(t=v.call(this)).attachShadow({mode:"open"}),t}return c=w,u=[{key:"connectedCallback",value:function(){this._render()}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(t,e,n){}},{key:"_btn_delete_listener",value:(b=a(regeneratorRuntime.mark((function t(e){var n,r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e,console.log(n),r=o.u.createInstance(),t.next=5,r.delete(n);case 5:200==(c=t.sent).status?this._render():401==c.status?(localStorage.removeItem("AutoSellUserToken"),i.RouterFactory.createInstance().go("login")):this._render();case 7:case"end":return t.stop()}}),t,this)}))),function(t){return b.apply(this,arguments)})},{key:"_render",value:(p=a(regeneratorRuntime.mark((function t(){var e,n,c,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.ownerDocument.defaultView){t.next=2;break}return t.abrupt("return");case 2:return e=o.u.createInstance(),t.next=5,e.getList();case 5:for(200==(n=t.sent).status?this.shadowRoot.innerHTML=r(n):(localStorage.removeItem("AutoSellUserToken"),i.RouterFactory.createInstance().go("login")),c=2,n.data.forEach((function(t){c+=2})),u=2;u<c;u+=2)this.shadowRoot.childNodes[1].childNodes[3].childNodes[3].childNodes[u].childNodes[4].childNodes[0].addEventListener("click",this._btn_delete_listener.bind(this,this.shadowRoot.childNodes[1].childNodes[3].childNodes[3].childNodes[u].childNodes[4].childNodes[0].value));case 10:case"end":return t.stop()}}),t,this)}))),function(){return p.apply(this,arguments)})}],s=[{key:"observedAttributes",get:function(){return[]}}],u&&l(c.prototype,u),s&&l(c,s),Object.defineProperty(c,"prototype",{writable:!1}),w}(s(HTMLElement));function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function w(t,e,n,r,o,i,c){try{var u=t[i](c),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function g(t){var e="function"==typeof Map?new Map:void 0;return g=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return k(t,arguments,R(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),x(r,t)},g(t)}function k(t,e,n){return k=O()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&x(o,n.prototype),o},k.apply(null,arguments)}function O(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function x(t,e){return x=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},x(t,e)}function R(t){return R=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},R(t)}customElements.define("x-table",b);var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&x(t,e)}(s,t);var e,n,r,c,u,a,l,f=(e=s,n=O(),function(){var t,r=R(e);if(n){var o=R(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return _(this,t)});function s(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,s),(t=f.call(this)).attachShadow({mode:"open"}),t}return r=s,c=[{key:"connectedCallback",value:function(){this._render()}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(t,e,n){}},{key:"_btn_add_listener",value:(a=regeneratorRuntime.mark((function t(e){var n,r,c,u,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.stopPropagation(),n=this.shadowRoot.childNodes[3].xValue,r=this.shadowRoot.childNodes[5].xValue,c=this.shadowRoot.childNodes[7].xValue,(u=o.u.createInstance()).setProduct(n,r,c),t.next=8,u.add();case 8:200==(a=t.sent).status?this._render():401==a.status?(localStorage.removeItem("AutoSellUserToken"),i.RouterFactory.createInstance().go("login")):this._render();case 10:case"end":return t.stop()}}),t,this)})),l=function(){var t=this,e=arguments;return new Promise((function(n,r){var o=a.apply(t,e);function i(t){w(o,n,r,i,c,"next",t)}function c(t){w(o,n,r,i,c,"throw",t)}i(void 0)}))},function(t){return l.apply(this,arguments)})},{key:"_btn_exit_listener",value:function(t){t.stopPropagation(),localStorage.removeItem("AutoSellUserToken"),i.RouterFactory.createInstance().go("login")}},{key:"_render",value:function(){this.ownerDocument.defaultView&&(this.shadowRoot.innerHTML="\n    <x-button>Exit</x-button>\n    <x-input></x-input>\n    <x-input></x-input>\n    <x-input></x-input>\n    <x-button>Add</x-button>\n    <x-table></x-table>\n",this.shadowRoot.childNodes[1].addEventListener("click",this._btn_exit_listener.bind(this)),this.shadowRoot.childNodes[9].addEventListener("click",this._btn_add_listener.bind(this)))}}],u=[{key:"observedAttributes",get:function(){return[]}}],c&&m(r.prototype,c),u&&m(r,u),Object.defineProperty(r,"prototype",{writable:!1}),s}(g(HTMLElement));function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function E(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function T(t){var e="function"==typeof Map?new Map:void 0;return T=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return C(t,arguments,M(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),I(r,t)},T(t)}function C(t,e,n){return C=N()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&I(o,n.prototype),o},C.apply(null,arguments)}function N(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function I(t,e){return I=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},I(t,e)}function M(t){return M=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},M(t)}customElements.define("x-products_editor",S);var D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(u,t);var e,n,r,o,i,c=(e=u,n=N(),function(){var t,r=M(e);if(n){var o=M(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return E(this,t)});function u(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(t=c.call(this)).attachShadow({mode:"open"}),t}return r=u,i=[{key:"observedAttributes",get:function(){return[]}}],(o=[{key:"connectedCallback",value:function(){this._render()}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(t,e,n){}},{key:"_render",value:function(){this.ownerDocument.defaultView&&(this.shadowRoot.innerHTML="      \n    <x-products_editor></x-products_editor>\n")}}])&&P(r.prototype,o),i&&P(r,i),Object.defineProperty(r,"prototype",{writable:!1}),u}(T(HTMLElement));customElements.define("x-main",D)}}]);