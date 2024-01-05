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
                    insideData += Object.keys(x)[indexField] + '=' + (Array.isArray(Object.values(x)[indexField]) ? JSON.stringify(Object.values(x)[indexField]) : Object.values(x)[indexField].toString().trim())
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
    if (el) {
        if (typeof el == 'string') {
            if (document.querySelector(`${el}`) != null || document.querySelector(`${el}`) != undefined) {
                document.querySelector(`${el}`).addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    res(e);
                })
            }
        } else {
            if (el != null || el != undefined) {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    res(e);
                });
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
        rippleFunction();
        switchs();
        if (typeof el == 'string') {
            if (document.querySelector(`${el}`) != null || document.querySelector(`${el}`) != undefined) {
                document.querySelector(`${el}`).innerHTML += content;
            }
        } else {
            el.innerHTML += content;
        }
    }
}

// Clean Html
function cleanHtml(el) {
    if (el) {
        if (typeof el == 'string') {
            console.log(el)
            if (document.querySelector(`${el}`) != null || document.querySelector(`${el}`) != undefined) {
                document.querySelector(`${el}`).innerHTML = '';
            }
        } else {
            el.innerHTML = '';
        }
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
    if (el != null || el != undefined) {
        return document.querySelector(el)
    }
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
    onclick({
        el: btn,
        res: (e) => {
            let id = btn.getAttribute('data-target');
            openModal(id);
        }
    });
});
let modalsClose = getAllElements({
    el: '[data-dismiss="modal"]'
});
modalsClose.map(btn => {
    onclick({
        el: btn,
        res: (e) => {
            let id = '#' + btn.closest('.modal').getAttribute('id');
            console.log(id)
            closeModal(id);
        }
    });
});

function openModal(id) {
    let modal = document.querySelector(id);
    // console.log(modal)
    modal.classList.toggle('modal--active');
    modals.push(modal);
    closeContains(modal)
    switchs(); /* OJO CON ESTO */
}

function closeModal(id) {
    let modal = document.querySelector(id);
    modal.classList.toggle('modal--active');
    modals.splice(modals.indexOf(modal), 1);
}

function closeContains(modal) {
    // console.log(modal)
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
const selectsAll = getAllElements({
    el: '.select'
});
console.log(selectsAll)
selectsAll.map(select => {
    // console.log(select)
    onclick({
        el: select,
        res: (res) => {
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
        }
    });
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
            e.stopImmediatePropagation(); /* OJO CON ESTO */
            x.classList.toggle('switch__off')
        });
    });
    // console.log(switchs)
}
switchs();

function createTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip) => {
        const position = tooltip.getAttribute('data-tooltip-position');
        tooltip.addEventListener('mouseenter', () => {
            tooltip.style.setProperty('data-tooltip', position);
        });
        tooltip.addEventListener('mouseleave', () => {
            tooltip.style.setProperty('data-tooltip', '');
        });
    });
}

createTooltip();


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


