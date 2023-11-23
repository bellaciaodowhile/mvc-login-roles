<?php headerAdmin($data); ?>

    <h1>Roles</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, fugit vitae repellat totam iure est at error quos doloremque cupiditate quas iusto minus, quam soluta harum. Illum cum suscipit dolorem.</p>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody class="table__content__roles"></tbody>
    </table>
    <h2>Módulos / Permisos</h2>
    <table>
        <thead>
            <tr>
                <th>idRol</th>
                <th>#</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Leer</th>
                <th>Escribir</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody class="table__content__permissions"></tbody>
    </table>
    <button class="btn-save-permissions">
        Guardar permisos
    </button>


<?php footerAdmin($data); ?>