class Product {
    constructor() {
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
            fetch('api/product/list',{method: 'GET', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('AutoSellUserToken')}})
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
            fetch('api/product/delete',{method: 'DELETE', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('AutoSellUserToken'),
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
            fetch('api/product/add',{method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8',
            'User-token': localStorage.getItem('AutoSellUserToken')}, 
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

export { Product };