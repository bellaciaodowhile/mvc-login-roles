<?php headerDashboard($data); ?>
<h1 class="title__h1">Usuarios</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__users">
    Crear usuario
</button>
<table class="table__basic">
    <tr class="thead">
        <td>#</td>
        <td>nombre</td>
        <td>apellido</td>
        <td>usuario</td>
        <td>estado</td>
        <td>tipo</td>
        <td>acciones</td>
    </tr>
    <tbody id="table__users">
        <tr class="trow">
            <td>texto1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>
                <button ripple class="btn btn-icon">
                    <i class="material-icons-outlined">edit</i>
                </button>
            </td>
        </tr>
    </tbody>
</table>
<!-- Agregar usuario -->
<div id="modal__add__users" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando usuario</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__users">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="apellido" type="text" required autocomplete="off">
                        <span class="input__text-label">Apellido</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="usuario" type="text" required autocomplete="off">
                        <span class="input__text-label">Usuario</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="contrasena" type="password" required autocomplete="off">
                        <span class="input__text-label">Contraseña</span>
                    </div>
                    <!-- <div class="input__text">
                        <input class="input__text-input" name="status" type="text" required autocomplete="off">
                        <span class="input__text-label">Estado</span>
                    </div> -->
                    <div class="switch mt-3">
                        <label ripple class="switch__label switch__label--users">
                            <span class="switch__label-slider">
                                <span class="switch__active">Activo</span>
                                <span class="switch__inactive">Inactivo</span>
                            </span>
                        </label>
                    </div>
                    <div class="select">
                        <div class="select__header">
                            <label class="select__header__label">
                                Tipo de usuario
                            </label>
                            <span class="select__header__icon"></span>
                        </div>
                        <div class="select__content" id="select__content__roles">
                            <div ripple class="select__content-item">
                                Administrador
                            </div>
                            <div ripple class="select__content-item">
                                FrontEnd Developer
                            </div>
                            <div ripple class="select__content-item">
                                UX Developer
                            </div>
                        </div>
                    </div>
                </div>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
<!-- Editar usuario -->
<div id="modal__update__users" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Actualizando usuario</h2>
        </div>
        <div class="modal__body">
            <form class="form__update__users">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="apellido" type="text" required autocomplete="off">
                        <span class="input__text-label">Apellido</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="usuario" type="text" required autocomplete="off">
                        <span class="input__text-label">Usuario</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="contrasena" type="password" required autocomplete="off">
                        <span class="input__text-label">Contraseña</span>
                    </div>
                    <!-- <div class="input__text">
                        <input class="input__text-input" name="status" type="text" required autocomplete="off">
                        <span class="input__text-label">Estado</span>
                    </div> -->
                    <div class="switch mt-3">
                        <label ripple class="switch__label switch__label--users">
                            <span class="switch__label-slider">
                                <span class="switch__active">Activo</span>
                                <span class="switch__inactive">Inactivo</span>
                            </span>
                        </label>
                    </div>
                    <div class="select">
                        <div class="select__header">
                            <label class="select__header__label">
                                Tipo de usuario
                            </label>
                            <span class="select__header__icon"></span>
                        </div>
                        <div class="select__content" id="select__content__roles">
                            <div ripple class="select__content-item">
                                Administrador
                            </div>
                            <div ripple class="select__content-item">
                                FrontEnd Developer
                            </div>
                            <div ripple class="select__content-item">
                                UX Developer
                            </div>
                        </div>
                    </div>
                </div>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined">actualizar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>


<?php footerDashboard($data); ?>