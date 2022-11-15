class Product {
    constructor() {
        this.product = {
            name: undefined,
            price: undefined,
            description: undefined
        }
        this.callback = undefined;
    }

    setCallback(callback) {
        this.callback = callback;
    }

    setProduct(name, price, description) {
        this.product = {
            name: name,
            price: price,
            description: description
        }
    }

    getList() {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        let callback = this.callback;
        xhr.open("GET", "api/products/list", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            callback(response, xhr.status);
        }
        xhr.send();
    }

    delete(deleteButtonValue) {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        let callback = this.callback;
        xhr.open("DELETE", "api/products/delete", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.setRequestHeader('Delete-row', parseInt(deleteButtonValue));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            callback(xhr.status); 
        }
        xhr.send();
    }

    add() {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        let callback = this.callback;
        xhr.open("POST", "api/products/add", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            callback(xhr.status);
        }
        xhr.send(JSON.stringify(this.product));
    }
}

export { Product };