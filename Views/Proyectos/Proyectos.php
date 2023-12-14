<?php headerDashboard($data); ?>
<h1 class="title__h1">Proyectos</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__projects">
    Crear proyecto
</button>
<!-- 
    nombre
    descripcion
    languages

-->
<!-- Agregar Proyectos -->
<div id="modal__add__projects" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando proyecto</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__projects">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="switch mt-3">
                        <label ripple class="switch__label switch__label--users">
                            <span class="switch__label-slider">
                                <span class="switch__active">Activo</span>
                                <span class="switch__inactive">Pausado</span>
                            </span>
                        </label>
                    </div>
                </div>
                <div id="select__members" class="mt-2">
                    <select multiple data-placeholder="Miembros"></select>
                </div>
                <div class="input__text input__text-textarea">
                    <textarea class="input__text-input" cols="30" rows="10" name="descripcion" required autocomplete="off"></textarea>
                    <span class="input__text-label">Descripción</span>
                </div>
                <div id="select__languages" class="mt-3">
                    <select multiple data-placeholder="Lenguajes"></select>
                </div>
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined mt-4 set__projects">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>




<section class="cards__projects" id="cards__projects">
    <div class="card__project">
        <div class="card__project-title">
            Widgets
        </div>
        <div class="card__project-description">
            La plataforma de Widgets permitirá a los usuarios seleccionar entre una variedad de opciones...
        </div>
        <div class="card__project-options">
        </div>
        <div class="tag tag--progress">
            en progreso
        </div>
        <div class="card__project-users">
            <span class="tag__user">A</span>
        </div>
    </div>
    <div class="card__project">
        <div class="card__project-title">
            Ecommerce
        </div>
        <div class="card__project-description">
            La plataforma de Ecommerce permitirá a los usuarios seleccionar entre una variedad de opciones...
        </div>
        <div class="card__project-options">
        </div>
        <div class="tag tag--paused">
            pausado
        </div>
        <div class="card__project-users">
            <span class="tag__user">A</span>
            <span class="tag__user">b</span>
            <span class="tag__user">c</span>
            <span class="tag__user">d</span>
            <small>+2</small>
        </div>

    </div>
    <div class="card__project">
        <div class="card__project-title">
            Widgets
        </div>
        <div class="card__project-description">
            La plataforma de Widgets permitirá a los usuarios seleccionar entre una variedad de opciones...
        </div>
        <div class="card__project-options">
        </div>
        <div class="tag tag--progress">
            en progreso
        </div>
        <div class="card__project-users">
            <span class="tag__user">A</span>
            <span class="tag__user">b</span>
            <span class="tag__user">c</span>
            <span class="tag__user">d</span>
            <small>+2</small>
        </div>

    </div>
    <div class="card__project">
        <div class="card__project-title">
            Gloobal Jobs
        </div>
        <div class="card__project-description">
            Encontrarás el mejor trabajo de tu vida ¿quieres unirte a nosotros? Entonces debes...
        </div>
        <div class="card__project-options">
        </div>
        <div class="tag tag--paused">
            pausado
        </div>
        <div class="card__project-users">
            <span class="tag__user">A</span>
            <span class="tag__user">b</span>
            <span class="tag__user">c</span>
            <span class="tag__user">d</span>
            <small>+2</small>
        </div>

    </div>
</section>
<section class="card__project-edit">
    <header class="card__project-edit-header">
        <h1 class="card__project-edit-title">Titulo del proyecto</h1>
        <button ripple class="btn btn-icon close__project">
            <i class="material-icons-outlined">close</i>
        </button>
    </header>
    <p class="card__project-edit-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsum esse veniam asperiores consectetur. Ea ad laudantium tenetur saepe aliquid dolorum dignissimos ipsum, impedit, quo fuga inventore sit similique iusto.
    </p>
    <p class="mt-5">Sus miembros son: </p>
    <div class="tags__members">
        <small>Augusto</small>
        <small>Augusto</small>
        <small>Augusto</small>
        <small>Augusto</small>
        <small>Augusto</small>
    </div>
    <p class="mt-5">Los lenguajes que se están usando para construir el proyecto son: </p>
    <div class="tags__languages">
        <img src="assets/img/icons/icons/html5/html5-plain.svg" alt="html5__svg">
        <img src="assets/img/icons/icons/css3/css3-plain.svg" alt="css3__svg">
        <img src="assets/img/icons/icons/javascript/javascript-plain.svg" alt="javascript__svg">
    </div>
</section>







<?php footerDashboard($data); ?>