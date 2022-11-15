var model = (function() {
    function _authQuerry(username, password, callback) {
        var user = {
            login: username,
            password: password
        }
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        xhr.open("POST", "api/users/auth", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            callback(response, xhr.status);
        }
        xhr.send(JSON.stringify(user));
    }

    function _registerQuery(username, password, email, callback) {
        var user = {
            login : username,
            password : password,
            email : email
        };
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        xhr.open("POST", "api/users/register", flagAsync)
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            callback(response, xhr.status);
        }
        xhr.send(JSON.stringify(user));
    }

    function _getProductsList(callback) {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
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

    function _deleteProduct(deleteButtonValue, callback) {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
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

    function _addProduct(name, price, description, callback) {
        var product = {
            name: name,
            price: parseInt(price),
            description: description
        }
        var xhr = new XMLHttpRequest();
        console.log(product);
        var flagAsync = true;
        xhr.open("POST", "api/products/add", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            callback(xhr.status);
        }
        xhr.send(JSON.stringify(product));
    }

    return {
        authQuerry: _authQuerry,
        registerQuery: _registerQuery,
        getProductsList: _getProductsList,
        deleteProduct: _deleteProduct,
        addProduct: _addProduct
    };
})();