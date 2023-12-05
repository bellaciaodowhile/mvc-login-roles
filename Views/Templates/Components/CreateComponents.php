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
                    <button ripple class="btn btn-icon btn-icon--fill save__component">
                        <i class="material-icons-outlined">save</i>
                    </button>
                    <button ripple class="btn btn-icon btn-icon--fill close__component">
                        <i class="material-icons-outlined">menu_open</i>
                    </button>
                </div>
            </form>
        </ul>
    </div>


    <nav class="nav__create__components">
        <div class="title__component">
            <div class="nav__logo">
                <img class="nav__logo-img" src="assets/img/logo.png" alt="Create Components">
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
            <img class="panel__icon" src="assets/img/icons/html.svg" alt="Editor HTML">
        </div>
        <div class="panel" id="panel-b">
            <div id="js__editor" style="width:100%;height:100%;"></div>
            <img class="panel__icon" src="assets/img/icons/js.svg" alt="Editor JS">
        </div>
        <div class="panel" id="panel-c">
            <div id="css__editor" style="width:100%;height:100%;"></div>
            <img class="panel__icon" src="assets/img/icons/css.svg" alt="Editor CSS">
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