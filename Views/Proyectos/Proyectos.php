<?php headerDashboard($data); ?>
<h1 class="title__h1">Proyectos</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__projects">
    Crear proyecto
</button>
<!-- Agregando Proyectos -->
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
                    <textarea class="input__text-input" cols="30" rows="10" name="descripcion" required
                        autocomplete="off"></textarea>
                    <span class="input__text-label">Descripción</span>
                </div>
                <div id="select__languages" class="mt-3">
                    <select multiple data-placeholder="Lenguajes"></select>
                </div>
                <button ripple type="submit"
                    class="btn btn--not-shadow btn--outlined mt-4 set__projects">Enviar</button>
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
        <div>
            <div class="d-flex">
                <h1 class="card__project-edit-title">Titulo del proyecto</h1>
                <div class="tooltip" data-tooltip="Editar proyecto" data-tooltip-position="top">
                    <button ripple class="btn btn-icon edit__project">
                        <i class="material-icons-outlined">edit</i>
                    </button>
                </div>
                <div class="tooltip" data-tooltip="Eliminar proyecto" data-tooltip-position="top">
                    <button ripple class="btn btn-icon delete__project">
                        <i class="material-icons-outlined">delete</i>
                    </button>
                </div>
            </div>
            <div class="tag tag__status mt-3"></div>
            <div class="switch mt-3 hidden tag__status__edit">
                <label ripple class="switch__label switch__label--only">
                    <span class="switch__label-slider">
                        <span class="switch__active">En progreso</span>
                        <span class="switch__inactive">Pausado</span>
                    </span>
                </label>
            </div>
        </div>
        <button ripple class="btn btn-icon close__project">
            <i class="material-icons-outlined">close</i>
        </button>
    </header>
    <p class="card__project-edit-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsum esse veniam asperiores consectetur.
        Ea ad laudantium tenetur saepe aliquid dolorum dignissimos ipsum, impedit, quo fuga inventore sit similique
        iusto.
    </p>
    <p class="mt-5">Sus miembros son: </p>
    <div class="select__members__edit hidden">
        <div id="select__members__edit" class="mt-3">
            <select multiple data-placeholder="Miembros"></select>
        </div>
    </div>
    <div class="tags__members">
        <small>Lorem</small>
        <small>Lorem</small>
        <small>Lorem</small>
        <small>Lorem</small>
        <small>Lorem</small>
    </div>
    <p class="mt-5">Los lenguajes que se están usando para construir el proyecto son: </p>
    <div class="select__langs__edit hidden">
        <div id="select__langs__edit" class="mt-3">
            <select multiple data-placeholder="Lenguajes"></select>
        </div>
    </div>
    <div class="tags__languages">
        <img src="<?php echo BASE_URL; ?>assets/img/icons/icons/html5/html5-plain.svg" alt="html5__svg">
        <img src="assets/img/icons/icons/css3/css3-plain.svg" alt="css3__svg">
        <img src="assets/img/icons/icons/javascript/javascript-plain.svg" alt="javascript__svg">
    </div>
    <div class="d-flex jcsb mt-5">
        <button ripple class="btn btn--auto btn-secondary save__project__edit hidden">
            Guardar
        </button>
        <button ripple class="btn btn--auto btn-secondary cancel__project__edit hidden">
            cancelar
        </button>
    </div>
    <button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__categories">
        Crear categoría
    </button>













    <!-- Edición de proyectos -->
    <!-- <div class="input__text input__text--dark">
        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
        <span class="input__text-label">Nombre</span>
    </div>
    <div>
        <div class="input__text input__text--dark input__text-textarea">
            <textarea class="input__text-input" cols="30" rows="10" name="descripcion" required
                autocomplete="off"></textarea>
            <span class="input__text-label">Descripción</span>
        </div>
    </div>
    <div class="switch mt-3">
        <label ripple class="switch__label switch__label--only">
            <span class="switch__label-slider">
                <span class="switch__active">En progreso</span>
                <span class="switch__inactive">Pausado</span>
            </span>
        </label>
    </div> -->





</section>
<!-- Agregar Categorías -->
<div id="modal__add__categories" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando categoría</h2>
        </div>
        <div class="modal__body">
            <form class="form__add__categories">
                <div class="form-group-2">
                    <div class="input__text">
                        <input class="input__text-input" name="nombre" type="text" required autocomplete="off">
                        <span class="input__text-label">Nombre</span>
                    </div>
                    <div class="switch mt-3">
                        <label ripple class="switch__label switch__label--users">
                            <span class="switch__label-slider">
                                <span class="switch__active">Activo</span>
                                <span class="switch__inactive">Inactivo</span>
                            </span>
                        </label>
                    </div>
                </div>
                <div class="md-checkbox">
                    <input id="i2" type="checkbox" checked>
                    <label for="i2">Categoría Global</label>
                </div>
                <!-- Mapa de categorías -->
                <div class="radio-content categories">
                    <div class="radio-content subcategories">
                        <h4 class="subtitle normal mt-4"><strong>Mapa de categorías</strong></h4>
                        <div class="main-chevrondown-gj8 mt-2" id="categories-tree-main">
                            <div class="d-flex jcsb">
                                <div class="d-flex expand-less-gj8">
                                    <i class="material-icons-outlined">expand_less</i>
                                    Contraer todo
                                </div>
                                <div class="d-flex expand-more-gj8">
                                    <i class="material-icons-outlined">expand_more</i>
                                    Expandir todo
                                </div>
                            </div>
                            <hr class="mt-3">
                            <div class="chevrondown-gj8">
                                <div class="chevrondown-item-gj8">
                                    <div class="chevrondown-head-gj8">
                                        <i class="material-icons">chevron_right</i>
                                        <span class="chevrondown-radio-button not active" item="base"></span>
                                        Todas las categorías
                                    </div>
                                    <div class="chevrondown-content-gj8 projects not"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mapa de categorías -->
                <button ripple type="submit" class="btn btn--not-shadow btn--outlined mt-4 set__category">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>







<?php footerDashboard($data); ?>