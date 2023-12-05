console.log('Roles JS')
const tableRoles = el('#table__roles');
const tablePermissions = el('#table__permissions');

function dataRoles() {
    AJAXGJ8({
        url: 'Roles/getRoles',
        success: function(res) {
            let data = JSON.parse(res);
            cleanHtml(tableRoles);
            let x = 1;
            data.map(item => {
                viewHtml({
                    el: tableRoles,
                    content: /*html*/ `
                    <tr class="trow">
                        <td>${ x++ }</td>
                        <td>${ item.nombrerol }</td>
                        <td>${ item.descripcion }</td>
                        <td>
                            <span class="tag tag--${ item.status == '1' ? 'active' : 'inactive' }">${ item.status == '1' ? 'Activo' : 'Inactivo' }</span>
                        </td>
                        <td style="display: flex;">
                            <button ripple class="btn btn-icon trigger__update__rol" rol="${ item.idRol }">
                                <i class="material-icons-outlined">edit</i>
                            </button>
                            <button ripple class="btn btn-icon view__permissions" rol="${ item.idRol }">
                                <i class="material-icons-outlined">policy</i>
                            </button>
                            <button ripple class="btn btn-icon trigger__delete__rol" rol="${ item.idRol }">
                                <i class="material-icons-outlined">delete</i>
                            </button>
                        </td>
                    </tr>`
                });
                switchs();
            });
            let triggersUpdate = getAllElements({el: '.trigger__update__rol'});
            triggersUpdate.map(trigger => {
                onclick({el: trigger, res: function(res) {
                    let id = res.currentTarget.getAttribute('rol')
                    getRol(id);
                    openModal('#modal__update__roles');
                }});
            });
            let triggersDelete = getAllElements({el: '.trigger__delete__rol'});
            triggersDelete.map(trigger => {
                onclick({el: trigger, res: function(res) {
                    let id = res.currentTarget.getAttribute('rol')
                    if (confirm('¿Esta seguro de eliminar este registro?')) {
                        deleteRol(id);
                    }
                }});
            });
            // TODO: Permisos
            document.querySelectorAll('.view__permissions').forEach(item => {
                onclick({
                    el: item,
                    res: function(e) {
                        openModal('#modal__permissions')
                        let idrol = e.currentTarget.attributes['rol'].textContent;
                        AJAXGJ8({
                            url: 'Permissions/getPermissions/' + idrol,
                            success: function(res) {
                                res = JSON.parse(res);
                                cleanHtml(tablePermissions);
                                let x = 1;
                                for (let modulo of res.modulos) {
                                    if (modulo != undefined) {
                                        viewHtml({
                                            // * Cargando datos de los modulos para ver sus respectivos permisos
                                            el: tablePermissions,
                                            content:  /*html*/ `
                                            <tr class="trow">
                                                <td rol="${ res.idRol }" module="${ modulo.idModulo }">${ x++ }</td>
                                                <td>${ modulo.titulo }</td>
                                                <td>${ modulo.descripcion }</td>
                                                <td>
                                                    <div class="switch mt-2">
                                                        <label ripple class="status__rol switch__label switch__label--small ${ modulo.permissions.r ? '' : 'switch__off' }">
                                                            <span class="switch__label-slider">
                                                                <span class="switch__active">Activo</span>
                                                                <span class="switch__inactive">Inactivo</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="switch mt-2">
                                                        <label ripple class="status__rol switch__label switch__label--small ${ modulo.permissions.w ? '' : 'switch__off' }">
                                                            <span class="switch__label-slider">
                                                                <span class="switch__active">Activo</span>
                                                                <span class="switch__inactive">Inactivo</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="switch mt-2">
                                                        <label ripple class="status__rol switch__label switch__label--small ${ modulo.permissions.u ? '' : 'switch__off' }">
                                                            <span class="switch__label-slider">
                                                                <span class="switch__active">Activo</span>
                                                                <span class="switch__inactive">Inactivo</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="switch mt-2">
                                                        <label ripple class="status__rol switch__label switch__label--small ${ modulo.permissions.d ? '' : 'switch__off' }">
                                                            <span class="switch__label-slider">
                                                                <span class="switch__active">Activo</span>
                                                                <span class="switch__inactive">Inactivo</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>`
                                        });
                                        switchs();
                                    }
                                }
                            },
                            error: function(err) {
                                console.error(err)
                            },
                        })
                    }
                })
            });
        },
        error: function(err) {
            console.error(err)
        }
    });
}
dataRoles();

