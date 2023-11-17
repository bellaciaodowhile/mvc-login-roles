/** 
 * @param { Object } Object - receives url, data, success, error
 * @param { Object.url } url - url/api
 * @param { Object.data } data @type { Array } - Array of object { name: 'name' }
 * @param { Object.success } data @type { Function } - Return success function
 * @param { Object.error } data @type { Function } - Return error function
 */

function AJAXGJ8({ url, data = [], success, error }) {
    let req = (window.XMLHttpRequest) ? new XMLHttpRequest() : ActiveXObject('Microsoft.XMLHTTP');
    req.open("POST", BASE_URL + url, true);
    function dataFn() {
        let insideData = '';
        if (data.length > 0) {
            data.map((x) => {
                Object.keys(x).map((field, indexField) => {
                    if (indexField == 0) {
                        insideData += Object.keys(x)[indexField] + '=' + (Array.isArray(Object.values(x)[indexField]) ? JSON.stringify(Object.values(x)[indexField]) : Object.values(x)[indexField]) 
                    } else {
                        insideData += '&' + Object.keys(x)[indexField] + '=' + (Array.isArray(Object.values(x)[indexField]) ? JSON.stringify(Object.values(x)[indexField]) : Object.values(x)[indexField]) 
                    }
                })
            });
        }
        return insideData;
    }
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
function onclick({el, res}) {
    el.onclick = (e) => {
        e.preventDefault();
        res(e);
    }
}
// View Html
function viewHtml({el, content}) {
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
/**
 * Temporary
 * @param { HTMLElement } el 
 * @returns { Boolean }
 */
function changeStatusCheckbox(el) {
    if (el.getAttribute('checked')) {
        el.removeAttribute('checked')
        el.style.transform = 'scale(1)'
        console.log('Off')
    } else {
        el.setAttribute('checked', true)
        el.style.transform = 'scale(1.5)'
        console.log('On')
    }
    let output = !!el.getAttribute('checked') || false
    return output;
}