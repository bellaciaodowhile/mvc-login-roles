/** 
 * @param { Object } Object - receives url, data, success, error
 * @param { Object.url } url - url/api
 * @param { Object.data } data @type { Array } - Array of object { name: 'name' }
 * @param { Object.success } success - Return success function
 * @param { Object.error } error - Return error function
 */
console.log('APP JS')
function AJAXGJ8({
    url,
    data = [],
    success,
    error
}) {
    let req = (window.XMLHttpRequest) ? new XMLHttpRequest() : ActiveXObject('Microsoft.XMLHTTP');
    req.open("POST", BASE_URL + url, true);

    function dataFn() {
        let insideData = '';
        data.map((x) => {
            Object.keys(x).map((field, indexField) => {
                if (indexField == 0) {
                    insideData += Object.keys(x)[indexField] + '=' + (Array.isArray(Object.values(x)[indexField]) ? JSON.stringify(Object.values(x)[indexField]) : Object.values(x)[indexField].trim())
                } else {
                    insideData += '&' + Object.keys(x)[indexField] + '=' + (Array.isArray(Object.values(x)[indexField]) ? JSON.stringify(Object.values(x)[indexField]) : (typeof Object.values(x)[indexField] == 'string' ? Object.values(x)[indexField].trim() : Object.values(x)[indexField]))
                }
            })
            if (data.length > 1) {
                insideData += '__';
            }
        });
        if (data.length > 1) {
            insideData = 'arrData=' + JSON.stringify(data);
        }
        return insideData;
    }
    // console.log(dataFn())
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(dataFn())
    req.onreadystatechange = (e) => {
        if (req.readyState == 4 && req.status == 200) {
            if (req.status == 200) {
                success(req.responseText);
            } else {
                error(req.status);
            }
        }
    }
}
/**
 * 
 * @param { Object } Object - receives el and res
 * @param { Object.el } el - receives HTMLElement for click
 * @param { Object.res } res - return function
 * @return { EventTarget } - return events
 */
function onclick({
    el,
    res
}) {
    console.log(el)
    if (typeof el == 'string') {
        if (el != null || el != undefined) {
            document.querySelector(el).onclick = (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                res(e);
            }
        }
    } else {
        if (el != null) {
            el.onclick = (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                res(e);
            }
        }
    }

    // if (typeof el == 'Object') {
    //     el.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         e.stopImmediatePropagation();
    //         res(e);
    //     });
    // } else {
    //     document.querySelector(el).addEventListener('click', (e) => {
    //         e.preventDefault();
    //         e.stopImmediatePropagation();
    //         res(e);
    //     });
    // }
    

}
// View Html
function viewHtml({
    el,
    content
}) {
    if (el != undefined) {
        el.innerHTML += content;
        rippleFunction();
        switchs();
    }
}

// Clean Html
function cleanHtml(el) {
    if (el) {
        el.innerHTML = '';
    }
}
// Element Valid 
function validElement(el) {
    if (el) {
        return el;
    }
}
// ChangeStatus 
function changeStatusCheckbox(el) {
    if (el.getAttribute('checked')) {
        el.removeAttribute('checked')
    } else {
        el.setAttribute('checked', true)
    }
    return el.checked;
}
/**
 * 
 * @param { Selector } el 
 * @returns HTMLElement
 */
function el(el) {
    return document.querySelector(el)
}
/**
 * 
 * @param { Object } Object - receive @param { HTMLElement } el
 * @returns { Function } res
 */
function submit({
    el,
    res
}) {

    if (el != null) {
        el.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            res(e);
        });
    }
}
/**
 * Temporary
 * @param { HTMLElement } el 
 * @returns { Boolean }
 */
function changeStatusRol(el) {
    console.log(el)
    if (el.classList.contains('swicht__off')) {
        return 0;
    } else {
        return 1;
    }
    // if (el.getAttribute('checked')) {
    //     el.removeAttribute('checked')
    //     el.style.transform = 'scale(1)'
    //     // console.log('Off')
    // } else {
    //     el.setAttribute('checked', true)
    //     el.style.transform = 'scale(1.5)'
    //     // console.log('On')
    // }
    // let output = !!el.getAttribute('checked') || false
    // return output;
}
/**
 * 
 * @param { Selector } el 
 * @returns { Array }
 */