// * Select Multiple
function selectMultiple(main, arrData) {
    let selectMain = document.querySelector(`${main}`);
    if (selectMain != null) {
        let selectMultiple = selectMain.querySelector('.selectMultiple');
        if (selectMain != null && selectMain != undefined && selectMultiple === null) {
            let select = selectMain.querySelector('select[multiple]');
            let selectOptions = select.querySelectorAll('option');
            let newSelect = document.createElement('div');
            newSelect.classList.add('selectMultiple');
            let active = document.createElement('div');
            active.classList.add('active');
            let optionList = document.createElement('ul');
            let placeholder = select.dataset.placeholder;
            let span = document.createElement('span');
            span.innerText = placeholder;
            active.appendChild(span);

            let searchInput = document.createElement('input');
            searchInput.setAttribute('type', 'text');
            searchInput.setAttribute('placeholder', 'Busca aquí');
            searchInput.addEventListener('input', function (e) {
                let searchValue = e.target.value.toLowerCase();
                let filteredOptions = arrData.filter(option => option.name.toLowerCase().includes(searchValue));
                let emAll = selectMain.querySelectorAll('.selectMultiple em');
                let filteredOptionsDifferent = filteredOptions.filter(option => {
                    for (let i = 0; i < emAll.length; i++) {
                        if (emAll[i].textContent.trim() === option.name.trim()) {
                            return false;
                        }
                    }
                    return true;
                });
                updateOptions(filteredOptionsDifferent);
            });

            active.appendChild(searchInput);

            function updateOptions(options) {
                console.log(options)
                optionList.innerHTML = '';
                options.map((option, index) => {
                    select.innerHTML += `<option value="${option.id}" ${ index == 0 ? 'selected="selected"' : ''}>${option.name}</option>`
                });

                options.forEach(option => {
                    let text = option.name;
                    if (option.selected) {
                        let tag = document.createElement('a');
                        tag.dataset.value = option.id;
                        tag.innerHTML = "<em>" + text + "</em><i></i>";
                        active.appendChild(tag);
                        span.classList.add('hide');
                    } else {
                        let item = document.createElement('li');
                        item.dataset.value = option.id;
                        item.innerHTML = text;
                        optionList.appendChild(item);
                    }
                });
            }

            updateOptions(arrData);

            var arrow = document.createElement('div');
            arrow.classList.add('arrow');
            active.appendChild(arrow);
            newSelect.appendChild(active);
            newSelect.appendChild(optionList);
            select.parentElement.append(newSelect);
            span.appendChild(select);

            selectMain.querySelector('.selectMultiple ul').addEventListener('click', (e) => {
                let li = e.target.closest('li');
                if (!li) {
                    return;
                }
                let select = li.closest('.selectMultiple');
                if (!select.classList.contains('clicked')) {
                    select.classList.add('clicked');
                    if (li.previousElementSibling) {
                        li.previousElementSibling.classList.add('beforeRemove');
                    }
                    if (li.nextElementSibling) {
                        li.nextElementSibling.classList.add('afterRemove');
                    }
                    li.classList.add('remove');
                    let a = document.createElement('a');
                    a.dataset.value = li.dataset.value;
                    a.insertAdjacentHTML('beforeend', "<em>" + li.innerText + "</em><i></i>");
                    a.classList.add('notShown');
                    select.querySelector('div').appendChild(a);
                    let selectEl = select.querySelector('select');
                    let opt = selectEl.querySelector('option[value="' + li.dataset.value + '"]');
                    console.log(opt)
                    opt.setAttribute('selected', 'selected');
                    setTimeout(() => {
                        a.classList.add('shown');
                        select.querySelector('span').classList.add('hide');
                    }, 300);
                    setTimeout(() => {
                        let styles = window.getComputedStyle(li);
                        let liHeight = styles.height;
                        let liPadding = styles.padding;
                        let removing = li.animate([{
                                height: liHeight,
                                padding: liPadding
                            },
                            {
                                height: '0px',
                                padding: '0px'
                            }
                        ], {
                            duration: 300,
                            easing: 'ease-in-out'
                        });
                        removing.onfinish = () => {
                            if (li.previousElementSibling) {
                                li.previousElementSibling.classList.remove('beforeRemove');
                            }
                            if (li.nextElementSibling) {
                                li.nextElementSibling.classList.remove('afterRemove');
                            }
                            li.remove();
                            select.classList.remove('clicked');
                        }
                    }, 300);
                }
            });

            selectMain.querySelector('.selectMultiple > div').addEventListener('click', (e) => {
                let a = e.target.closest('a');
                let select = e.target.closest('.selectMultiple');
                if (!a) {
                    return;
                }
                a.className = '';
                a.classList.add('remove');
                select.classList.add('open');
                let selectEl = select.querySelector('select');
                let opt = selectEl.querySelector('option[value="' + a.dataset.value + '"]');
                opt.removeAttribute('selected');
                a.classList.add('disappear');
                setTimeout(() => {
                    let styles = window.getComputedStyle(a);
                    let padding = styles.padding;
                    let deltaWidth = styles.width;
                    let deltaHeight = styles.height;
                    let removeOption = a.animate([{
                            width: deltaWidth,
                            height: deltaHeight,
                            padding: padding
                        },
                        {
                            width: '0px',
                            height: '0px',
                            padding: '0px'
                        }
                    ], {
                        duration: 0,
                        easing: 'ease-in-out'
                    });
                    let li = document.createElement('li');
                    li.dataset.value = a.dataset.value;
                    li.innerText = a.querySelector('em').innerText;
                    li.classList.add('show');
                    select.querySelector('ul').appendChild(li);
                    setTimeout(() => {
                        if (!selectEl.selectedOptions.length) {
                            select.querySelector('span').classList.remove('hide');
                        }
                        li.className = '';
                    }, 350);
                    removeOption.onfinish = () => {
                        a.remove();
                    }
                }, 300);
            });
            selectMain.querySelectorAll('.selectMultiple > div .arrow').forEach((el) => {
                el.addEventListener('click', (e) => {
                    el.closest('.selectMultiple').classList.toggle('open');
                    searchInput.classList.toggle('active__input__search')
                });
            });
        }
    }
}
// * Utilities
function contenteditable(element, boolean) {
    if (boolean) {
        element.classList.add('border__edit');
        element.setAttribute('contenteditable', `${ boolean }`);
    } else {
        element.classList.remove('border__edit');
        element.removeAttribute('contenteditable');
    }
}

