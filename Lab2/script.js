var body = document.getElementById('body');

function startPage() {
    if(localStorage.getItem('AutoSellUserToken') == null){
        loginForm();
        return;
    }

    displayMainPage();
}

function displayMainPage() {
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
        startPage();
    });

    mainpage.appendChild(btn_exit);
    body.appendChild(mainpage);
    getProductList();
}

function productListRender(response) {
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
    inpProductName.className = "inpProductName-displayMainPage WrapCenteredInlineBlock";
    inpProductName.placeholder = "ProductName";
    inpProductName.id = "ProductName";

    var inpPrice = document.createElement('input');
    inpPrice.className = "inpPrice-displayMainPage WrapCenteredInlineBlock";
    inpPrice.placeholder = "Price";
    inpPrice.id = "Price";

    var inpDescription = document.createElement('input');
    inpDescription.className = "inpDescription-displayMainPage WrapCenteredInlineBlock";
    inpDescription.placeholder = "Description";
    inpDescription.id = "Description";

    var btnAdd = document.createElement('button');
    btnAdd.className = "btnAdd-displayMainPage WrapCenteredInlineBlock";
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
    table.className = "table-displayMainPage WrapCenteredInlineBlock";
    var th = document.createElement('tr');
    var tdh1 = document.createElement('th');
    tdh1.innerText = "ID";
    var tdh2 = document.createElement('th');
    tdh2.innerText = "ProductName";
    var tdh3 = document.createElement('th');
    tdh3.innerText = "Price";
    var tdh4 = document.createElement('th');
    tdh4.innerText = "Description";

    th.appendChild(tdh1);
    th.appendChild(tdh2);
    th.appendChild(tdh3);
    th.appendChild(tdh4);
    table.appendChild(th);

    response.forEach(function(item, i, arr){
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerText = item.id;
        var td2 = document.createElement('td');
        td2.innerText = item.productName;
        var td3 = document.createElement('td');
        td3.innerText = item.price;
        var td4 = document.createElement('td');
        td4.innerText = item.description;      

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);
    });
    productListMenu.appendChild(divAdd);
    productListMenu.appendChild(table);
    body.appendChild(productListMenu);
}

function getProductList(){
    if(localStorage.getItem('AutoSellUserToken') == null || localStorage.getItem('AutoSellUserToken') == undefined){
        return "tokenError";
    }
    var xhr = new XMLHttpRequest();
    var flagAsync = false;
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
            productListRender(response);
        } 
    }
    xhr.send();
}

function loginForm() {

    if (document.getElementById('registerDiv') != null) {
        body.removeChild(document.getElementById('registerDiv'));
    }
    var div = document.createElement('div');
    div.id = 'loginDiv';
    div.className = 'div-loginForm WrapCenteredInlineBlock';
    var header = document.createTextNode('AutoSell');
    div.appendChild(header);
    
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');

    var inp1 = document.createElement('input');
    var inp2 = document.createElement('input');

    inp1.name = 'login';
    inp1.id = 'login';
    inp2.name = 'password';
    inp2.id = 'password';
    inp2.type = 'password';

    inp1.placeholder = 'Login';
    inp2.placeholder = 'Password';

    p1.appendChild(inp1);
    p2.appendChild(inp2);


    div.appendChild(p1);
    div.appendChild(p2);


    var btn1 = document.createElement('button');
    var btn2 = document.createElement('button');
    btn1.textContent = 'Login';
    btn1.type = 'submit';
    btn2.textContent = 'Register';


    var divBtn = document.createElement('div');
    divBtn.id = 'LoginButtons'
    divBtn.className = 'div-twoButtonsContainer';

    divBtn.appendChild(btn1);
    divBtn.appendChild(btn2);

    div.appendChild(divBtn);
    body.appendChild(div);

    btn1.addEventListener("click", loginButtonClicked);
    inp1.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            loginButtonClicked();
        }
    });

    inp2.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            loginButtonClicked();
        }
    });

    btn2.addEventListener("click", registerPageDisplay);

}

function registerPageDisplay() {
    body.removeChild(document.getElementById('loginDiv'));
    var div = document.createElement('div');
    div.id = 'registerDiv';
    div.className = 'div-loginForm WrapCenteredInlineBlock';
    
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');

    var inp1 = document.createElement('input');
    var inp2 = document.createElement('input');
    var inp3 = document.createElement('input');

    inp1.name = 'new_login';
    inp1.id = 'new_login';
    inp2.name = 'new_password';
    inp2.id = 'new_password';
    inp2.type = 'new_password';
    inp3.name = 'new_email';
    inp3.id = 'new_email';

    inp1.placeholder = 'New Login';
    inp2.placeholder = 'New Password';
    inp3.placeholder = 'New E-Mail';

    p1.appendChild(inp1);
    p2.appendChild(inp2);
    p3.appendChild(inp3);


    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    var btn1 = document.createElement('button');
    var btn2 = document.createElement('button');
    btn1.textContent = 'Reg and Login';
    btn2.textContent = 'Go Back';

    var divBtn = document.createElement('div');
    divBtn.id = 'RegisterButtons'
    divBtn.className = 'div-twoButtonsContainer';

    divBtn.appendChild(btn1);
    divBtn.appendChild(btn2);

    div.appendChild(divBtn);
    body.appendChild(div);

    btn1.addEventListener("click", registerButtonClicked);
    btn2.addEventListener("click", loginForm);

    inp1.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            registerButtonClicked();
        }
    });

    inp2.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            registerButtonClicked();
        }
    });

    inp3.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            registerButtonClicked();
        }
    });
}
function addButtonClicked() {
    var xhr = new XMLHttpRequest();
    var name = document.getElementById('ProductName').value;
    var price = document.getElementById('Price').value;
    var description = document.getElementById('Description').value;
    var product = {
        productName: name,
        price: parseInt(price),
        description: description
    }
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
            console.log(response);
            if(response == 'row_added'){
                setTimeout(getProductList, 0);
                return;
            }

            if(response == "tokenError"){

                alert("Ошибка авторизации! Выполните повторный вход!");
                localStorage.removeItem('WFSAppUserToken');
                setTimeout(startPage, 0);
                return;
            }else{
                alert("Неизвестная ошибка. Попробуйте ещё раз!");
            }
        }
    }
    xhr.send(JSON.stringify(product));

}

