import { User } from "../../model/userModel.js";
import router from "../router.js";

export default (function() {
    let root = undefined;

    function mainPageDisplay() {
        router.render("mainPage");
    }

    function registerButtonClicked() {
        router.render("registerPage");
    }

    function loginButtonClicked() {
        if (document.getElementById('login').value == '' || document.getElementById('password').value == '') {
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            let errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Failed to Login! Empty Login or Password!';
            document.getElementById('loginDiv').appendChild(errP);
            return;
        }
        else auth(document.getElementById('login').value, document.getElementById('password').value);
    }

    async function auth(login, password) {
        let user = new User();
        user.setUser(login, password, undefined);
        let result = await user.authQuery();
        if (result.status == 200) {
            localStorage.setItem('AutoSellUserToken', JSON.stringify(result.data));
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            let errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: blue; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Logined! Please, wait for pesponse...';
            document.getElementById('loginDiv').appendChild(errP);
            renderPage();
            return;
        }
        else if (result.status == 401) {
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            let errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Failed to Login! Invalid Login or Password.';
            document.getElementById('loginDiv').appendChild(errP);
        }
        else {
            if (document.getElementById('errLogin') != null) {
                document.getElementById('loginDiv').removeChild(document.getElementById('errLogin'));
            }
            let errP = document.createElement('p');
            errP.id = 'errLogin';
            errP.style = 'display: flex; width: 150px; justify-content: space-around; flex:auto; color: red; font-size: 0.8em; font-weight: bold;';
            errP.innerText = 'Server error! Try again.';
            document.getElementById('loginDiv').appendChild(errP);
        }
    }

    function loginPageDisplay() {
        if (document.getElementById('registerDiv') != null) {
            root.removeChild(document.getElementById('registerDiv'));
        }
        let div = document.createElement('div');
        div.id = 'loginDiv';
        div.className = 'div-loginPageDisplay WrapCenteredInlineBlock';
        let header = document.createTextNode('AutoSell');
        div.appendChild(header);
        
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
    
        let inp1 = document.createElement('input');
        let inp2 = document.createElement('input');
    
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
    
    
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.textContent = 'Login';
        btn1.type = 'submit';
        btn2.textContent = 'Register';
    
    
        let divBtn = document.createElement('div');
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