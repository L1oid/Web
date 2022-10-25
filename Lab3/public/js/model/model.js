var model = (function() {
    function _authQuerry(username, password, callback) {
        var user = {
            login: username,
            password: password
        }
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        xhr.open("POST", "api/auth", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (xhr.status !== 200) {  
                console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(response);
            } else { 
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(response);
            } 
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
        xhr.open("POST", "api/register", flagAsync)
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status !== 200) {
                console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(response);
            } else {
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(response);
            }
        }
        xhr.send(JSON.stringify(user));
    }

    function _getProductsList(callback) {
        if(localStorage.getItem('AutoSellUserToken') == null || localStorage.getItem('AutoSellUserToken') == undefined) {
            return "tokenError";
        }
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        xhr.open("GET", "api/getProducts", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (xhr.status !== 200) {  
                console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
                return "RequestError";
            } 
            else { 
                var response = JSON.parse(xhr.responseText);
                console.log(response);  
                callback(response);
            } 
        }
        xhr.send();
    }

    function _deleteProduct(deleteButtonValue, callback) {
        var xhr = new XMLHttpRequest();
        var flagAsync = true;
        xhr.open("DELETE", "api/deleteProduct", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.setRequestHeader('Delete-row', parseInt(deleteButtonValue));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (xhr.status !== 200) {  
                console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
                return "RequestError";
            } 
            else { 
                var response = JSON.parse(xhr.responseText);
                callback(response);
            } 
        }
        xhr.send();
    }

    function _addProduct(name, price, description, callback) {
        var product = {
            productName: name,
            price: parseInt(price),
            description: description
        }
        var xhr = new XMLHttpRequest();
        console.log(product);
        var flagAsync = true;
        xhr.open("POST", "api/addProduct", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('User-token', localStorage.getItem('AutoSellUserToken'));
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (xhr.status !== 200) {  
                console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
            } else {
                var response = JSON.parse(xhr.responseText);
                callback(response);
            }
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