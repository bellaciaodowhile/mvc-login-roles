console.log('Roles JS')
const tableRoles = validElement(document.querySelector('.table__content__roles'));
const tablePermissions = validElement(document.querySelector('.table__content__permissions'));
AJAXGJ8({
    url: 'Roles/getRoles',
    success: function(res) {
        let data = JSON.parse(res);
        cleanHtml(tableRoles);
        data.map(item => {
            viewHtml({
                el: tableRoles,
                content: /*html*/ `
                <tr>
                    <td> ${ item.idRol } </td>
                    <td> ${ item.nombrerol } </td>
                    <td> ${ item.descripcion } </td>
                    <td> ${ item.status } </td>
                    <td> 
                        <button class="view__permissions" rol="${ item.idRol }">
                            Permisos
                        </button>
                    </td>
                </tr>`
            });
        });
        // TODO: Permisos
        document.querySelectorAll('.view__permissions').forEach(item => {
            onclick({
                el: item,
                res: function(e) {
                    let idrol = e.currentTarget.attributes['rol'].textContent;
                    AJAXGJ8({
                        url: 'Permissions/getPermissions/' + idrol,
                        success: function(res) {
                            res = JSON.parse(res);
                            cleanHtml(tablePermissions);
                            for (let modulo of res.modulos) {
                                if (modulo != undefined) {
                                    viewHtml({
                                        el: tablePermissions,
                                        content:  /*html*/ `
                                        <tr>
                                            <td rol="${ res.idRol }"> ${ res.idRol } </td>
                                            <td class="id__modulo"> ${ modulo.idModulo } </td>
                                            <td> ${ modulo.titulo } </td>
                                            <td> ${ modulo.descripcion } </td>
                                            <td> ${ modulo.status } </td>
                                            <td> 
                                                <input class="status__rol" type="checkbox" name="r" ${ modulo.permissions.r ? 'checked' : '' }>
                                            </td>
                                            <td> 
                                                <input class="status__rol" type="checkbox" name="w" ${ modulo.permissions.w ? 'checked' : '' }>
                                            </td>
                                            <td> 
                                                <input class="status__rol" type="checkbox" name="u" ${ modulo.permissions.u ? 'checked' : '' }>
                                            </td>
                                            <td> 
                                                <input class="status__rol" type="checkbox" name="d" ${ modulo.permissions.d ? 'checked' : '' }>
                                            </td>
                                        </tr>`
                                    });
                                }
                            }
                            // TODO: Buttons Status Rol
                            document.querySelectorAll('.status__rol').forEach(elementInputCheckbox => {
                                let idRol = elementInputCheckbox.closest('tr').querySelector('td').textContent;
                                let idModuloCurrent = elementInputCheckbox.closest('tr').querySelector('.id__modulo').textContent;
                                let permissions = [...elementInputCheckbox.closest('tr').querySelectorAll('.status__rol')];
                                let newPermissions = [];
                                permissions.map(permission => {
                                    newPermissions.push({
                                        name: permission.getAttribute('name'),
                                        status: permission
                                    });
                                });
                                btnsStatusRol(elementInputCheckbox, idRol, idModuloCurrent, newPermissions);
                            });
                        },
                        error: function(err) {
                            console.error(err)
                        },
                    })
                    console.log(idrol)
                }
            })
        });

        /**
         * @param { HTMLElement } elementInputCheckbox - receives a checkbox input
         * @param { Number } idRol - recieves idRol current
         * @param { Number } idModuloCurrent - recieves idModulo current
         * @param { String } permission - recieves letter permission r || w || u || d
         */

        function btnsStatusRol(elementInputCheckbox, idRol, idModuloCurrent, permissions) {
            // console.log(elementInputCheckbox, idRol)
            onclick({
                el: elementInputCheckbox,
                res: (e) => {
                    changeStatusCheckbox(elementInputCheckbox);
                    console.log({ elementInputCheckbox, idRol, idModuloCurrent, permissions })
                }
            });
        }

        console.log(data)


    },
    error: function(err) {
        console.error(err)
    }
});

// * Guardando Permisos
onclick({
    el: '.btn-save-permissions',
    res: (e) => {
        let allModulesPermissions = getAllElements({el: '.table__content__permissions tr'});
        let data = [];
        allModulesPermissions.map(mod => {
            let idRol = mod.children[0].textContent
            let idModule = mod.children[1].textContent
            let r = mod.children[5].children[0].getAttribute('checked') == null ? 0 : 1;
            let w = mod.children[6].children[0].getAttribute('checked') == null ? 0 : 1;
            let u = mod.children[7].children[0].getAttribute('checked') == null ? 0 : 1;
            let d = mod.children[8].children[0].getAttribute('checked') == null ? 0 : 1;
            data.push({ idRol, idModule, r, w, u, d });
        });
        console.log(data)
        
        AJAXGJ8({
            url: 'Permissions/setPermission',
            data: data,
            success: function(res) {
                console.log(res)
            },
            error: function(err) {
                console.log(err)
            }
        });
    }
});