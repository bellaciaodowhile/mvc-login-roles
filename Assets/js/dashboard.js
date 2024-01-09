console.log('Dashboard')
// * Load the Monaco Editor.
require.config({
    paths: {
        'vs': 'https://topiaires.fr/monaco-editor/node_modules/monaco-editor/min/vs'
    }
});
require(['vs/editor/editor.main'], function () {
function dataUsers() {
    const tableUsers = el('#table__users');
    cleanHtml(tableUsers);
    AJAXGJ8({
        url: 'Usuarios/getUsers',
        success: function (res) {
            res = JSON.parse(res);
            let x = 1;
            selectMultiple('#select__members', res.map(y => {
                return {
                    name: y.nombre + ' - ' + y.tipo,
                    id: y.id
                }
            }))
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
                    let triggersUpdate = getAllElements({
                        el: '.trigger__update'
                    });
                    triggersUpdate.map(trigger => {
                        onclick({
                            el: trigger,
                            res: function (res) {
                                let id = res.currentTarget.getAttribute('id')
                                getUser(id)
                                openModal('#modal__update__users');
                            }
                        });
                    });
                    let triggersDelete = getAllElements({
                        el: '.trigger__delete'
                    });
                    triggersDelete.map(trigger => {
                        onclick({
                            el: trigger,
                            res: function (res) {
                                let id = res.currentTarget.getAttribute('id')
                                if (confirm('¿Esta seguro de eliminar este registro?')) {
                                    delUser(id, trigger)
                                }
                            }
                        });
                    });
                }
                // * Select Members
                // setTimeout(() => {
                //     viewHtml({el: '#select__members', content: /*html*/ `
                //     <option value="${ item.id }">${ item.nombre }</option>
                // `})
                // }, 1000);
                // console.log(el('#select__members'))
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
        data: [{
            id
        }],
        success: function (res) {
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
        data: [{
            id
        }],
        success: function (res) {
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
    success: function (res) {
        res = JSON.parse(res)
        let allSelectsRoles = getAllElements({
            el: '#select__content__roles'
        });
        allSelectsRoles.map(select => {
            cleanHtml(select);
            for (rol of res) {
                viewHtml({
                    el: select,
                    content: /*html*/ `
                    <div ripple class="select__content-item">
                        ${ rol.nombrerol }
                    </div>
                `
                })
            }
        });
    }
});

const componentsOpen = getAllElements({
    el: '.components__open'
});
componentsOpen.map(open => {
    onclick({
        el: open,
        res: function (res) {
            el('.components__items').classList.toggle('components__items--active')
        }
    });
});

// * Cargando Components
// function getComponents() {
//     AJAXGJ8({
//         url: 'Componentes/getComponents',
//         success: function (res) {
//             res = JSON.parse(res)
//             // console.log(res)
//             cleanHtml('.cards__components');
//             if (res.length >= 1) {
//                 for (component of res) {
//                     // console.log(component)
//                     viewHtml({
//                         el: '.cards__components',
//                         content: /*html*/ `
//                     <div class="card-work create__component" component="${component.id}">
//                         <div class="card-work__img">
//                             <img src="assets/img/logo.png" />
//                         </div>
//                         <div class="card-work__header">
//                             <div class="card-work__logo">
//                                 <img src="assets/img/logo.png" />
//                             </div>
//                             <div class="card-work__info">
//                                 <p class="title"> ${ component.nombre } </p>
//                                 <p class="author"> Huánuco </p>
//                             </div>
//                             <div class="card-work__tag">
//                                 <div class="tag">
//                                     html
//                                 </div>
//                                 <div class="tag">
//                                     css
//                                 </div>
//                                 <div class="tag">
//                                     js
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     `
//                     });
//                     contentLoadedButtonsComponents();
//                 }
//             } else {
//                 viewHtml({
//                     el: '.cards__components',
//                     content: /*html*/ `
//                     No existen componentes registrados...`
//                 });
//             }

//         }
//     });
// }

// getComponents();
const components = el(`.create__components`);

function contentLoadedButtonsComponents() {
    console.log('create__component todooooooooooooooooooooooooooooooooooooooooos')
    const createComponent = getAllElements({
        el: `.create__component`
    });
    // console.log(createComponent)
    return createComponent;

}
contentLoadedButtonsComponents();

// * Selected folder project
function selectedFolderProject() {
    AJAXGJ8({
        url: 'Proyectos/getProjects',
        success: function(res) {
            res = JSON.parse(res);
            cleanHtml('#cards__projects__components--create');
            for (item of res) {
                let html = /*html*/ `
                <div class="card__project card__project__component" item="${item.id}" folders="${item.categorias.length}"> 
                    <div class="card__project-content">
                        <div class="card__project-title">
                            ${ item.nombre }
                        </div>
                        <div class="tag ${item.status == '0' ? 'tag--paused' : 'tag--progress'} mt-3">
                            ${item.status == '0' ? 'inactivo' : 'activo'}
                        </div>
                        <div class="card__project-users">
                            <small class="center gap-5">
                                <i class="material-icons-outlined">folder</i> <span>${item.categorias.length}</span>
                            </small>
                        </div>
                    </div>
                </div> `;
                viewHtml({
                    el: '#cards__projects__components--create',
                    content: html
                });
                getCategoriesChevrondown();
                // if (item.categorias.length > 0) {
                //     // openProjectsComponents();
                // } else {
                //     alert('No existe ninguna categoría en este proyecto')
                // }
            }
        }
    });
}
let arrDataCreateComponent = {};
function getCategoriesChevrondown() {
    let cardsProjects = getAllElements({
        el: '.card__project.card__project__component .card__project-content'
    });
    console.log(cardsProjects)
    cardsProjects.map(project => {
        project = project.parentElement
        onclick({
            el: project,
            res: function (res) {
                console.log(project.getAttribute('item'))
                getCategories(project.getAttribute('item'), el('.chevrondown-content-gj8.components'));
                toggleStepCreateComponent();
                arrDataCreateComponent.idProject = project.getAttribute('item');
            }
        });
    });
}
// * Devolver a la selección de proyecto para la creación de los componentes
function toggleStepCreateComponent() {
    el('.create__component__step-categories').classList.toggle('create__component__step-categories--active');
    el('.create__component__step-projects').classList.toggle('create__component__step-projects--active');
    el('.create__component__step-projects').classList.contains('create__component__step-projects--active') ? el('.step__current__h1').textContent = 'un proyecto' : el('.step__current__h1').textContent = 'una categoría';
    
}
onclick({el: '.create__component__step-close', res: function(res) {
    el('.create__component__step-categories').classList.remove('create__component__step-categories--active');
    el('.create__component__step-projects').classList.add('create__component__step-projects--active');
    el('.create__component__step-projects').classList.contains('create__component__step-projects--active') ? el('.step__current__h1').textContent = 'un proyecto' : el('.step__current__h1').textContent = 'una categoría';
    openCreateComponent();
    if (el('.create__component__step').classList.contains('create__component__step--transfer')) {
        components.classList.toggle('create__components--active');
        toggleStepCreateComponent();
    }
}});
onclick({el: '.prev__step', res: function(res) {
    toggleStepCreateComponent();
}});
// * Create Component Category 
onclick({el: '.create__component-category', res: function(res) {
    let parentCategory = getAllElements({el:'.create__component__step-categories .chevrondown-radio-button'}).filter(x => x.classList.contains('active'))[0].getAttribute('item');
    getAllElements({el:'.create__component__step-categories .chevrondown-radio-button'})[0].classList.add('active');
    let nameCategory = getAllElements({el:'.create__component__step-categories .chevrondown-radio-button'}).filter(x => x.classList.contains('active'))[0].nextElementSibling.textContent.trim();
    console.log(nameCategory)
    // dataCreateComponent();
    arrDataCreateComponent.category = { id: parentCategory, name: nameCategory };
    dataCreateComponentEnd();
    // * Transfer component
    if (!el('.create__component__step').classList.contains('create__component__step--transfer')) {
        components.classList.toggle('create__components--active');
    } else {
        // * Update category component
        let componentId = localStorage.getItem('componentIdTransfer');
        console.log('Vamos a actualizar el componente con el id: ', componentId, ' a esta nueva categoría con el id: ', parentCategory)
        activePreloader();
        // * Precedencia
        AJAXGJ8({
            url: 'Categorias/getTree/' + parentCategory,
            success: function(resTree) {
                resTree = JSON.parse(resTree);
                console.log(resTree)

                // * ¿En que proyecto estamos?
                if (resTree.length > 0) {
                    // AJAXGJ8({
                    //     url: 'Proyectos/getProject/' + res[1].idProject,
                    //     success: function(resProject) {
                    //         resProject = JSON.parse(resProject);
                    //         console.log(resProject)
                    //         // * Nuevo Breadcumb al transferir componente
                    //         cleanHtml('.main__breadcumb');
                    //         cleanHtml('#cards__projects__components');
                    //         viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    //         <span class="breadcumb__item" item="base"> 
                    //             Proyectos
                    //         </span>`});
                    //         for (itemProject of resProject) {
                    //             viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    //             <span class="breadcumb__item" item="${itemProject.id}"> 
                    //                 <i class="material-icons-outlined">chevron_right</i> ${itemProject.nombre}
                    //             </span>`});
                    //         }
                    //         for (itemCategory of res) {
                    //             if (itemCategory != false) {
                    //                 viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    //                 <span class="breadcumb__item" item="${itemCategory.id}"> 
                    //                     <i class="material-icons-outlined">chevron_right</i> ${itemCategory.nombre}
                    //                 </span>`});
                    //             }
                    //         }
                    //         openBreadcumb();
                    //         // getProjectComponents();
                    //         getComponentsCategories(res[1].idProject);
                    //     }
                    // });
                    AJAXGJ8({
                        url: 'Proyectos/getProject/' + arrDataCreateComponent.idProject,
                        success: function(resProject) {
                            resProject = JSON.parse(resProject);
                            console.log(resProject)
                            // * Nuevo Breadcumb al transferir componente
                            cleanHtml('.main__breadcumb');
                            cleanHtml('#cards__projects__components');
                            viewHtml({el: '.main__breadcumb', content: /*html*/ `
                            <span class="breadcumb__item" item="base"> 
                                Proyectos
                            </span>`});
                            // * Cargando los proyectos
                            for (itemProject of resProject) {
                                viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                <span class="breadcumb__item" item="${itemProject.id}" folder="project"> 
                                <i class="material-icons-outlined">chevron_right</i> ${itemProject.nombre}
                                </span>`});
                                console.log('proyecto en curso: ======= ', itemProject.id, ' ¬ Categoría en curso: ', parentCategory)
                            }
                            console.log('Este es el id del pryecto de donde vamos a traer los componentes y categorias',resProject.at(resProject.length - 1).id)
                            for (itemCategory of resTree) {
                                if (itemCategory != false) {
                                    viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                    <span class="breadcumb__item" item="${itemCategory.id}"> 
                                    <i class="material-icons-outlined">chevron_right</i> ${itemCategory.nombre}
                                    </span>`});
                                    console.log('subcategorías en curso: ======= ', itemCategory.id)
                                }
                            }
                            console.log('Cargando las subcategorias y componentes de esta categoría: ', parentCategory)
                            // getComponentsCategories(resTree.at(resTree.length - 1).id);
                            
                            // ! Este me está trayendo los componentes de la categoría en el cual registré el último componente
                            getSubcategory(parentCategory, arrDataCreateComponent.idProject);
                            // getProjectComponent(resTree.at(resTree.length - 1).id);
                            openBreadcumb();
                            inactivePreloader();
                            console.log('Vamos a buscar la categoría: ', parentCategory, ' del proyecto: ', arrDataCreateComponent.idProject)
                            // getComponentsCategories(category)
                            // getProjectComponents();
                            // getComponentsCategories(res[1].idProject);
                            // if (category == 'base') {
                            //     // getComponentsCategories('base', idProject);
                            // }
                        }
                    });
                    
                }
                
            }
        });

        // * Transfiriendo componente a otra categoría
        AJAXGJ8({
            url: 'Componentes/setTransfer',
            data: [{
                componentId,
                newCategory: parentCategory,
                idProject: arrDataCreateComponent.idProject
            }],
            success: function(res) {
                res = JSON.parse(res);
                console.log(res)
                if (res.status) {
                    alert(res.msg)
                    el('.create__component__step').classList.toggle('create__component__step--active');
                    el('.create__component__step').classList.remove('create__component__step--transfer');
                    toggleStepCreateComponent();
                } else {
                    alert(res.msg)
                }
            }
        });
    }

}});
// * Data Create Component 
function dataCreateComponentEnd() {
    console.log('Este es el final')
    console.log(arrDataCreateComponent)
    return arrDataCreateComponent;
}
// * Open Create Component
function openCreateComponent() {
    el('.create__component__step').classList.toggle('create__component__step--active');
}
selectedFolderProject()

    
    // * Create Component
    const closeComponents = el(`.close__component`);
    onclick({
        el: closeComponents,
        res: (res) => {
            components.classList.toggle('create__components--active');
            el('.list-container').classList.toggle('active');
            toggleStepCreateComponent();
        }
    });
    let createComponent = contentLoadedButtonsComponents();
    console.log(createComponent)
    createComponent.map(btn => {
        onclick({
            el: btn,
            res: (res) => {
                console.log(btn)
                if (btn.classList.contains('card-work')) {
                    // * Get only component
                    // console.log(btn)
                    // let id = btn.getAttribute('component');
                    // AJAXGJ8({
                    //     url: 'Componentes/getComponent',
                    //     data: [{
                    //         id
                    //     }],
                    //     success: function (res) {
                    //         res = JSON.parse(res)
                    //         console.log(res)
                    //         let htmlDecode = res[0].html.replaceAll('___amp___', '&');
                    //         let cssDecode = res[0].css.replaceAll('___amp___', '&');
                    //         let jsDecode = res[0].js.replaceAll('___amp___', '&');
                    //         htmlEditor.setValue(htmlDecode);
                    //         cssEditor.setValue(cssDecode);
                    //         jsEditor.setValue(jsDecode);

                    //         updateIframeOutput({
                    //             lang: 'html',
                    //             value: htmlDecode
                    //         })
                    //         updateIframeOutput({
                    //             lang: 'css',
                    //             value: cssDecode
                    //         })
                    //         updateIframeOutput({
                    //             lang: 'js',
                    //             value: jsDecode
                    //         })
                    //         getComponents();
                    //     }
                    // });
                } else {
                    el('.component__settings').classList.remove('component__settings--active');
                    el('.create__component__step').classList.remove('create__component__step--transfer');
                    console.log('not component')
                    htmlEditor.setValue('');
                    cssEditor.setValue('');
                    jsEditor.setValue('');
                    updateIframeOutput({
                        lang: 'html',
                        value: ''
                    })
                    updateIframeOutput({
                        lang: 'css',
                        value: ''
                    })
                    updateIframeOutput({
                        lang: 'js',
                        value: ''
                    });
                    // * Abrir Forms-step
                    openCreateComponent();
                    el('.more-button-list').classList.remove('more-button-list--active');
                }
                // components.classList.toggle('create__components--active');
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
    // monaco.editor.setModelLanguage('html', 'markdown');

    
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
    onclick({
        el: '.save__component',
        res: (res) => {
            saveComponent();
        }
    });
    let isCtrl = false;
    // document.onkeyup = function (e) {
    //     if (e.keyCode == 17) isCtrl = false;
    // }

    document.onkeydown = function (e) {
        // if (e.keyCode == 17) isCtrl = true;
        // if (e.keyCode == 83 && isCtrl == true) {
        //     saveComponent();
        //     return false;
        // }
        // if (e.keyCode == 81 && isCtrl == true) {
        //     el('.components__items').classList.toggle('components__items--active')
        //     components.classList.remove('create__components--active');
        //     return false;
        // }
        // if (e.keyCode == 49 && isCtrl == true) {
        //     fullscreenComponent();
        //     return false;
        // }
        if (event.key === "Escape") {
            el('.list-container').classList.remove('active');
            if (components.classList.contains('create__components--active')) {
                components.classList.remove('create__components--active');
                toggleStepCreateComponent();
            } else {
                openCreateComponent();
            }
        }
    }
    function saveComponent() {
            let nameComponent = el('input[name="name__component"]').value;
            let htmlEncode = htmlEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');
            let cssEncode = cssEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');
            let jsEncode = jsEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');



            let idProject = arrDataCreateComponent.idProject;
            let category = arrDataCreateComponent.category.id;
            AJAXGJ8({
                url: 'Componentes/setComponents',
                data: [{
                    html: htmlEncode,
                    css: cssEncode,
                    js: jsEncode,
                    user: el('.main__content').getAttribute('id'),
                    name: nameComponent,
                    idProject,
                    category
                }],
                success: function (res) {
                    console.log(res)
                    res = JSON.parse(res);
                    if (res.status) {
                        el('.list-container').classList.remove('active');
                        // getComponents();
                        alert(res.msg);
                        el('.create__component__step').classList.toggle('create__component__step--active');
                        components.classList.toggle('create__components--active');
                        // *
                        htmlEditor.setValue('');
                        cssEditor.setValue('');
                        jsEditor.setValue('');
                        // getProjectComponents();
                        toggleStepCreateComponent();
                        // cleanHtml('.main__breadcumb');
                        // viewHtml({el: '.main__breadcumb', content: /*html*/ `
                        // <span class="breadcumb__item" item="base"> 
                        //     Proyectos
                        // </span>`});
                        // openBreadcumb();


                        // *
                        AJAXGJ8({
                            url: 'Categorias/getTree/' + category,
                            success: function(resTree) {
                                resTree = JSON.parse(resTree);
                                console.log(resTree)
                                // * ¿En que proyecto estamos?
                                if (resTree.length > 0) {
                                AJAXGJ8({
                                    url: 'Proyectos/getProject/' + idProject,
                                    success: function(resProject) {
                                        resProject = JSON.parse(resProject);
                                        console.log(resProject)
                                        // * Nuevo Breadcumb al transferir componente
                                        cleanHtml('.main__breadcumb');
                                        cleanHtml('#cards__projects__components');
                                        viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                        <span class="breadcumb__item" item="base"> 
                                            Proyectos
                                        </span>`});
                                        // * Cargando los proyectos
                                        for (itemProject of resProject) {
                                            viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                            <span class="breadcumb__item" item="${itemProject.id}" folder="project"> 
                                            <i class="material-icons-outlined">chevron_right</i> ${itemProject.nombre}
                                            </span>`});
                                            console.log('proyecto en curso: ======= ', itemProject.id, ' ¬ Categoría en curso: ', category)
                                        }
                                        console.log('Este es el id del pryecto de donde vamos a traer los componentes y categorias',resProject.at(resProject.length - 1).id)
                                        for (itemCategory of resTree) {
                                            if (itemCategory != false) {
                                                viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                                <span class="breadcumb__item" item="${itemCategory.id}"> 
                                                <i class="material-icons-outlined">chevron_right</i> ${itemCategory.nombre}
                                                </span>`});
                                                console.log('subcategorías en curso: ======= ', itemCategory.id)
                                            }
                                        }
                                        console.log('Cargando las subcategorias y componentes de esta categoría: ',resTree.at(resTree.length - 1).id)
                                        // getComponentsCategories(resTree.at(resTree.length - 1).id);
                                        
                                        // ! Este me está trayendo los componentes de la categoría en el cual registré el último componente
                                        getSubcategory(resTree.at(resTree.length - 1).id || category, idProject);
                                        // getProjectComponent(resTree.at(resTree.length - 1).id);

                                        openBreadcumb();
                                        console.log('Vamos a buscar la categoría: ', category, ' del proyecto: ', idProject)
                                        // getComponentsCategories(category)
                                        // getProjectComponents();
                                        // getComponentsCategories(res[1].idProject);
                                        // if (category == 'base') {
                                        //     // getComponentsCategories('base', idProject);
                                        // }
                                    }
                                });
                                }
                                
                            }
                        });
                    } else {
                        alert(res.msg)
                    }
                }
            });
    }

    // * Guardando edición del componente
    function saveComponentEdition() {
        let idComponent = el('.save__edit__component').getAttribute('item');
        let nameComponent = el('input[name="name__component"]').value;
        let htmlEncode = htmlEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');
        let cssEncode = cssEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');
        let jsEncode = jsEditor.getValue().replaceAll('&', '___amp___').replaceAll('+', '___plus___');
        let idProject = el('.save__edit__component').getAttribute('idProject');
        let category = el('.save__edit__component').getAttribute('category');
        console.log({
            name: nameComponent,
            idProject,
            category,
            idComponent
        })
        AJAXGJ8({
            url: 'Componentes/updateComponent',
            data: [{
                html: htmlEncode,
                css: cssEncode,
                js: jsEncode,
                user: el('.main__content').getAttribute('id'),
                name: nameComponent,
                idProject,
                category,
                idComponent
            }],
            success: function (res) {
                console.log(res)
                res = JSON.parse(res);
                if (res.status) {
                    el('.list-container').classList.remove('active');
                    alert(res.msg);
                    // ! Ubicación del componente
                    AJAXGJ8({
                        url: 'Categorias/getTree/' + category,
                        success: function(resTree) {
                            resTree = JSON.parse(resTree);
                            console.log(resTree)
                            // * ¿En que proyecto estamos?
                            if (resTree.length > 0) {
                            AJAXGJ8({
                                url: 'Proyectos/getProject/' + idProject,
                                success: function(resProject) {
                                    resProject = JSON.parse(resProject);
                                    console.log(resProject)
                                    // * Nuevo Breadcumb al transferir componente
                                    cleanHtml('.main__breadcumb');
                                    cleanHtml('#cards__projects__components');
                                    viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                    <span class="breadcumb__item" item="base"> 
                                        Proyectos
                                    </span>`});
                                    // * Cargando los proyectos
                                    for (itemProject of resProject) {
                                        viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                        <span class="breadcumb__item" item="${itemProject.id}" folder="project"> 
                                        <i class="material-icons-outlined">chevron_right</i> ${itemProject.nombre}
                                        </span>`});
                                        console.log('proyecto en curso: ======= ', itemProject.id, ' ¬ Categoría en curso: ', category)
                                    }
                                    console.log('Este es el id del pryecto de donde vamos a traer los componentes y categorias',resProject.at(resProject.length - 1).id)
                                    for (itemCategory of resTree) {
                                        if (itemCategory != false) {
                                            viewHtml({el: '.main__breadcumb', content: /*html*/ `
                                            <span class="breadcumb__item" item="${itemCategory.id}"> 
                                            <i class="material-icons-outlined">chevron_right</i> ${itemCategory.nombre}
                                            </span>`});
                                            console.log('subcategorías en curso: ======= ', itemCategory.id)
                                        }
                                    }
                                    console.log('Cargando las subcategorias y componentes de esta categoría: ',resTree.at(resTree.length - 1).id)
                                    // getComponentsCategories(resTree.at(resTree.length - 1).id);
                                    
                                    // ! Este me está trayendo los componentes de la categoría en el cual registré el último componente
                                    getSubcategory(resTree.at(resTree.length - 1).id || category, idProject);

                                    openBreadcumb();
                                    console.log('Vamos a buscar la categoría: ', category, ' del proyecto: ', idProject)
                                }
                            });
                            }
                            
                        }
                    });











                } else {
                    alert(res.msg);
                }
            }
        });
    }


    onclick({el: '.save__edit__component', res: function(e) {
        saveComponentEdition();
    }});
    



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
    
    if (el('.create__components').classList.contains('create__components--active')) {
        el('.component__settings').classList.toggle('component__settings--active')
    }
}
onclick({
    el: '#fullscreen__component',
    res: function (res) {
        fullscreenComponent()
    }
});

onclick({
    el: '.more-button',
    res: (e) => {
        el('.list-container').classList.toggle('active');
    }
});

// * Proyectos
// * Get Languages
AJAXGJ8({
    url: 'Proyectos/getLanguages',
    success: function (res) {
        res = JSON.parse(res);
        selectMultiple('#select__languages', res.map(x => {
            return {
                name: x.nombre,
                id: x.id,
            }
        }));
    }
});
// * Set Projects
onclick({
    el: '.set__projects',
    res: function (res) {
        let form = el('.form__add__projects');
        let nombre = form.querySelector('input[name="nombre"]')
        let status = form.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
        let selectMembers = el('#select__members');
        let selectLangs = el('#select__languages');
        let members = [];
        let langs = [];
        let descripcion = form.querySelector('textarea[name="descripcion"]');
        [...selectMembers.querySelectorAll('a')].map(member => {
            members.push(member.getAttribute('data-value'));
        });
        [...selectLangs.querySelectorAll('a')].map(lang => {
            langs.push(lang.getAttribute('data-value'));
        })

        function clearForm() {
            [...selectMembers.querySelectorAll('a')].map(member => {
                member.remove();
            });
            [...selectLangs.querySelectorAll('a')].map(lang => {
                lang.remove();
            });
            descripcion.value = '';
            nombre.value = '';
            let idModal = '#' + form.closest('.modal').getAttribute('id')
            closeModal(idModal)
        }
        AJAXGJ8({
            url: 'Proyectos/setProjects',
            data: [{
                nombre: nombre.value,
                status,
                members,
                descripcion: descripcion.value,
                langs
            }],
            success: function (res) {
                res = JSON.parse(res);
                console.log(res)
                if (res.status) {
                    alert(res.msg)
                    clearForm();
                    getProjects('#cards__projects');
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});
// * Get Projects
function getProjects(selector) {
    AJAXGJ8({
        url: 'Proyectos/getProjects',
        success: function (res) {
            res = JSON.parse(res)
            console.log(res)
            cleanHtml(selector);
                for (item of res) {
                    let html = /*html*/ `
                    <div class="card__project" item="${item.id}">
                        <div class="card__project-content">
                            <div class="card__project-title">
                                ${ item.nombre }
                            </div>
                            <div class="card__project-description" max-word="14">
                                ${ item.descripcion } 
                            </div>
                            <div class="card__project-options">
                            </div>
                            <div class="tag ${item.status == '0' ? 'tag--paused' : 'tag--progress'}">
                                ${item.status == '0' ? 'pausado' : 'en progreso'}
                            </div>
                            <div class="card__project-users">`;
                    item.members.map((member, index) => {
                        if (index <= 3) {
                            html += `<span class="tag__user tooltip" data-tooltip="${member.nombre}" data-tooltip-position="top">${ member.nombre[0] }</span>`;
                        }
                    })
                    let membersLast = [];
                    for (let indexM = 4; indexM < item.members.length; indexM++) {
                        const element = item.members[indexM].nombre;
                        membersLast.push(element)
                    }
                    console.log(membersLast)
                    if (item.members.length > 3) {
                        html += `<small class="tooltip" data-tooltip="${ membersLast.map(last => last.toString()).join(', ') }" data-tooltip-position="top">+${ (item.members.length - 4) }</small>`;
                    }
                    html += `
                            </div>
                        </div>
                    </div>`;
                    viewHtml({
                        el: selector,
                        content: html
                    });
                    openProjects();
            }
        }
    });
}
getProjects('#cards__projects');
//  * Open Projects
function openProjects() {
    let cardsProjects = getAllElements({
        el: '.card__project .card__project-content'
    });
    console.log(cardsProjects)
    cardsProjects.map(project => {
        project = project.parentElement
        onclick({
            el: project,
            res: function (res) {
                project.classList.add('card__project--expand')
                project.querySelector('.card__project-content').classList.add('card__project-content--hidden')
                el('.card__project-edit').classList.add('card__project-edit--show')
                dataProject(project.attributes[1].textContent)
                getCategories(project.attributes[1].textContent, el('.chevrondown-content-gj8.projects'));
            }
        });
    });
    onclick({
        el: '.close__project',
        res: function (res) {
            el('.card__project--expand').querySelector('.card__project-content').classList.remove('card__project-content--hidden');
            el('.card__project--expand').classList.remove('card__project--expand');
            el('.card__project-edit').classList.remove('card__project-edit--show');
        }
    });
}

function dataProject(id) {
    console.log(id)
    AJAXGJ8({
        url: 'Proyectos/getProject/' + id,
        success: function (res) {
            res = JSON.parse(res)
            let data = res[0];
            el('.card__project-edit-title').setAttribute('item', id);
            el('.card__project-edit-title').textContent = data.nombre;
            if (data.status == '0') {
                el('.tag__status').classList.remove('tag--progress');
                el('.tag__status').classList.add('tag--paused');
                el('.tag__status').textContent = 'pausado';
            } else {
                el('.tag__status').classList.remove('tag--paused');
                el('.tag__status').classList.add('tag--progress');
                el('.tag__status').textContent = 'en progreso';
            }
            el('.card__project-edit-description').textContent = data.descripcion;
            cleanHtml('.tags__members');
            for (member of data.members) {
                viewHtml({
                    el: '.tags__members',
                    content: /*html*/ `
                    <small item="${member.nombre} - ${member.tipo}">
                        <div class="profile">${member.nombre.at(0)}</div>
                        <div class="profile--rol">
                            <span class="profile--rol-name">${member.nombre}</span>
                            <span class="profile--rol-rol">${member.tipo}</span>
                        </div>
                    </small>`
                })
            }
            cleanHtml('.tags__languages');
            for (lang of data.langs) {
                viewHtml({
                    el: '.tags__languages',
                    content: /*html*/ `
                <div class="tooltip" data-tooltip="${ lang.nombre }" data-tooltip-position="top">
                    <img src="${BASE_URL}Assets/img/icons/icons/${ lang.nombre }/${ lang.nombre }-original.svg" alt="${ lang.nombre }__svg">
                </div>`
                })
            }
        }
    });
}
// * Get Categories
function getCategories(idProject, elCategories) {
    AJAXGJ8({
        url: 'Categorias/getCategories/' + idProject,
        success: function (res) {
            res = JSON.parse(res);
            console.log(res)
            let categories = elCategories;
            let parentElement = categories.closest('.main-chevrondown-gj8');
            cleanHtml(categories);
            res.map(item => {
                if (item.subcategory.length > 0) {
                    categories.innerHTML += /* html */ `
                <div class="chevrondown-item-gj8">
                    <div class="chevrondown-head-gj8">
                        <i class="material-icons">chevron_right</i>
                        <span class="chevrondown-radio-button" item="${item.id}"></span>
                        <span>${ item.nombre } </span> <span class="category-mark">(Categoría)</span>
                    </div>
                    <div class="chevrondown-content-gj8">
                        ${ viewSubCat(item.subcategory) }
                    </div>
                </div>`
                } else {
                    categories.innerHTML += /* html */ `
                <div class="chevrondown-head-gj8">
                    <div class="sp"></div>
                    <span class="chevrondown-radio-button" item="${item.id}"></span>
                    <span>${ item.nombre } </span> <span class="category-mark">(Categoría)</span>
                </div>`
                }

                // !_____________________________________________________________________________________
                let chevrondownHead = [...parentElement.querySelectorAll('.chevrondown-head-gj8 i')];
                let radioBtns = [...parentElement.querySelectorAll('.chevrondown-gj8 .chevrondown-radio-button')];
                let chevrondownContents = [...parentElement.querySelectorAll('.chevrondown-content-gj8')];

                chevrondownHead.map((item, index) => {
                    const content = item.parentElement.parentElement.children[1]
                    const arrow = item
                    if (content != undefined && arrow != undefined) {
                        item.addEventListener('click', (e) => {
                            // console.log(content)
                            e.preventDefault();
                            if (content.classList.contains('not')) {
                                // console.log(content)
                                content.style.display = 'block'
                                arrow.style.transform = 'rotate(90deg)'
                            } else {
                                if (content.style.display == '' || content.style.display == 'none') {
                                    content.style.display = 'block'
                                    arrow.style.transform = 'rotate(90deg)'
                                } else {
                                    content.style.display = 'none'
                                    arrow.style.transform = 'rotate(0deg)'
                                }
                            }
                        });
                    }
                });
                radioBtns.map(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        let content = btn.parentElement.parentElement.children[1]
                        let text = btn.parentElement
                        let arrow = btn.parentElement.querySelector('i')
                        if (arrow != null) {
                            radioBtns.map(_btn => {
                                if (_btn.classList.contains('active')) {
                                    // console.log(_btn.closest('.chevrondown-item-gj8').querySelector('.chevrondown-content-gj8'))
                                    // console.log(btn.closest('.chevrondown-item-gj8'))
                                    _btn.classList.remove('active')

                                    if (_btn.classList.contains('not')) {
                                        btn.classList.add('active')
                                        content.style.display = 'block'
                                        arrow.style.transform = 'rotate(90deg)'
                                    } else {
                                        btn.classList.add('active')
                                        content.style.display = 'block'
                                        arrow.style.transform = 'rotate(90deg)'
                                    }
                                }
                            })
                        } else {
                            radioBtns.map(_btn => {
                                if (_btn.classList.contains('active')) {
                                    // console.log(_btn.closest('.chevrondown-item-gj8').querySelector('.chevrondown-content-gj8'))

                                    if (_btn.closest('.chevrondown-item-gj8').querySelector('.chevrondown-content-gj8').contains(e.target)) {
                                        // console.log('Estoy dentro de ti content')
                                    } else {
                                        _btn.closest('.chevrondown-item-gj8').querySelector('.chevrondown-content-gj8').style.display = 'none'
                                        _btn.closest('.chevrondown-item-gj8').querySelector('i.material-icons').style.transform = 'rotate(0deg)'
                                        // console.log('Fuera del content')
                                    }
                                    _btn.classList.remove('active')
                                    btn.classList.add('active')
                                }
                            })
                        }
                    });
                });
                parentElement.querySelector('.main-chevrondown-gj8 .expand-less-gj8').addEventListener('click', (e) => {
                    e.preventDefault();
                    chevrondownContents.map(content => {
                        content.style.display = 'none'
                    });
                    [...parentElement.querySelectorAll('.chevrondown-gj8 i')].map(i => {
                        i.style.transform = 'rotate(0deg)'
                    });
                });
                parentElement.querySelector('.main-chevrondown-gj8 .expand-more-gj8').addEventListener('click', (e) => {
                    e.preventDefault();
                    chevrondownContents.map(content => {
                        content.style.display = 'block'
                    });
                    [...parentElement.querySelectorAll('.chevrondown-gj8 i')].map(i => {
                        i.style.transform = 'rotate(90deg)'
                    });
                });
                // !_____________________________________________________________________________________

            });

            function viewSubCat(categories) {
                let html = ''
                categories.map(x => {
                    if (x.subcategory.length > 0) {
                        html += /* html */ `
                    <div class="chevrondown-item-gj8">
                        <div class="chevrondown-head-gj8">
                            <i class="material-icons">chevron_right</i>
                            <span class="chevrondown-radio-button" item="${x.id}"></span>
                            <span>${ x.nombre } </span>
                        </div>
                        `
                        html += /* html */ `
                        <div class="chevrondown-content-gj8">
                            ${ viewSubCat(x.subcategory) }
                        </div>
                    </div>`
                    } else {
                        html += /* html */ `
                    <div class="chevrondown-head-gj8">
                        <div class="sp"></div>
                        <span class="chevrondown-radio-button" item="${x.id}"></span>
                        <span>${ x.nombre } </span>
                    </div>`
                    }
                })
                return html;
            }





        }
    });
}

// * Btn Edit Project
let title = el('.card__project-edit-title');
let description = el('.card__project-edit-description');
let members = el('.tags__members');
let langs = el('.tags__languages');
let iconEdit = el('.edit__project');
let iconClose = el('.close__project');
let saveProjectEdit = el('.save__project__edit');
let cancelProjectEdit = el('.cancel__project__edit');
let membersSelected = [];
let langsSelected = [];
onclick({el: '.edit__project', res: function(res) {
    [iconClose, iconEdit, el('.tag__status'), members, langs].map(x => {
        hide(x);
    });
    [saveProjectEdit, cancelProjectEdit, el('.tag__status__edit'), el('.select__members__edit'), el('.select__langs__edit')].map(x => {
        show(x)
    });
    [title, description].map(item => {
        contenteditable(item, true);
    });
    console.log('Justo debajo')
    console.log(membersSelected)
    // * Members Selected
    for (let y = 0; y < members.childNodes.length; y++) {
        const element = members.children[y];
        if (element != undefined) {
            console.log(element.getAttribute('item'))
            membersSelected.push(element.getAttribute('item'));
        }
    }

    // * Languages Selected
    for (let y = 0; y < langs.childNodes.length; y++) {
        const element = langs.children[y];
        if (element != undefined) {
            langsSelected.push(element.getAttribute('data-tooltip'));
        }
    }

    AJAXGJ8({
        url: 'Usuarios/getUsers',
        success: function (res) {
            res = JSON.parse(res);
            console.log(res)
            selectMultiple('#select__members__edit', res.map(x => {
                return {
                    name: x.nombre + ' - ' + x.tipo,
                    id: x.id,
                    selected: membersSelected.some(member => member === (x.nombre + ' - ' + x.tipo)  ? true:false)
                }
            }));
        }
    });
    AJAXGJ8({
        url: 'Proyectos/getLanguages',
        success: function (res) {
            res = JSON.parse(res);
            console.log(res)
            selectMultiple('#select__langs__edit', res.map(x => {
                return {
                    name: x.nombre,
                    id: x.id,
                    selected: langsSelected.some(lang => lang === x.nombre ? true : false)
                }
            }));
        }
    });


}});
onclick({el: '.cancel__project__edit', res: function(res) {
    closeProjectEdit();
}});
function closeProjectEdit() {
    [iconClose, iconEdit, el('.tag__status'), members, langs].map(x => {
        show(x);
    });
    [saveProjectEdit, cancelProjectEdit, el('.tag__status__edit'), el('.select__members__edit'), el('.select__langs__edit')].map(x => {
        hide(x)
    });
    [title, description].map(item => {
        contenteditable(item, false);
    });
}
// * Delete Project
onclick({el: '.delete__project', res: function(res) {
    if (confirm('¿Está seguro de eliminar todoas las categorías y componentes de este proyecto?')) {
        let idProject = el('.card__project-edit-title').getAttribute('item');
        AJAXGJ8({
            url: 'Proyectos/deleteProject/' + idProject,
            success: function(res) {
                res = JSON.parse(res);
                console.log(res)
                if (res) {
                    el(`.card__project[item="${idProject}"]`).remove();
                    el('.close__project').closest('.card__project-edit').classList.remove('card__project-edit--show');
                }
            }
        });
    }
}});
// * Save Edit
onclick({el: '.save__project__edit', res: function(res) {
    res.stopImmediatePropagation();
    let status = el('.tag__status__edit').querySelector('.switch__label').matches('.switch__off') ? 0 : 1;
    let members = getAllElements({el: '#select__members__edit a'}).map(a => {
        return a.getAttribute('data-value');
    });
    let langs = getAllElements({el: '#select__langs__edit a'}).map(a => {
        return a.getAttribute('data-value');
    });
    console.log({
        id: title.getAttribute('item'),
        title: title.textContent.trim(),
        description: description.textContent.trim(),
        status,
        members,
        langs
    })
    AJAXGJ8({
        url: 'Proyectos/updateProject',
        data: [{
            id: title.getAttribute('item'),
            title: title.textContent.trim(),
            description: description.textContent.trim(),
            status,
            members,
            langs
        }],
        success: function(res) {
            console.log(res)
            res = JSON.parse(res);
            if (res.status) {
                alert(res.msg)
                closeProjectEdit();
                dataProject(title.getAttribute('item'))
            } else {
                alert(res.msg)
            }
        }
    });
}});

// * Categories
// * Set
let formCategory = el('.form__add__categories');
onclick({el: '.set__category', res: function(res) {
    let idProject = title.getAttribute('item');
    let name = formCategory.querySelector('input[name="nombre"]').value;
    let status = formCategory.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
    let global = formCategory.querySelector('.md-checkbox input').checked ? 1 : 0;  
    let parentCategory = getAllElements({el:'.form__add__categories .chevrondown-radio-button'}).filter(x => x.classList.contains('active'))[0].getAttribute('item')
    console.log({
        idProject, name, status, global, parentCategory
    });
    AJAXGJ8({
        url: 'Categorias/setCategory',
        data: [{
            idProject,
            name,
            status,
            global,
            parentCategory,
            tipo: parentCategory == 'base' ? 'categoria' : 'subcategoria'
        }],
        success: function(res) {
            res = JSON.parse(res);
            if (res.status) { 
                alert(res.msg)
            } else {
                alert(res.msg)
            }
        }
    });
}});

// * Preloader
function activePreloader() {
    el('.main__preloader').classList.add('main__preloader--active');
}
function inactivePreloader() {
    setTimeout(() => {
        el('.main__preloader').classList.remove('main__preloader--active');
    }, 800);
}

// * Components Projects
function getProjectComponents() {
    activePreloader();
    AJAXGJ8({
        url: 'Proyectos/getProjects',
        success: function(res) {
            res = JSON.parse(res);
            console.log(res)
            cleanHtml('#cards__projects__components');
            for (item of res) {
                let html = /*html*/ `
                <div class="card__project card__project__component" item="${item.id}" folders="${item.categorias.length}" > 
                    <div class="card__project-content">
                        <div class="card__project-title">
                            ${ item.nombre }
                        </div>
                        <div class="tag ${item.status == '0' ? 'tag--paused' : 'tag--progress'} mt-3">
                            ${item.status == '0' ? 'inactivo' : 'activo'}
                        </div>
                        <div class="card__project-users">
                            <small class="center gap-5">
                                <i class="material-icons-outlined">folder</i> <span>${item.categorias.length}</span>
                            </small>
                        </div>
                    </div>
                </div> `;
                viewHtml({
                    el: '#cards__projects__components',
                    content: html
                });
                openProjectsComponents();
                // if (item.categorias.length > 0) {
                // }
            }
            inactivePreloader();
        }
    });
}
getProjectComponents()
// * Open Project Components
function openProjectsComponents() {
    let cardsProjects = getAllElements({
        el: '.card__project.card__project__component .card__project-content'
    });
    console.log(cardsProjects)
    cardsProjects.map(project => {
        project = project.parentElement
        onclick({
            el: project,
            res: function (res) {
                // console.log(project.getAttribute('item'))
                if (project.getAttribute('folders') > 0) {
                    viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    <span class="breadcumb__item" item="${project.getAttribute('item')}" folder="project"> 
                        <i class="material-icons-outlined">chevron_right</i>${ project.querySelector('.card__project-title').textContent.trim() }
                    </span>`});
                    getProjectComponent(project.getAttribute('item'));
                }
            }
        });
    });
}
// * Todas las categorías
function getProjectComponent(id) {
    console.log(id)
    AJAXGJ8({
        url: 'Categorias/getCategory/' + id,
        success: function(res) {
            res = JSON.parse(res);
            console.log(res)
            cleanHtml('#cards__projects__components');
            for (item of res) {
                if (item != undefined) {
                    let html = /*html*/ `
                    <div class="card__project card__project__component" item="${item.id}" folders="${item.subcategory.length}" components="${item.components.length}"> 
                        <div class="card__project-content">
                            <div class="card__project-title">
                                ${ item.nombre }
                            </div>
                            <div class="tag ${item.estado == 'inactive' ? 'tag--paused' : 'tag--progress'} mt-3">
                                ${item.status == 'inactive' ? 'inactivo' : 'activo'}
                            </div>
                            <div class="card__project-users">
                                <small class="center gap-5">
                                    <i class="material-icons-outlined">perm_media</i> <span>${item.components.length}</span>
                                </small>
                                <small class="center gap-5">
                                    <i class="material-icons-outlined">folder</i> <span>${item.subcategory.length}</span>
                                </small>
                            </div>
                        </div>
                    </div> `;
                    viewHtml({
                        el: '#cards__projects__components',
                        content: html
                    });
                    openCategories();
                }
                // if (item.subcategory.length > 0) { }
            }
        }
    });
    // * Trayendo componentes base
    getComponentsCategories('base', id);
}
// * Cargando componentes de cada categoría
function openCategories() {
    let cardsProjects = getAllElements({
        el: '.card__project.card__project__component .card__project-content'
    });
    openBreadcumb();
    cardsProjects.map(project => {
        project = project.parentElement
        onclick({
            el: project,
            res: function (res) {
                console.log('Abri3ndo las subcategorias')
                console.log(project.getAttribute('components'))
                if (project.getAttribute('folders') > 0) {
                    viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    <span class="breadcumb__item" item="${project.getAttribute('item')}"> 
                        <i class="material-icons-outlined">chevron_right</i>${ project.querySelector('.card__project-title').textContent.trim() }
                    </span>`});
                    console.log('Estoy abriendo esta subcategoría ahora: ', project.getAttribute('item'))
                    getSubcategory(project.getAttribute('item'));
                    openBreadcumb();
                }
                if (project.getAttribute('folders') == 0 && project.getAttribute('components') > 0) {
                    viewHtml({el: '.main__breadcumb', content: /*html*/ `
                    <span class="breadcumb__item" item="${project.getAttribute('item')}" folder="subcategory"> 
                        <i class="material-icons-outlined">chevron_right</i>${ project.querySelector('.card__project-title').textContent.trim() }
                    </span>`});
                    console.log('Estoy abriendo componentes de esta subcategoría ahora: ', project.getAttribute('item'))
                    cleanHtml('#cards__projects__components');
                    getComponentsCategories(project.getAttribute('item'))
                }
            }
        });
    });
}
function openBreadcumb() {
    const itemsBreadcumbs = getAllElements({el: '.breadcumb__item'});
    console.log(itemsBreadcumbs)
    itemsBreadcumbs.map(item => {
        onclick({el: item, res: function(res) {
            console.log(item.getAttribute('item'), ' - Breadcumb')
            let sibling = item.nextElementSibling;
            while (sibling) {
                sibling.remove();
                sibling = item.nextElementSibling;
            }
            if (item.getAttribute('item') == 'base') {
                getProjectComponents();
            } else {
                if (item.getAttribute('folder') == 'project') {
                    // * Abriendo solamente los proyectos
                    getProjectComponent(item.getAttribute('item'));
                    console.log('Solo proyectos')
                } else if (item.getAttribute('folder') == 'subcategory') {
                    // * Abriendo solamente los componentes de las subcategorías
                    console.log('Abriendo solamente los componentes de las subcategorías')
                    cleanHtml('#cards__projects__components');
                    getComponentsCategories(item.getAttribute('item'))
                } else {
                    // * Abriendo componentes y categorías
                    console.log('Solo subcategorías')
                    getSubcategory(item.getAttribute('item'));
                }
            }
        }});
    });
}
openBreadcumb();
// * Cargando categorías, subcactegorías y componentes de cada proyecto según la categoría
function getSubcategory(id, idProject = 'none') {
    activePreloader();
    console.log('Buscando IDPROJECT: ', idProject, ' en la CATEGORÍA:', id)
    AJAXGJ8({
        url: 'Categorias/getSubcategory/' + id,
        data: [{ idProject }],
        success: function(res) {
            
            res = JSON.parse(res);
            console.log('---------------------------------------------')
            console.log(res)
            if (res.length > 0) {
                console.log(res)
                cleanHtml('#cards__projects__components');
                for (item of res) {
                    let html = /*html*/ `
                    <div class="card__project card__project__component" item="${item.id}" folders="${item.subcategory.length}" components="${item.components.length}"> 
                        <div class="card__project-content">
                            <div class="card__project-title">
                                ${ item.nombre }
                            </div>
                            <div class="tag ${item.estado == 'inactive' ? 'tag--paused' : 'tag--progress'} mt-3">
                                ${item.status == 'inactive' ? 'inactivo' : 'activo'}
                            </div>
                            <div class="card__project-users">
                                <small class="center gap-5">
                                    <i class="material-icons-outlined">perm_media</i> <span>${item.components.length}</span>
                                </small>
                                <small class="center gap-5">
                                    <i class="material-icons-outlined">folder</i> <span>${item.subcategory.length}</span>
                                </small>
                            </div>
                        </div>
                    </div> `;
                    viewHtml({
                        el: '#cards__projects__components',
                        content: html
                    });
                    openCategories();
                }
                inactivePreloader();
            } 
        }
    });
    // * Trayendo los componentes de esta categoría
    getComponentsCategories(id, idProject);
}
// * Trayendo los componentes de cada categoría
function getComponentsCategories(id, idProject = 'none') {
    activePreloader();
    console.log('Trayendo los componentes de cada categoría en el proyecto: ', idProject)
    AJAXGJ8({
        url: 'Categorias/getComponentsCategories/' + id,
        data:[{idProject}],
        success: function(res) {
            res = JSON.parse(res);
            console.log(res)
            
            let html = '';
            setTimeout(() => {
                if (res.length > 0) {
                    res.map((component, index) => {
                        viewHtml({
                            el: '#cards__projects__components',
                            content: /*html*/ `<div class="card__load__component card__project card__project__component" component="${component.id}" id="${component.image}" style="animation-delay: ${index + 1}00ms;"> 
                            <p class="title__component__load">${component.nombre}</p>
                            <iframe class="iframe__component" src="${BASE_URL}/Components/${component.image}.html" scrolling="no"></iframe>
                        </div>`
                        });
                        openCategories();
                        loadComponent();
                    });
                }
                inactivePreloader();
            }, 300);
        }

    });
}

function loadComponent() {
    // * Cargar un solo componente
    let cardsLoadComponents = getAllElements({el: '.card__load__component .title__component__load'});
    cardsLoadComponents.map(load => {
        onclick({el: load, res: function(res) {
            let componentId = load.parentElement.getAttribute('component');
            let component = load.parentElement.getAttribute('id');
            console.log('Cargando un solo componente que es: ', componentId);
            components.classList.toggle('create__components--active');
            el('.component__settings').classList.add('component__settings--active');
            el('.more-button-list').classList.add('more-button-list--active');
            // components
            AJAXGJ8({
                url: 'Componentes/getComponent',
                data: [{
                    id: componentId
                }],
                success: function (res) {
                    res = JSON.parse(res)
                    console.log(res)
                    el('.save__edit__component').setAttribute('item', res[0].id);
                    el('.save__edit__component').setAttribute('idProject', res[0].idProject);
                    el('.save__edit__component').setAttribute('category', res[0].category);
                    el('input[name="name__component"]').value = res[0].nombre;
                    let htmlDecode = res[0].html.replaceAll('___amp___', '&').replaceAll('___plus___', '+');
                    let cssDecode = res[0].css.replaceAll('___amp___', '&').replaceAll('___plus___', '+');
                    let jsDecode = res[0].js.replaceAll('___amp___', '&').replaceAll('___plus___', '+');
                    htmlEditor.setValue(htmlDecode);
                    cssEditor.setValue(cssDecode);
                    jsEditor.setValue(jsDecode);
                    updateIframeOutput({
                        lang: 'html',
                        value: htmlDecode
                    });
                    updateIframeOutput({
                        lang: 'css',
                        value: cssDecode
                    });
                    updateIframeOutput({
                        lang: 'js',
                        value: jsDecode
                    });
                }
            });
            // * Delete component
            // deleteComponent(componentId, component);
            el('.delete__component').setAttribute('item', componentId);
            el('.delete__component').setAttribute('category', component);
            // * Transfer component
            transferComponent(componentId);
            
        }});
    });
}
// * Delete component
deleteComponent();
function deleteComponent() {
    onclick({el: '.delete__component', res: function(res) {
        console.log('Estas eliminando el componente con id: ', el('.delete__component').getAttribute('item'), ' de la categoría: ', el('.delete__component').getAttribute('category'))
        if(confirm('¿Esta seguro de eliminar este componente? No hay vuelta atrás')) {
            AJAXGJ8({
                url: 'Componentes/deleteComponent/' + el('.delete__component').getAttribute('item'),
                success: function(res) {
                    res = JSON.parse(res);
                    console.log(res)
                    if (res.status) {
                        alert(res.msg);
                        closeViewComponent();
                        console.log(el('#' + el('.delete__component').getAttribute('category')))
                        el('#' + el('.delete__component').getAttribute('category')).remove();
                    } else {
                        alert(res.msg);
                    }
                }
            });
        }
    }});
}
// * Transfer component 
function transferComponent(componentId) {
    localStorage.setItem('componentIdTransfer', componentId)
    onclick({el: '.transfer__component', res: function(res) {
        el('.create__component__step').classList.add('create__component__step--transfer');
        el('.create__component__step').classList.toggle('create__component__step--active');
        components.classList.toggle('create__components--active');
    }});
}

// * Close View Component 
function closeViewComponent() {
    components.classList.toggle('create__components--active');
    el('.component__settings').classList.toggle('component__settings--active');
}

}); /* End Require Editor */
// *
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
// ! ------------------------------------------------ww


