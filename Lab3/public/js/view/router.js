var router = (function() {
    
    var root;

    var loginPage = {
        id: "loginPage",
        render: function (root) {
            pageLogin.render(root);
        }
    };

    var registerPage = {
        id: "registerPage",
        render: function (root) {
            pageRegister.render(root);
        }
    };

    var mainPage = {
        id: "mainPage",
        render: function (root) {
            pageMain.render(root);
        }
    };

    pages = [loginPage, registerPage, mainPage]

    function startPage(rootParam) {
        root = rootParam
        loginPage.render(root);
    }

    function renderPage(pageId) {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id == pageId) {
                pages[i].render(root);
            }
        }
    }

    return {
        render: renderPage,
        start: startPage
    };
})();