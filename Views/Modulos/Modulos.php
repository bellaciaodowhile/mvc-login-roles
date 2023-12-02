<?php headerDashboard($data); ?>

<h1 class="title__h1">Modulos</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__modules">
    Añadir nuevo
</button>
<div id="modal__add__modules" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Modal Header</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__modules">
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
                    <label ripple class="switch__label">
                        <span class="switch__label-slider">
                            <span class="active">Activo</span>
                            <span class="inactive">Inactivo</span>
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


<?php footerDashboard($data); ?>