// * Get Rol
function getRol(id) {
    console.log(id)
    let formUpdate = el('.form__update__roles');
    let estado = formUpdate.querySelector('.switch__label');
    AJAXGJ8({
        url: 'Roles/getRol',
        data: [{ id }],
        success: function(res) {
            res = JSON.parse(res)
            console.log(res)
            formUpdate.setAttribute('id', res.idRol)
            formUpdate.querySelector('input[name="nombre"]').value = res.nombrerol
            formUpdate.querySelector('input[name="descripcion"]').value = res.descripcion
            res.status == '1' ? estado.classList.remove('switch__off') : estado.classList.add('switch__off');
            
        }
    })
}
// * Update Rol
const formUpdateRoles = el('.form__update__roles');
submit({
    el: formUpdateRoles,
    res: function (res) {
        console.log(res)
        let data = new FormData(formUpdateRoles);
        let id = formUpdateRoles.getAttribute('id')
        let status = formUpdateRoles.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
        console.log(id)
        switchs();
        AJAXGJ8({
            url: 'Roles/updateRol',
            data: [{
                id,
                nombre: data.get('nombre'),
                descripcion: data.get('descripcion'),
                status
            }],
            success: function (res) {
                res = JSON.parse(res)
                console.log(res)
                if (res.status) {
                    alert(res.msg)
                    let idModal = '#' + formUpdateRoles.closest('.modal').getAttribute('id')
                    closeModal(idModal)
                    dataRoles();
                    switchs();
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});

// * Delete Rol
function deleteRol(id) {
    AJAXGJ8({
        url: 'Roles/deleteRol',
        data: [{ id }],
        success: function(res) {
            res = JSON.parse(res)
            console.log(res)
            if (res.status) {
                alert(res.msg)
                dataRoles();
            } else {
                alert(res.msg)
            }
        }
    });
}

// * Guardando Permisos
onclick({
    el: '.save__permissions',
    res: (e) => {
        let allModulesPermissions = getAllElements({el: '#table__permissions tr'});
        let data = [];
        // console.log(allModulesPermissions)
        allModulesPermissions.map(mod => {
            let idRol = mod.children[0].getAttribute('rol')
            let idModule = mod.children[0].getAttribute('module')
            let r = mod.children[3].querySelector('.switch__label').matches('.switch__off') ? 0 : 1;
            let w = mod.children[4].querySelector('.switch__label').matches('.switch__off') ? 0 : 1;
            let u = mod.children[5].querySelector('.switch__label').matches('.switch__off') ? 0 : 1;
            let d = mod.children[6].querySelector('.switch__label').matches('.switch__off') ? 0 : 1;
            data.push({ idRol, idModule, r, w, u, d });
        });
        console.log(data)
        
        AJAXGJ8({
            url: 'Permissions/setPermission',
            data: data,
            success: function(res) {
                // alert('hola vale')
                res = JSON.parse(res)
                if (res.status) {
                    alert(res.msg)
                    let idModal = '#' + e.target.closest('.modal').getAttribute('id');
                    closeModal(idModal)
                } else {
                    console.log(res.msg)
                }
            },
            error: function(err) {
                console.log(err)
            }
        });
    }
});



// * Add Roles
const formAddRoles = el('.form__add__roles');
console.log(formAddRoles)
submit({
    el: formAddRoles,
    res: function (res) {
        console.log(res) 
        let data = new FormData(formAddRoles);
        let status = formAddRoles.querySelector('.switch__label').classList.contains('switch__off') ? 0 : 1;
        AJAXGJ8({
            url: 'Roles/setRol',
            data: [{
                nombre: data.get('nombre'),
                descripcion: data.get('descripcion'),
                status
            }],
            success: function(res) {
                console.log(res)
                res = JSON.parse(res)
                if (res.status) {
                    alert(res.msg)
                    formAddRoles.reset();
                    let idModal = '#' + formAddRoles.closest('.modal').getAttribute('id')
                    closeModal(idModal)
                    dataRoles();
                } else {
                    alert(res.msg)
                }
            }
        });
    }
});

