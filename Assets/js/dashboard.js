console.log('Dashboard')
const allItemsMoreNav = [...document.querySelectorAll('.nav__item')];

allItemsMoreNav.map(function (item) {
    if (item.querySelector('.nav__item-content') != null) {
        let head = item.querySelector('.nav__item-head');
        head.onclick = function (e) {
            e.preventDefault();
            let height = 0;
            let content = head.nextElementSibling
            let cHeight = content.clientHeight;
            console.log(content)
            if (cHeight == '0') {
                height = content.scrollHeight;
            }
            console.log(height)
            content.style.height = `${ height }px`

        }
    }
});

const dropdownComponents = [...document.querySelectorAll('.dropdown__component')];
dropdownComponents.map(function (dropdown) {
    let trigger = dropdown.querySelector('.dropdown__icon');
    let content = dropdown.querySelector('.dropdown__content');
    trigger.addEventListener('click', triggerContent);

    function triggerContent(e) {
        e.preventDefault();

        content.classList.toggle('dropdown__content--active')

    }
})