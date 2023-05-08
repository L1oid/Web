import Message from "./dto/message";

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
            fetch('http://localhost:8080/server-1.0/api/users/auth',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
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
            fetch('http://localhost:8080/server-1.0/api/users/register',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
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

class Product extends Store {
    constructor() {
        super();
        this.product = {
            name: undefined,
            price: undefined,
            description: undefined
        }
    }

    setProduct(name, price, description) {
        this.product = {
            name: name,
            price: price,
            description: description
        }
    }

    getList() {
        return new Promise( (resolve) => {
            let status;
            fetch('http://localhost:8080/server-1.0/api/product/list',{method: 'GET', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('MyStudyOrganaizedUserToken')}})
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

    delete(deleteButtonValue) {
        return new Promise( (resolve) => {
            let status;
            fetch('http://localhost:8080/server-1.0/api/product/delete',{method: 'DELETE', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('MyStudyOrganaizedUserToken'),
            'Delete-row': parseInt(deleteButtonValue)}})
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

    add() {
        return new Promise( (resolve) => {
            let status;
            fetch('http://localhost:8080/server-1.0/api/product/add',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('MyStudyOrganaizedUserToken')}, 
            body: JSON.stringify(this.product)})
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

class ProductFactory {
    static _product = null;
    static _createInstance() {
        return new Product();      
    }
       
    static createInstance() {
        if (ProductFactory._product === null) {
            ProductFactory._product = ProductFactory._createInstance();
        }
        return ProductFactory._product;
    }
}

class Chat extends Store {
    _getMessage(message) {
        this._emit(JSON.parse(message));
    }

    open(login) {
        this.username = login
        this.connection = new WebSocket('ws://localhost:8080/server-1.0/chat/' + this.username);
        this.connection.onmessage = (event) => {
            this._getMessage(event.data);
        };
    }

    close() {
        this.connection.close(1000, "Complete");
    }

    send(text) {
        const message = new Message();
        message.text = text;
        this.connection.send(JSON.stringify(message));
    }
}

class ChatFactory {
    static _slae = null;
    static _createInstance() {
        return new Chat();      
    }

    static createInstance() {
        if (ChatFactory._slae === null) {
            ChatFactory._slae = ChatFactory._createInstance();
        }
        return ChatFactory._slae;
    }
}

export {UserFactory, ProductFactory, ChatFactory};