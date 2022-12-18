class User {
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

export { User };