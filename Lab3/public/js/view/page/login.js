var pageLogin = (function() {
    var root = undefined;

    function mainPageDisplay() {
        pageMain.render(root);
    }

    function registerButtonClicked() {
        pageRegister.render(root);
    }

    function loginButtonClicked() {
        if (document.getElementById('login').value == '' || document.getElementById('password').value == '') {
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            var errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Failed to Login! Error: Empty Login or Password!';
            document.getElementById('loginDiv').appendChild(errP);
            return;
        }
        else authQuerry(document.getElementById('login').value, document.getElementById('password').value);
    }

    function authQuerryCallback(response) {
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
            renderPage();
            return;
        }
        else {
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            var errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Failed to Login! Error: Invalid Login or Password!';
            document.getElementById('loginDiv').appendChild(errP);
        }
    }

    function authQuerry(login, password) {
        model.authQuerry(login, password, authQuerryCallback);
    }

    function loginPageDisplay() {
        if (document.getElementById('registerDiv') != null) {
            root.removeChild(document.getElementById('registerDiv'));
        }
        var div = document.createElement('div');
        div.id = 'loginDiv';
        div.className = 'div-loginPageDisplay WrapCenteredInlineBlock';
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
        root.appendChild(div);
    
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
        btn2.addEventListener("click", registerButtonClicked);
    }

    function renderPage() {
        if(localStorage.getItem('AutoSellUserToken') == null) {
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
})();