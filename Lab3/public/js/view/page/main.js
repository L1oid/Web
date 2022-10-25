var pageMain = (function() {
    var body = undefined;

    function loginPageDisplay() {
        pageLogin.render(body);
    }

    function deleteButtonClickedCallback(response) {
        console.log(response)
        if(response == 'row_deleted'){
            getProductList();
            return;
        }
        if(response == "tokenError"){
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        }
    }

    function deleteButtonClicked() {
        var deleteButtonValue = this.value;
        console.log(deleteButtonValue);
        model.deleteProduct(deleteButtonValue, deleteButtonClickedCallback);
    }

    function addButtonClickedCallback(response) {
        console.log(response);
        if(response == 'row_added') {
            getProductList();
            return;
        }
        if(response == "tokenError") {
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        }
    }
    
    function addButtonClicked() {
        var name = document.getElementById('ProductName').value;
        var price = document.getElementById('Price').value;
        var description = document.getElementById('Description').value;
        model.addProduct(name, price, description, addButtonClickedCallback);
    }

    function getProductsListCallback(response) {
        if(response == 'tokenError'){
            console.log("Error");
            localStorage.removeItem('AutoSellUserToken');
            if(document.getElementById("productList") != null) body.removeChild(document.getElementById("productList"));
            setTimeout(startPage, 100);
            return;
        };
        if(response == 'RequestError'){
            console.log("Error");
            return;
        };
        if(document.getElementById("productList") != null){
            body.removeChild(document.getElementById("productList"));
        }
        var productListMenu = document.createElement('div');
        productListMenu.id = 'productList';
        productListMenu.className = 'productList';
    
        var inpProductName = document.createElement('input');
        inpProductName.className = "inpProductName-mainPageDisplay WrapCenteredInlineBlock";
        inpProductName.placeholder = "ProductName";
        inpProductName.id = "ProductName";
    
        var inpPrice = document.createElement('input');
        inpPrice.className = "inpPrice-mainPageDisplay WrapCenteredInlineBlock";
        inpPrice.placeholder = "Price";
        inpPrice.id = "Price";
    
        var inpDescription = document.createElement('input');
        inpDescription.className = "inpDescription-mainPageDisplay WrapCenteredInlineBlock";
        inpDescription.placeholder = "Description";
        inpDescription.id = "Description";
    
        var btnAdd = document.createElement('button');
        btnAdd.className = "btnAdd-mainPageDisplay WrapCenteredInlineBlock";
        btnAdd.textContent = 'Add';
        btnAdd.type = 'submit';
        btnAdd.addEventListener("click", addButtonClicked);
    
        var divAdd = document.createElement('div');
        divAdd.className = 'productListAdd';
    
        divAdd.appendChild(inpProductName);
        divAdd.appendChild(inpPrice);
        divAdd.appendChild(inpDescription);
        divAdd.appendChild(btnAdd);
    
        var table = document.createElement('table');
        table.className = "table-mainPageDisplay WrapCenteredInlineBlock";
        var th = document.createElement('tr');
        var tdh1 = document.createElement('th');
        tdh1.innerText = "ID";
        var tdh2 = document.createElement('th');
        tdh2.innerText = "ProductName";
        var tdh3 = document.createElement('th');
        tdh3.innerText = "Price";
        var tdh4 = document.createElement('th');
        tdh4.innerText = "Description";
        var tdh5 = document.createElement('th');
    
        th.appendChild(tdh1);
        th.appendChild(tdh2);
        th.appendChild(tdh3);
        th.appendChild(tdh4);
        th.appendChild(tdh5);
        table.appendChild(th);
    
        response.forEach(function(item){
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerText = item.id;
            var td2 = document.createElement('td');
            td2.innerText = item.productName;
            var td3 = document.createElement('td');
            td3.innerText = item.price;
            var td4 = document.createElement('td');
            td4.innerText = item.description;
            var td5 = document.createElement('td');
            var currentButton = document.createElement('button');
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
        body.appendChild(productListMenu);
    }

    function getProductList() {
        model.getProductsList(getProductsListCallback);
    }

    function mainPageDisplay() {
        if (document.getElementById('loginDiv') != null) {
            body.removeChild(document.getElementById('loginDiv'));
        }
    
        var mainpage = document.createElement('div');
        mainpage.id = 'mainPage';
    
        var btn_exit = document.createElement('button');
        btn_exit.className = "ExitButton";
    
        btn_exit.textContent = 'Exit';
        btn_exit.addEventListener("click", function(){
            localStorage.removeItem('AutoSellUserToken');
            body.removeChild(document.getElementById('mainPage'));
            if(document.getElementById("productList") != null) body.removeChild(document.getElementById("productList"));
            renderPage();
        });
    
        mainpage.appendChild(btn_exit);
        body.appendChild(mainpage);
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

    function init(bodyParam) {
        body = bodyParam; 
        renderPage();
    }

    return {
        render: init  
    };
}
)();