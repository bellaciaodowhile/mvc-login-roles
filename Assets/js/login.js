console.log('Login')
const bd = document.body, cur = document.querySelector('.cursor');
bd.addEventListener("mousemove", function(n) {
    (cur.style.left = n.clientX + "px"), (cur.style.top = n.clientY + "px");
});