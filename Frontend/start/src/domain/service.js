function generateUUID() {
    var dt = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        dt += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

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
            fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/users/auth',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
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
            fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/users/register',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify(this.user)})
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
            fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/product/list',{method: 'GET', headers: {'Content-Type': 'application/json;charset=utf-8',
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
            fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/product/delete',{method: 'DELETE', headers: {'Content-Type': 'application/json;charset=utf-8',
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
            fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/product/add',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8',
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

class SLAE extends Store {
    constructor() {
        super();
        this.wsID = generateUUID();
        console.log('WS ID: ' + this.wsID);
    }

    counter() {
        let ws = new WebSocket('ws://localhost:8080/mvn-start-1.0-SNAPSHOT/counter');
        ws.onopen = function(event) {
            console.log('WS counter was opened: ' + event);
            ws.send(this.wsID);      
        };
           
        ws.onmessage = function(event) {
            console.log('ws counter got message: ' + event.data);
        };
    }

    echo() {
        let ws = new WebSocket('ws://localhost:8080/mvn-start-1.0-SNAPSHOT/echo');
        ws.onopen = function(event) {
            console.log('WS echo was opened: ' + event);
            ws.send('Test WS message...');
        };
        
        ws.onmessage = function(event) {
            console.log('WS echo got mesage: ' + event.data);
            ws.close();
        };
    }

    counterAsync() {
        console.log('counterAsync before fetch: ' + this.wsID);  
        window.fetch('http://localhost:8080/mvn-start-1.0-SNAPSHOT/api/counter_async', { method: 'GET', headers: {'WebSocketID': this.wsID} })      
        .then(function(response) {        
            if (response.ok) {
                return response.text();
            }
            else {
                console.log('Error 1');
                console.log(response);
                throw "Response ERROR";
            }	  	  
        })
        .then(function(data) {
            console.log('counterAsync got result: ' + data); 
        })
        .catch(function(error) {
            console.log('Error 2');
            console.log(error);	
        });
    } 
}

class SLAEFactory {
    static _slae = null;
    static _createInstance() {
        return new SLAE();      
    }

    static createInstance() {
        if (SLAEFactory._slae === null) {
            SLAEFactory._slae = SLAEFactory._createInstance();
        }
        return SLAEFactory._slae;
    }
}

export {UserFactory, ProductFactory, SLAEFactory};