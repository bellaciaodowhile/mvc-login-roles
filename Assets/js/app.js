/** 
 * @param { Object } Object - receives url, data, success, error
 * @param { Object.url } url - url/api
 * @param { Object.data } data @type { Array } - Array of object { name: 'name' }
 * @param { Object.success } success - Return success function
 * @param { Object.error } error - Return error function
 */

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
    console.log(dataFn())
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
    if (typeof el == 'object') {
        el.onclick = (e) => {
            e.preventDefault();
            res(e);
        }
    } else {
        if (document.querySelector(el) != null) {
            document.querySelector(el).onclick = (e) => {
                e.preventDefault();
                res(e);
            }
        }
    }

}
// View Html
function viewHtml({
    el,
    content
}) {
    if (el != undefined) {
        el.innerHTML += content;
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
// Documentar
function el(el) {
    return document.querySelector(el)
}
// Documentar
function submit({el, res}) {
    el.addEventListener('submit',  function(e) {
        e.preventDefault();
        res(e);
    });
}
/**
 * Temporary
 * @param { HTMLElement } el 
 * @returns { Boolean }
 */
function changeStatusCheckbox(el) {
    if (el.getAttribute('checked')) {
        el.removeAttribute('checked')
        el.style.transform = 'scale(1)'
        // console.log('Off')
    } else {
        el.setAttribute('checked', true)
        el.style.transform = 'scale(1.5)'
        // console.log('On')
    }
    let output = !!el.getAttribute('checked') || false
    return output;
}
// Get All Elements
function getAllElements({
    el
}) {
    return [...document.querySelectorAll(el)];
}
// * Buttons Ripple
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
// * Cursor Custom

