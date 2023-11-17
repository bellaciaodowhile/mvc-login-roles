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
                                let permission = elementInputCheckbox.getAttribute('name');
                                btnsStatusRol(elementInputCheckbox, idRol, idModuloCurrent, permission);
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

        function btnsStatusRol(elementInputCheckbox, idRol, idModuloCurrent, permission) {
            // console.log(elementInputCheckbox, idRol)
            onclick({
                el: elementInputCheckbox,
                res: (e) => {
                    let status = changeStatusCheckbox(elementInputCheckbox);
                    console.log({ idRol, idModuloCurrent, status, permission })
                    AJAXGJ8({
                        url: 'Permissions/setPermission',
                        data: [{
                            idRol,
                            idModuloCurrent,
                            status,
                            permission
                        }],
                        success: (res) => {
                            console.log(res)
                        }
                    });
                }
            });
        }



        console.log(data)
    },
    error: function(err) {
        console.error(err)
    }
});