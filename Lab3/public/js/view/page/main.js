var pageMain = (function() {
    var root = undefined;

    function loginPageDisplay() {
        router.render("loginPage");
    }

    function deleteButtonClickedCallback(status) {
        if(status == 200){
            getProductList();
            return;
        }
        if(response == 401){
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        } else {
            getProductList();
            return;
        }
    }

    function deleteButtonClicked() {
        var deleteButtonValue = this.value;
        console.log(deleteButtonValue);
        model.deleteProduct(deleteButtonValue, deleteButtonClickedCallback);
    }

    function addButtonClickedCallback(status) {
        if(status == 200) {
            getProductList();
            return;
        } else if(status == 401) {
            localStorage.removeItem('AutoSellUserToken');
            renderPage();
            return;
        } else {
            getProductList();
            return;
        }
    }
    
    function addButtonClicked() {
        var name = document.getElementById('ProductName').value;
        var price = document.getElementById('Price').value;
        var description = document.getElementById('Description').value;
        model.addProduct(name, price, description, addButtonClickedCallback);
    }

    function getProductsListCallback(response, status) {
        if(status == 401) {
            localStorage.removeItem('AutoSellUserToken');
            if(document.getElementById("productList") != null) root.removeChild(document.getElementById("productList"));
            renderPage();
            return;
        } else if (status == 200) {
            if(document.getElementById("productList") != null){
                root.removeChild(document.getElementById("productList"));
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
                td2.innerText = item.name;
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
            root.appendChild(productListMenu);
        } else {
            if(document.getElementById("productList") != null){
                root.removeChild(document.getElementById("productList"));
            }
        }
    }

    function getProductList() {
        model.getProductsList(getProductsListCallback);
    }

    function mainPageDisplay() {
        if (document.getElementById('loginDiv') != null) {
            root.removeChild(document.getElementById('loginDiv'));
        }
    
        var mainpage = document.createElement('div');
        mainpage.id = 'mainPage';
    
        var btn_exit = document.createElement('button');
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