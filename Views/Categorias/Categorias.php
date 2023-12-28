<?php headerDashboard($data); ?>
<h1 class="title__h1">Categorías</h1>
<button ripple class="btn btn--auto btn-secondary" data-toggle="modal" data-target="#modal__add__categories">
    Crear categoría
</button>
<!-- Agregar Categorías -->
<div id="modal__add__categories" class="modal">
    <div class="modal__content">
        <div class="modal__header">
            <h2>Agregando categoría</h2>
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
                                    <div class="chevrondown-content-gj8 not"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Mapa de categorías -->
                <button ripple type="submit"
                    class="btn btn--not-shadow btn--outlined mt-4 set__projects">Enviar</button>
            </form>
        </div>
        <div class="modal__footer">
            <button ripple type="button" class="btn btn--not-shadow btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>

<?php footerDashboard($data); ?>