<section class="create__components">


    <div class="list-container">
        <button class="more-button" aria-label="Menu Button">
            <div class="menu-icon-wrapper">
                <div class="menu-icon-line half first"></div>
                <div class="menu-icon-line"></div>
                <div class="menu-icon-line half last"></div>
            </div>
        </button>
        <ul class="more-button-list">
            <form id="form__save__components">
                <li class="more-button-list-item">
                    <div class="input__text input__text--dark">
                        <input class="input__text-input" name="name__component" type="text" required autocomplete="off"
                        value="Nombre del componente">
                        <span class="input__text-label">Nombre</span>
                    </div>
                </li>
                <div class="more-button-icons">
                    <div class="tooltip" data-tooltip="Guardar componente" data-tooltip-position="top">
                        <button ripple class="btn btn-icon btn-icon--fill save__component">
                            <i class="material-icons-outlined">save</i>
                        </button>
                    </div>
                    <div class="tooltip" data-tooltip="Cerrar editor" data-tooltip-position="top">
                        <button ripple class="btn btn-icon btn-icon--fill close__component">
                            <i class="material-icons-outlined">close</i>
                        </button>
                    </div>
                </div>
            </form>
        </ul>
    </div>
    <div class="component__settings">
        <div class="tooltip" data-tooltip-position="right" data-tooltip="Guardar edición">
            <button ripple class="btn btn-icon save__edit__component">
                <i class="material-icons">edit</i>
            </button>
        </div>
        <div class="tooltip" data-tooltip-position="right" data-tooltip="Tranferir componente">
            <button ripple class="btn btn-icon transfer__component">
                <i class="material-icons">account_tree</i>
            </button>
        </div>
        <div class="tooltip" data-tooltip-position="right" data-tooltip="Eliminar componente">
            <button ripple class="btn btn-icon delete__component">
                <i class="material-icons-outlined">delete</i>
            </button>
        </div>
        <div class="tooltip" data-tooltip-position="right" data-tooltip="Presione 'Esc' para salir del editor">
            <button ripple class="btn btn-icon">
                <i class="material-icons-outlined">help</i>
            </button>
        </div>
    </div>



    <nav class="nav__create__components">
        <div class="title__component">
            <div class="nav__logo">
                <img class="nav__logo-img" src="<?php echo BASE_URL; ?>Assets/img/logo.png" alt="Create Components">
            </div>
            <div class="input__text input__text--dark">
                <input class="input__text-input" name="nombre" type="text" required autocomplete="off"
                    value="Nombre del componente">
                <span class="input__text-label">Nombre</span>
            </div>
        </div>
        <div class="nav__create__components-icons">
            <button ripple class="btn btn-icon btn-icon--fill">
                <i class="material-icons-outlined">save</i>
            </button>
            <button ripple class="btn btn-icon close__component">
                <i class="material-icons-outlined">close</i>
            </button>
        </div>
    </nav>

    <div class="panel-grid">
        <div class="panel" id="panel-a">
            <div id="html__editor" style="width:100%;height:100%;"></div>
            <img class="panel__icon" src="<?php echo BASE_URL; ?>Assets/img/icons/html.svg" alt="Editor HTML">
        </div>
        <div class="panel" id="panel-b">
            <div id="js__editor" style="width:100%;height:100%;"></div>
            <img class="panel__icon" src="<?php echo BASE_URL; ?>Assets/img/icons/js.svg" alt="Editor JS">
        </div>
        <div class="panel" id="panel-c">
            <div id="css__editor" style="width:100%;height:100%;"></div>
            <img class="panel__icon" src="<?php echo BASE_URL; ?>Assets/img/icons/css.svg" alt="Editor CSS">
        </div>
        <div class="panel" id="panel-d">
            <button class="btn btn-icon btn-icon--fill tooltip" data-tooltip="Ctrl + 1" data-tooltip-position="left" id="fullscreen__component">
                <i class="material-icons-outlined">fullscreen</i>
            </button>
            <iframe id="components__result"></iframe>
        </div>

        <div id="handler"></div>
    </div>

</section>
<!-- Form Step -->
<section class="create__component__step">
    <div class="tooltip right" data-tooltip="Cerrar" data-tooltip-position="top">
        <button ripple class="btn btn-icon create__component__step-close">
            <i class="material-icons-outlined">close</i>
        </button>
    </div>
    <h1 class="title__h1">Seleccione <span class="step__current__h1">un proyecto</span>:</h1>
    <section class="create__component__step-projects create__component__step-projects--active">
        <section class="cards__projects" id="cards__projects__components--create">
            <div class="card__project"> 
                <div class="card__project-title">
                    Proyecto
                </div>
                <div class="card__project-options mt-3">
                </div>
                <div class="tag tag--paused">
                    inactivo
                </div>
                <div class="card__project-users">
                    <small class="center gap-5">
                        <i class="material-icons-outlined">folder</i> <span>4</span>
                    </small>
                </div>
            </div>
        </section>
    </section>
    <section class="create__component__step-categories">
        <div class="d-flex">
            <div class="tooltip" data-tooltip="Anterior" data-tooltip-position="top">
                <button ripple class="btn btn-icon prev__step">
                    <i class="material-icons-outlined">chevron_left</i>
                </button>
            </div>
        </div>
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
                                <span>Todas las categorías</span>
                            </div>
                            <div class="chevrondown-content-gj8 components not"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button ripple class="btn btn--auto right btn-secondary create__component-category">
            Continuar
        </button>
    </section>
</section>