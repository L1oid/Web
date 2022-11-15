class User {
    constructor() {
        this.user = {
            login: undefined,
            password: undefined,
            email: undefined
        }
        this.callback = undefined;
    }

    setCallback(callback) {
        this.callback = callback;
    }

    setUser(login, password, email) {
        this.user = {
            login: login,
            password: password,
            email: email
        }
    }

    authQuery() {
        let xhr = new XMLHttpRequest();
        let flagAsync = true;
        let callback = this.callback;
        xhr.open("POST", "api/users/auth", flagAsync);
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            callback(response, xhr.status);
        }
        xhr.send(JSON.stringify(this.user));
    }

    registerQuery() {
        let xhr = new XMLHttpRequest();
        let flagAsync = true;
        let callback = this.callback;
        xhr.open("POST", "api/users/register", flagAsync)
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            console.log( "Request status: " + xhr.status + ' | status text: ' + xhr.statusText + ' | response text: ' + xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            callback(response, xhr.status);
        }
        xhr.send(JSON.stringify(this.user));
    }
}

export { User };