function getAllElements({
    el
}) {
    return [...document.querySelectorAll(el)];
}
// Documentar
// * Buttons Ripple
function rippleFunction() {
    const elementsWithRipple = document.querySelectorAll('[ripple]');

elementsWithRipple.forEach(elementWithRipple => {
    elementWithRipple.addEventListener('pointerdown', (mouseEvent) => {
        // Create a ripple element <div class="ripple">
        const rippleEl = document.createElement('div');
        rippleEl.classList.add('ripple');

        // Position the ripple
        const x = mouseEvent.offsetX;
        const y = mouseEvent.offsetY;

        rippleEl.style.left = `${x}px`;
        rippleEl.style.top = `${y}px`;

        elementWithRipple.appendChild(rippleEl);

        requestAnimationFrame(() => {
            rippleEl.classList.add('run');
        });

        // Remove ripple element when the transition is done
        rippleEl.addEventListener('transitionend', () => {
            rippleEl.remove();
        });
    });
});
}
rippleFunction();

// * Modal

let modals = [];


let modalsTrigger = getAllElements({
    el: '[data-toggle="modal"]'
});
modalsTrigger.map(btn => {
    onclick({el: btn, res: (e) => {
        let id = btn.getAttribute('data-target');
        openModal(id);
    }});
});
let modalsClose = getAllElements({
    el: '[data-dismiss="modal"]'
});
modalsClose.map(btn => {
    onclick({el: btn, res: (e) => {
        let id = '#' + btn.closest('.modal').getAttribute('id');
        console.log(id)
        closeModal(id);
    }});
});

function openModal(id) {
    let modal = document.querySelector(id);
    console.log(modal)
    modal.classList.toggle('modal--active');
    modals.push(modal);
    closeContains(modal)
}

function closeModal(id) {
    let modal = document.querySelector(id);
    modal.classList.toggle('modal--active');
    modals.splice(modals.indexOf(modal), 1);
}
function closeContains(modal) {
    console.log(modal)
    modal.addEventListener('click', function (e) {
        e.stopImmediatePropagation()
        let content = modal.querySelector(`.modal__content`);
        if (!content.contains(e.target)) {
            let id = '#' + modal.getAttribute('id');
            closeModal(id);
        }
    });
}


// Select
const selectsAll = getAllElements({ el: '.select' });
console.log(selectsAll)
selectsAll.map(select => {
    console.log(select)
    onclick({ el: select, res:(res) => {
        select.classList.toggle('select--active');
        let content = select.querySelector('.select__content');
        let label = select.querySelector('.select__header__label');
        let items = [...select.querySelectorAll('.select__content-item')];
        content.classList.toggle('select__content--active');
        items.map(item => {
            if (item.contains(res.target)) {
                if (label.textContent != item.textContent) {
                    select.classList.add('select--valid');
                    label.textContent = item.textContent
                }
            }
        })
    }});
});

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
});

function switchs() {
    const switchs = [...document.querySelectorAll('.switch .switch__label')];
    switchs.map(x => {
        x.addEventListener('click', (e) => {
            e.preventDefault();
            x.classList.toggle('switch__off')
        });
    });
}
switchs();


const subtabsGj8 = [...document.querySelectorAll('.main-parent-subtabs-gj8')];
subtabsGj8.map((main, index) => {
    let mainTabsSubtabs = [...main.querySelectorAll('.tab-trigger-subtabs-gj8')];
    let contentTabsSubtabs = [...main.querySelectorAll('.tab-content-subtabs-gj8')];
    mainTabsSubtabs.map((tabTrigger, iTrigger) => {
        tabTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            contentTabsSubtabs.map((content, iContent) => {
                if (iContent == iTrigger) {
                    content.style.display = 'block'
                    mainTabsSubtabs[iContent].classList.add('active')
                } else {
                    content.style.display = 'none'
                    mainTabsSubtabs[iContent].classList.remove('active')
                }
            });
        });
    });
});











// ! Por ahora de último [ARREGLAR ESTO OJO QUE NO HAGA CLICK EN TODA LA VENTANA]
// window.onclick = function (event) {
//     for (let i = 0; i < modals.length; i++) {
//         if (event.target == modals[i]) {
//             closeModal(modals[i].id);
//         }
//     }
// };