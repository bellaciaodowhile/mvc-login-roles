console.log('Dashboard')

function dataUsers() {
    const tableUsers = el('#table__users');
    cleanHtml(tableUsers);
    AJAXGJ8({
        url: 'Usuarios/getUsers',
        success: function (res) {
            res = JSON.parse(res);
            let x = 1;
            for (item of res) {
                if (item != undefined) {
                    viewHtml({
                        el: tableUsers,
                        content: /* html */ `
                        <tr class="trow">
                            <td>${ x++ }</td>
                            <td>${ item.nombre }</td>
                            <td>${ item.apellido }</td>
                            <td>${ item.usuario }</td>
                            <td>
                                <span class="tag tag--${ item.status == '1' ? 'active' : 'inactive' }">${ item.status == '1' ? 'Activo' : 'Inactivo' }</span>
                            </td>
                            <td>${ item.tipo }</td>
                            <td style="display: flex;">
                                <button ripple class="btn btn-icon trigger__update" id="${ item.id }" data-toggle="modal">
                                    <i class="material-icons-outlined">edit</i>
                                </button>
                                <button ${item.tipo == 'SuperAdmin' ? 'style="display: none"' : ''} ripple class="btn btn-icon trigger__delete" id="${ item.id }">
                                    <i class="material-icons-outlined">delete</i>
                                </button>
                            </td>
                        </tr>`
                    });
                    switchs();
                    let triggersUpdate = getAllElements({el: '.trigger__update'});
                    triggersUpdate.map(trigger => {
                        onclick({el: trigger, res: function(res) {
                            let id = res.currentTarget.getAttribute('id')
                            getUser(id)
                            openModal('#modal__update__users');
                        }});
                    });
                    let triggersDelete = getAllElements({el: '.trigger__delete'});
                    triggersDelete.map(trigger => {
                        onclick({el: trigger, res: function(res) {
                            let id = res.currentTarget.getAttribute('id')
                            if (confirm('¿Esta seguro de eliminar este registro?')) {
                                delUser(id, trigger)
                            }
                        }});
                    });
                }
            }
        }
    });
}
dataUsers();
// * Add Users
const formAddUsers = el('.form__add__users');
submit({
    el: formAddUsers,
    res: function (res) {
        console.log(res)
        let data = new FormData(formAddUsers);
        let tipo = formAddUsers.querySelector('.select__header__label').textContent;
        let estado = formAddUsers.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
        AJAXGJ8({
            url: 'Usuarios/setUsers',
            data: [{
                nombre: data.get('nombre'),
                apellido: data.get('apellido'),
                usuario: data.get('usuario'),
                contrasena: data.get('contrasena'),
                estado,
                tipo
            }],
            success: function (res) {
                console.log(res)
                res = JSON.parse(res)
                if (res.status) {
                    alert(res.msg)
                    formAddUsers.reset();
                    let idModal = '#' + formAddUsers.closest('.modal').getAttribute('id')
                    closeModal(idModal)
                    dataUsers();
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});
// * Get User
function getUser(id) {
    console.log(id)
    let formUpdate = el('.form__update__users');
    let estado = formUpdate.querySelector('.switch__label');
    AJAXGJ8({
        url: 'Usuarios/getUser',
        data: [{ id }],
        success: function(res) {
            res = JSON.parse(res)
            console.log(res)
            formUpdate.setAttribute('id', res.id)
            formUpdate.querySelector('input[name="nombre"]').value = res.nombre;
            formUpdate.querySelector('input[name="apellido"]').value = res.apellido;
            formUpdate.querySelector('input[name="usuario"]').value = res.usuario;
            formUpdate.querySelector('input[name="contrasena"]').value = res.contrasena;
            res.status == '1' ? estado.classList.remove('switch__off') : estado.classList.add('switch__off');
            formUpdate.querySelector('.select__header__label').textContent = res.tipo;
        }
    })
}
// * Delete user
function delUser(id) {
    AJAXGJ8({
        url: 'Usuarios/deleteUser',
        data: [{ id }],
        success: function(res) {
            res = JSON.parse(res)
            console.log(res)
            if (res.status) {
                alert(res.msg)
                dataUsers();
            } else {
                alert(res.msg)
            }
        }
    });
}
// * Update Users
const formUpdateUsers = el('.form__update__users');
submit({
    el: formUpdateUsers,
    res: function (res) {
        console.log(res)
        let data = new FormData(formUpdateUsers);
        let tipo = formUpdateUsers.querySelector('.select__header__label').textContent;
        let id = formUpdateUsers.getAttribute('id')
        let status = formUpdateUsers.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
        switchs();
        AJAXGJ8({
            url: 'Usuarios/updateUsers',
            data: [{
                id,
                nombre: data.get('nombre'),
                apellido: data.get('apellido'),
                usuario: data.get('usuario'),
                contrasena: data.get('contrasena'),
                status,
                tipo
            }],
            success: function (res) {
                res = JSON.parse(res)
                console.log(res)
                if (res.status) {
                    alert(res.msg)
                    let idModal = '#' + formUpdateUsers.closest('.modal').getAttribute('id')
                    closeModal(idModal)
                    dataUsers();
                    switchs();
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});



// * Cargando lista de roles
// console.log(el('#select__content__roles'))
AJAXGJ8({
    url: 'Roles/getRoles',
    success: function(res) {
        res = JSON.parse(res)
        let allSelectsRoles = getAllElements({el: '#select__content__roles'});
        allSelectsRoles.map(select => {
            cleanHtml(select);
            for (rol of res) {
                viewHtml({el: select, content: /*html*/ `
                    <div ripple class="select__content-item">
                        ${ rol.nombrerol }
                    </div>
                `})
            }
        });
    }
});

const componentsOpen = getAllElements({el: '.components__open'});
componentsOpen.map(open => {
    onclick({el: open, res: function(res) {
        el('.components__items').classList.toggle('components__items--active')
    }});
});

// * Cargando Components
function getComponents() {
    AJAXGJ8({
        url: 'Components/getComponents',
        success: function(res) {
            res = JSON.parse(res)
            // console.log(res)
            cleanHtml('.cards__components');
            if (res.length >= 1) {
                for (component of res) {
                    // console.log(component)
                    viewHtml({el: '.cards__components', content: /*html*/`
                    <div class="card-work create__component" component="${component.id}">
                        <div class="card-work__img">
                            <img src="assets/img/logo.png" />
                        </div>
                        <div class="card-work__header">
                            <div class="card-work__logo">
                                <img src="assets/img/logo.png" />
                            </div>
                            <div class="card-work__info">
                                <p class="title"> ${ component.nombre } </p>
                                <p class="author"> Huánuco </p>
                            </div>
                            <div class="card-work__tag">
                                <div class="tag">
                                    html
                                </div>
                                <div class="tag">
                                    css
                                </div>
                                <div class="tag">
                                    js
                                </div>
                            </div>
                        </div>
                    </div>
                    `});
                    contentLoadedButtonsComponents();
                }
            } else {
                viewHtml({el: '.cards__components', content: /*html*/`
                    No existen componentes registrados...`
                });
            }
            
        }
    });
}

getComponents();
const components = el(`.create__components`);
function contentLoadedButtonsComponents() {
    const createComponent = getAllElements({
        el: `.create__component`
    });
    // console.log(createComponent)
    return createComponent;

}
contentLoadedButtonsComponents();
// * Load the Monaco Editor.
require.config({
    paths: {
        'vs': 'https://topiaires.fr/monaco-editor/node_modules/monaco-editor/min/vs'
    }
});
require(['vs/editor/editor.main'], function () {

    // * Create Component
    
    const closeComponents = el(`.close__component`);
    onclick({
        el: closeComponents,
        res: (res) => {
            components.classList.toggle('create__components--active');
            el('.list-container').classList.toggle('active');
        }
    });
    let createComponent = contentLoadedButtonsComponents();
    // console.log(createComponent)
    createComponent.map(btn => {
        onclick({
            el: btn,
            res: (res) => {
                if (btn.classList.contains('card-work')) {
                     // * Get only component
                    console.log(btn)
                    let id = btn.getAttribute('component');
                    AJAXGJ8({
                        url: 'Components/getComponent',
                        data: [{ id }],
                        success: function(res) {
                            res = JSON.parse(res)
                            console.log(res)
                            let htmlDecode = res[0].html.replaceAll('___amp___','&');
                            let cssDecode = res[0].css.replaceAll('___amp___','&');
                            let jsDecode = res[0].js.replaceAll('___amp___','&');
                            htmlEditor.setValue(htmlDecode);
                            cssEditor.setValue(cssDecode);
                            jsEditor.setValue(jsDecode);

                            updateIframeOutput({ lang: 'html', value: htmlDecode })
                            updateIframeOutput({ lang: 'css', value: cssDecode })
                            updateIframeOutput({ lang: 'js', value: jsDecode })
                            getComponents();
                        }
                    });
                } else {
                    console.log('not component')
                    htmlEditor.setValue('');
                    cssEditor.setValue('');
                    jsEditor.setValue('');
                    updateIframeOutput({ lang: 'html', value: '' })
                    updateIframeOutput({ lang: 'css', value: '' })
                    updateIframeOutput({ lang: 'js', value: '' })
                }
                components.classList.toggle('create__components--active');
            }
        });
    });


    monaco.editor.setTheme('vs-dark');
    let htmlEditor = monaco.editor.create(document.getElementById('html__editor'), {
        language: 'html',
        automaticLayout: true,
        fontSize: "16px",
    });
    let cssEditor = monaco.editor.create(document.getElementById('css__editor'), {
        language: 'css',
        automaticLayout: true,
        fontSize: "16px",
    });
    let jsEditor = monaco.editor.create(document.getElementById('js__editor'), {
        language: 'javascript',
        automaticLayout: true,
        fontSize: "16px",
    });

    [document.getElementById('html__editor'), document.getElementById('css__editor'), document.getElementById('js__editor')].map(editor => {
        editor.addEventListener('keyup', function (e) {
            let editor = e.currentTarget;
            // console.log(editor)
            if (editor.id == 'html__editor') {
                updateIframeOutput({
                    lang: 'html',
                    value: htmlEditor.getValue()
                })
                // console.log(htmlEditor.getValue())
            } else if (editor.id == 'css__editor') {
                updateIframeOutput({
                    lang: 'css',
                    value: cssEditor.getValue()
                })
                // console.log(cssEditor.getValue())
            } else if (editor.id == 'js__editor') {
                updateIframeOutput({
                    lang: 'js',
                    value: jsEditor.getValue()
                })
                // console.log(jsEditor.getValue())
            }
        })
    });

    el('#handler').addEventListener('mousedown', function () {
        document.addEventListener('mousemove', function (e) {
            htmlEditor.layout();
            cssEditor.layout();
            jsEditor.layout();
        });
    });
    // * Guardando componente
    onclick({el: '.save__component', res: (res) => {
        let nameComponent = el('input[name="name__component"]').value;
        let htmlEncode = htmlEditor.getValue().replaceAll('&', '___amp___')
        let cssEncode = cssEditor.getValue().replaceAll('&', '___amp___')
        let jsEncode = jsEditor.getValue().replaceAll('&', '___amp___')

        AJAXGJ8({
            url: 'Components/setComponents',
            data: [{
                html: htmlEncode,
                css: cssEncode,
                js: jsEncode,
                user: el('.cards_section').getAttribute('id'),
                name: nameComponent
            }],
            success: function (res) {
                console.log(res)
                res = JSON.parse(res);
                if (res.status) {
                    el('.list-container').classList.toggle('active');
                    getComponents();
                } else {
                    alert(res.msg)
                }
            }
        })
    }});    

    // * Editando Componente
    // createComponent.map(btn => {
    //     console.log(btn)
    //     onclick({
    //         el: btn,
    //         res: (res) => {
                
    //             if (!btn.classList.contains('card-work')) {
    //                 console.log('No contiene')
    //                 // htmlEditor.setValue('');
    //                 // cssEditor.setValue('');
    //                 // jsEditor.setValue('');
    //             }
    //             console.log('Hola vale')
    //             components.classList.toggle('create__components--active');
    //         }
    //     });
    // });

});

function updateIframeOutput(res) {

    const iframeResult = el('#components__result');
    const iframeDoc = iframeResult.contentDocument;
    const iframeHead = iframeDoc.head;
    const iframeBody = iframeDoc.body;
    if (res.lang == 'css') {
        iframeHead.innerHTML = "\n<style>\n" + res.value + "\n</style>\n";
    } else if (res.lang == 'html') {
        iframeBody.innerHTML = "\n" + res.value + "\n";
    } else {
        const script = iframeDoc.createElement("script");
        script.innerHTML = "\n" + res.value + "\n";
        iframeBody.appendChild(script);
    }
}

// * Fullscreen component
function fullscreenComponent() {
    el('#panel-d').classList.toggle('panel-d--active');
    if (el('#panel-d').classList.contains('panel-d--active')) {
        el('#panel-d').children[0].children[0].textContent = 'fullscreen_exit';
        el('#handler').style.zIndex = '-1';
        el('.list-container').classList.toggle('list-container--remove')
    } else {
        el('#panel-d').children[0].children[0].textContent = 'fullscreen';
        el('#handler').style.zIndex = '9999';
        el('.list-container').classList.toggle('list-container--remove')
    }
}
onclick({el: '#fullscreen__component', res: function(res) {
    fullscreenComponent()
}});




(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var grid, handler, pa, pb, pc, pd, resize_panel;
        grid = document.querySelector('.panel-grid');
        if (grid) {
            handler = document.querySelector('#handler');
            pa = document.querySelector('#panel-a');
            pb = document.querySelector('#panel-b');
            pc = document.querySelector('#panel-c');
            pd = document.querySelector('#panel-d');
            resize_panel = function (e) {
                handler.style.left = e.pageX - 5 + 'px';
                handler.style.top = e.pageY - 5 + 'px';
                pa.style.width = e.pageX + 'px';
                pa.style.height = e.pageY + 'px';
                pb.style.left = e.pageX + 'px';
                pb.style.height = e.pageY + 'px';
                pc.style.width = e.pageX + 'px';
                pc.style.top = e.pageY - 5 + 'px';
                pd.style.left = e.pageX + 'px';
                pd.style.top = e.pageY - 5 + 'px';
            };
            handler.addEventListener('mousedown', function () {
                document.addEventListener('mousemove', resize_panel);
            });
            grid.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', resize_panel);
            });
        }
    });
}).call(this);


// Evento keydown para detectar cuando se presionan las teclas
var isCtrl = false;
document.onkeyup = function (e) {
    if (e.keyCode == 17) isCtrl = false;
}

document.onkeydown = function (e) {
    if (e.keyCode == 17) isCtrl = true;
    if (e.keyCode == 83 && isCtrl == true) {
        alert('guardado')
        return false;
    }
    if (e.keyCode == 81 && isCtrl == true) {
        el('.components__items').classList.toggle('components__items--active')
        components.classList.remove('create__components--active');
        return false;
    }
    if (e.keyCode == 49 && isCtrl == true) {
        fullscreenComponent();
        return false;
    }
    if (event.key === "Escape") {
        el('.list-container').classList.remove('active');
        components.classList.toggle('create__components--active');
    }
}
onclick({el: '.more-button', res: (e) => {
    el('.list-container').classList.toggle('active');
}});