function loginButtonClicked() {
    if ((document.getElementById('login').value == '' || document.getElementById('password').value == '') && document.getElementById('errLogin') == null) {
        var errP = document.createElement('p');
        errP.id = 'errLogin';
        errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
        errP.innerText = 'Failed to Login! Error: Empty Login or Password!';
        document.getElementById('loginDiv').appendChild(errP);
        return;
    }
    else authQuerry(document.getElementById('login').value, document.getElementById('password').value);
}

function authQuerry(username, password) {
    var xhr = new XMLHttpRequest();
    var authUser = {
        login: username,
        password: password
    }
    console.log(authUser);
    var flagAsync = true;
    xhr.open("POST", "api/auth", flagAsync);
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (xhr.status !== 200) {  
            console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
        } else { 
            var response = JSON.parse(xhr.responseText);   
            setTimeout(authLogic(response, username), 0);
        } 
    }
    xhr.send(JSON.stringify(authUser));
}

function authLogic(response) {
    if (response.payload !== null && response.payload !== undefined) {
        localStorage.setItem('AutoSellUserToken', JSON.stringify(response));
        if (document.getElementById('errLogin') != null) {
            document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
        } else {
            var errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: blue; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Logined! Please, wait for pesponse...';
            document.getElementById('loginDiv').appendChild(errP);
        }
        startPage();
        return;
    }
    if (document.getElementById('errLogin') == null) {
        var errP = document.createElement('p');
        errP.id = 'errLogin';
        errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
        errP.innerText = 'Failed to Login! Error: Invalid Login or Password!';
        document.getElementById('loginDiv').appendChild(errP);
    }
}

function registerButtonClicked() {
    if ((document.getElementById('new_login').value == '' || document.getElementById('new_password').value == '' || document.getElementById('new_email').value == '') && document.getElementById('errRegister') == null) {
        var errP = document.createElement('p');
        errP.id = 'errRegister';
        errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
        errP.innerText = 'Failed to Register! Error: Empty Login or Password!';
        document.getElementById('registerDiv').appendChild(errP);
        return;
    } else setTimeout(registerQuery(document.getElementById('new_login').value, document.getElementById('new_password').value, document.getElementById('new_email').value), 0); 
}

function registerQuery(username, password, email) {
    var user = {
        login : username,
        password : password,
        email : email
    };
    var xhr = new XMLHttpRequest();
    var flagAsync = true;
    var uri = "./api/user";
    xhr.open("POST", uri, flagAsync)
    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status !== 200) {
            console.log( "Request error: " + xhr.status + ': ' + xhr.statusText );
        } else {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            setTimeout(registerLogic(response), 0);
        }
    }
    xhr.send(JSON.stringify(user));
}

function registerLogic(response) {
    if (response == "createUser_Ok_status") {
        if (document.getElementById('errRegister') == null) {
            var errP = document.createElement('p');
            errP.id = 'errRegister';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: blue; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Register is complete! Please, go back to login!';
            document.getElementById('registerDiv').appendChild(errP);
            return;
        }
        if (document.getElementById('errRegister') != null) {
            if (document.getElementById('errRegister').innerText == 'User already exist or undefined error! Try another login or email!'){
                document.getElementById('errRegister').style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: blue; font-size: 0.8em; font-weight: bold;';
                document.getElementById('errRegister').innerText = 'Register is complete! Please, go back to login!';
            }
        }
    } else if (response == "userIsExistStatus") {
        if (document.getElementById('errRegister') == null) {
            var errP = document.createElement('p');
            errP.id = 'errRegister';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'User already exist or undefined error! Try another login or email!';
            document.getElementById('registerDiv').appendChild(errP);
            return;
        } else {
            if (document.getElementById('errRegister').innerText == 'Register is complete! Please, go back to login!'){
                document.getElementById('errRegister').style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
                document.getElementById('errRegister').innerText = 'User already exist or undefined error! Try another login or email!';
            }
        }
    } else {
        if (document.getElementById('errRegister') == null) {
            var errP = document.createElement('p');
            errP.id = 'errRegister';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'User already exist or undefined error! Try another login or email!';
            document.getElementById('registerDiv').appendChild(errP);
            return;
        } else {
            if (document.getElementById('errRegister').innerText == 'Register is complete! Please, go back to login!') {
                document.getElementById('errRegister').style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
                document.getElementById('errRegister').innerText = 'User already exist or undefined error! Try another login or email!';
            }
        }
    }
}

startPage();