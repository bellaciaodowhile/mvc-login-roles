<?php headerDashboard($data); ?>
<h1 class="title__h1">Roles</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__roles">
    Añadir nuevo
</button>
<!-- Agregando Roles -->
<div id="modal__add__roles" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando Rol</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__roles">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="descripcion" type="text" required autocomplete="off">
                        <span class="input__text-label">Descripción</span>
                    </div>
                </div>
                <div class="switch mt-2">
                    <label ripple class="switch__label switch__label--roles">
                        <span class="switch__label-slider">
                            <span class="switch__active">Activo</span>
                            <span class="switch__inactive">Inactivo</span>
                        </span>
                    </label>
                </div>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined mt-4">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
<!-- Actulizando Roles -->
<div id="modal__update__roles" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando Rol</h2>
        </div>
        <div class="modal__body">
            <form class="form__update__roles">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="input__text">
                        <input class="input__text-input" name="descripcion" type="text" required autocomplete="off">
                        <span class="input__text-label">Descripción</span>
                    </div>
                </div>
                <div class="switch mt-2">
                    <label ripple class="switch__label switch__label--roles">
                        <span class="switch__label-slider">
                            <span class="switch__active">Activo</span>
                            <span class="switch__inactive">Inactivo</span>
                        </span>
                    </label>
                </div>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined mt-4">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
<table class="table__basic">
    <tr class="thead">
        <td>#</td>
        <td>nombre</td>
        <td>descripción</td>
        <td>estado</td>
        <td>acciones</td>
    </tr>
    <tbody id="table__roles">
        <tr class="trow">
            <td>1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>texto1</td>
            <td>
                <button ripple class="btn btn-icon">
                    <i class="material-icons-outlined">policy</i>
                </button>
            </td>
        </tr>
    </tbody>
</table>
<div id="modal__permissions" class="modal">
    <div class="modal__content modal__content--full">
        <div class="modal__header">
            <h2>Permisos</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__roles">
                <table class="table__basic table__basic--light">
                    <tr class="thead">
                        <td>#</td>
                        <td>nombre</td>
                        <td>descripción</td>
                        <td>leer</td>
                        <td>escribir</td>
                        <td>actualizar</td>
                        <td>eiminar</td>
                    </tr>
                    <tbody id="table__permissions">
                        <tr class="trow">
                            <td>1</td>
                            <td>Dashboard</td>
                            <td>Este es el dashboard</td>
                            <td>Activo</td>
                            <td>
                                <div class="switch mt-2">
                                    <label ripple class="switch__label switch__label--small">
                                        <span class="switch__label-slider">
                                            <span class="switch__active">Activo</span>
                                            <span class="switch__inactive">Inactivo</span>
                                        </span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div class="switch mt-2">
                                    <label ripple class="switch__label switch__label--small">
                                        <span class="switch__label-slider">
                                            <span class="switch__active">Activo</span>
                                            <span class="switch__inactive">Inactivo</span>
                                        </span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div class="switch mt-2">
                                    <label ripple class="switch__label switch__label--small">
                                        <span class="switch__label-slider">
                                            <span class="switch__active">Activo</span>
                                            <span class="switch__inactive">Inactivo</span>
                                        </span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div class="switch mt-2">
                                    <label ripple class="switch__label switch__label--small">
                                        <span class="switch__label-slider">
                                            <span class="switch__active">Activo</span>
                                            <span class="switch__inactive">Inactivo</span>
                                        </span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined mt-4 save__permissions">guardar permisos</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">cerrar</button>
        </div>
    </div>
</div>














<?php footerDashboard($data); ?>