function hide(el) {
    console.log(el)
    el.classList.add('hidden');
}

function show(el) {
    console.log(el)
    el.classList.remove('hidden');
}
// Previsualizar y crear imagen con html2canvas
function apiHtml2Canvas(html, css, js, idComponent) {
    // console.log(html)
    const iframeResult = document.getElementById('capture-area');
    const iframeDoc = iframeResult.contentDocument;
    const iframeHead = iframeDoc.head;
    const iframeBody = iframeDoc.body;
    iframeHead.innerHTML = "\n<style>\n" + css + "\n</style>\n";
    iframeBody.innerHTML = "\n" + html + "\n";
    const script = iframeDoc.createElement("script");
    script.innerHTML = "\n" + js + "\n";
    iframeBody.appendChild(script);




    let returnData = [];


    html2canvas(iframeBody, {
        allowTaint: true,
        backgroundColor: 'transparent',
        useCORS: true,
        // scale: window.devicePixelRatio,
    }).then(
        function (canvas) {
            let imageData = canvas.toDataURL("image/png");
            // Now browser starts downloading it instead of just showing it
            // imageData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
            // DowloadOnly
            setTimeout(() => {
                // document.getElementById('previewImage').appendChild(canvas);
                document.getElementById('previewImageImg').src = imageData;
                // const input = document.getElementById('inputImage');
                // const blob = new Blob([imageData]);
                // input.append(blob);
            }, 500);
            returnData.push(imageData)
            setTimeout(() => {
                // console.log(imageData)
                // AJAXGJ8({
                //     url: 'Componentes/createPreviewComponent',
                //     data:[{
                //         data: imageData
                //     }],
                //     success: function (res) {
                //         console.log(res)
                //     }
                // });





            }, 1000);

        }
    );
    return returnData;
}

// let imageData = apiHtml2Canvas(`<p class="left">Lorem ipsum dolor sit amet, consectetuer adipiscing 
// elit. Aenean commodo ligula eget dolor. Aenean massa. <br />
// Cum sociis natoque penatibus et magnis dis parturient 
// montes, nascetur ridiculus mus. Donec quam felis, 
// ultricies nec, pellentesque eu, pretium quis, sem.</p>`, `.left {
//     padding-right:15px;
//     text-align:left;
//     color: green;
//     font-weight: bold;
//     letter-spacing: 10px;
//     font-size: 5em;
//     background: red;
//     text-align: center !important;}`, `document.querySelector('p').textContent = "Hola como estas vale";`);
//     console.log(imageData[0])