AJAXGJ8({
    url: 'Home/dashboard',
    data: [{
        nombre: 'August',
        apellido: 'Lizardi'
    }],
    success: function(res) {
        console.log(res)
    },
    error: function(res) {
        console.error(res)
    }
});