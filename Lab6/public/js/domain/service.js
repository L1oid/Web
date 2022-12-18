class Store {
    constructor() {
        this._callbacks = [];
    }
    
    _emit(state) {
        this._callbacks.forEach(callback => callback(state));
    }

    subscribe(callback) {
        this._callbacks.push(callback);  
    }
}

class User extends Store {
    constructor() {
        super();
        this.user = {
            login: undefined,
            password: undefined,
            email: undefined
        }
    }

    setUser(login, password, email) {
        this.user = {
            login: login,
            password: password,
            email: email
        }
    }

    authQuery() {
        return new Promise( (resolve) => {
            let status;
            fetch('api/users/auth',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
            .then( (response) => { 
                status = response.status;
                return response.json()
            })
            .then( (data) => {
                let result = {
                    status: status,
                    data: data
                }
                resolve(result);            
            });
        });
    }

    registerQuery() {
        return new Promise( (resolve) => {
            let status;
            fetch('api/users/register',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
            .then( (response) => { 
                status = response.status;
                return response.json()
            })
            .then( (data) => {
                let result = {
                    status: status,
                    data: data
                }
                resolve(result);            
            });
        });
    }
}

 class UserFactory {
    static _user = null;
    static _createInstance() {
        return new User();      
    }
       
    static createInstance() {
        if (UserFactory._user === null) {
            UserFactory._user = UserFactory._createInstance();
        }
        return UserFactory._user;
    }
}

export {UserFactory};