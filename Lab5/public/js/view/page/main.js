import { Product } from "../../model/productsModel.js";
import router from "../router.js";

export default (function() {
    let root = undefined;

    function loginPageDisplay() {
        router.render("loginPage");
    }

    async function deleteButtonClicked() {
        let deleteButtonValue = this.value;
        let product = new Product();
        let result = await product.delete(deleteButtonValue);
        if(result.status == 200){
            getProductList();
            return;
        }
        if(result.status == 401){
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        } else {
            getProductList();
            return;
        }
    }
    
    async function addButtonClicked() {
        let name = document.getElementById('ProductName').value;
        let price = document.getElementById('Price').value;
        let description = document.getElementById('Description').value;
        let product = new Product();
        product.setProduct(name, parseInt(price), description);
        let result = await product.add();
        if(result.status == 200) {
            getProductList();
            return;
        } else if(result.status == 401) {
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        } else {
            getProductList();
            return;
        }
    }

    async function getProductList() {
        let product = new Product();
        let result = await product.getList();
        if(result.status == 401) {
            localStorage.removeItem('AutoSellUserToken');
            if(document.getElementById("productList") != null) root.removeChild(document.getElementById("productList"));
            renderPage();
            return;
        } else if (result.status == 200) {
            if(document.getElementById("productList") != null){
                root.removeChild(document.getElementById("productList"));
            }
            let productListMenu = document.createElement('div');
            productListMenu.id = 'productList';
            productListMenu.className = 'productList';
        
            let inpProductName = document.createElement('input');
            inpProductName.className = "inpProductName-mainPageDisplay WrapCenteredInlineBlock";
            inpProductName.placeholder = "ProductName";
            inpProductName.id = "ProductName";
        
            let inpPrice = document.createElement('input');
            inpPrice.className = "inpPrice-mainPageDisplay WrapCenteredInlineBlock";
            inpPrice.placeholder = "Price";
            inpPrice.id = "Price";
        
            let inpDescription = document.createElement('input');
            inpDescription.className = "inpDescription-mainPageDisplay WrapCenteredInlineBlock";
            inpDescription.placeholder = "Description";
            inpDescription.id = "Description";
        
            let btnAdd = document.createElement('button');
            btnAdd.className = "btnAdd-mainPageDisplay WrapCenteredInlineBlock";
            btnAdd.textContent = 'Add';
            btnAdd.type = 'submit';
            btnAdd.addEventListener("click", addButtonClicked);
        
            let divAdd = document.createElement('div');
            divAdd.className = 'productListAdd';
        
            divAdd.appendChild(inpProductName);
            divAdd.appendChild(inpPrice);
            divAdd.appendChild(inpDescription);
            divAdd.appendChild(btnAdd);
        
            let table = document.createElement('table');
            table.className = "table-mainPageDisplay WrapCenteredInlineBlock";
            let th = document.createElement('tr');
            let tdh1 = document.createElement('th');
            tdh1.innerText = "ID";
            let tdh2 = document.createElement('th');
            tdh2.innerText = "ProductName";
            let tdh3 = document.createElement('th');
            tdh3.innerText = "Price";
            let tdh4 = document.createElement('th');
            tdh4.innerText = "Description";
            let tdh5 = document.createElement('th');
        
            th.appendChild(tdh1);
            th.appendChild(tdh2);
            th.appendChild(tdh3);
            th.appendChild(tdh4);
            th.appendChild(tdh5);
            table.appendChild(th);
        
            result.data.forEach(function(item){
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                td1.innerText = item.id;
                let td2 = document.createElement('td');
                td2.innerText = item.name;
                let td3 = document.createElement('td');
                td3.innerText = item.price;
                let td4 = document.createElement('td');
                td4.innerText = item.description;
                let td5 = document.createElement('td');
                let currentButton = document.createElement('button');
                currentButton.className = "currentButtonDelete";
                currentButton.textContent = 'Delete';
                currentButton.type = 'submit';
                currentButton.value = item.id;
                currentButton.addEventListener("click", deleteButtonClicked);
                td5.appendChild(currentButton);
        
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                table.appendChild(tr);
            });
            productListMenu.appendChild(divAdd);
            productListMenu.appendChild(table);
            root.appendChild(productListMenu);
        } else {
            if(document.getElementById("productList") != null){
                root.removeChild(document.getElementById("productList"));
            }
        }
    }

    function mainPageDisplay() {
        if (document.getElementById('loginDiv') != null) {
            root.removeChild(document.getElementById('loginDiv'));
        }
    
        let mainpage = document.createElement('div');
        mainpage.id = 'mainPage';
    
        let btn_exit = document.createElement('button');
        btn_exit.className = "ExitButton";
    
        btn_exit.textContent = 'Exit';
        btn_exit.addEventListener("click", function(){
            localStorage.removeItem('AutoSellUserToken');
            root.removeChild(document.getElementById('mainPage'));
            if(document.getElementById("productList") != null) root.removeChild(document.getElementById("productList"));
            renderPage();
        });
    
        mainpage.appendChild(btn_exit);
        root.appendChild(mainpage);
        getProductList();
    }

    function renderPage() {
        if(localStorage.getItem('AutoSellUserToken') == null){
            loginPageDisplay();
        }
        else {
            mainPageDisplay();
        }
    }

    function init(rootParam) {
        root = rootParam; 
        renderPage();
    }

    return {
        render: init  
    };
}
)();