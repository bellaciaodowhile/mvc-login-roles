console.log('Login')
const bd = document.body, cur = document.querySelector('.cursor');
bd.addEventListener("mousemove", function(n) {
    (cur.style.left = n.clientX + "px"), (cur.style.top = n.clientY + "px");
});

const formLogin = el('.form__login');

submit({
    el: formLogin,
    res: function(res) {
        let u = formLogin.children[0].children[0].value
        let p = formLogin.children[1].children[0].value
        console.log({u,p})
        AJAXGJ8({
            url: 'Login/setLogin',
            data: [{ u, p }],
            success: function(res) {
                console.log(res)
                res = JSON.parse(res);
                if (res.status) {
                    window.location = BASE_URL + 'dashboard';
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});
