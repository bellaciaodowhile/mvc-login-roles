<section class="create__components">
    <div class="trigger__nav">
        <button ripple class="btn btn-icon btn-icon--fill">
            <i class="material-icons-outlined">menu</i>
        </button>
        <div class="input__text input__text--dark">
            <input class="input__text-input" name="nombre" type="text" required autocomplete="off" value="Nombre del componente">
            <span class="input__text-label">Nombre</span>
        </div>
        <button ripple class="btn btn-icon btn-icon--fill">
            <i class="material-icons-outlined">save</i>
        </button>
        <button ripple class="btn btn-icon close__component">
            <i class="material-icons-outlined">close</i>
        </button>
    </div>
    <nav class="nav__create__components">
        <div class="title__component">
            <div class="nav__logo">
                <img class="nav__logo-img" src="assets/img/logo.png" alt="Create Components">
            </div>
            <div class="input__text input__text--dark">
                <input class="input__text-input" name="nombre" type="text" required autocomplete="off" value="Nombre del componente">
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
        </div>
        <div class="panel" id="panel-b">
            <div id="css__editor" style="width:100%;height:100%;"></div>
        </div>
        <div class="panel" id="panel-c">
            <div id="js__editor" style="width:100%;height:100%;"></div>
        </div>
        <div class="panel" id="panel-d">
            <iframe id="components__result"></iframe>
        </div>
        <div id="handler"></div>
    </div>







    <!-- <div id="header__">value</div> -->

    <!-- <div id="js__editor" style="width:800px;height:600px;border:1px solid grey"></div> -->
    <!-- <wc-monaco-editor language="javascript" style="width:800px; height:800px;" class="html__editor"></wc-monaco-editor> -->

























    <!-- <div class="panel-accordion">
        <div class="code-panel code-panel-1">
            <div class="code-panel-dragbar"></div>
            <header class="code-panel-titlebar">
                <span class="code-panel-titlebar-title">HTML</span>
            </header>
            <section id="" class="box box-html">
                <div id="html-box" class="edit__ace"></div>
            </section>
        </div>

        <div class="code-panel code-panel-2">
            <div class="code-panel-dragbar"></div>
            <header class="code-panel-titlebar">
                <span class="code-panel-titlebar-title">CSS</span>
            </header>
            <section id="" class="box box-css">
                <div id="css-box" class="edit__ace"></div>
            </section>
        </div>

        <div class="code-panel code-panel-3">
            <div class="code-panel-dragbar"></div>
            <header class="code-panel-titlebar">
                <span class="code-panel-titlebar-title">JS</span>
            </header>
            <section id="" class="box box-js">
                <div id="js-box" class="edit__ace"></div>
            </section>
        </div>

    </div> -->

    <!-- <div class="change-layout">Change Layout</div> -->
    <!-- <div class="container__editor view2">
        <div class="coder view2">
            <div class="code-editor htmlCoder">
                <div class="code-type">HTML</div>
                <div class="code html" id="html"></div>
            </div>
            <div class="code-editor cssCoder">
                <div class="code-type">CSS</div>
                <div class="code css" id="css"></div>
            </div>
            <div class="code-editor jsCoder">
                <div class="code-type">JS</div>
                <div class="code js" id="javascript"></div>
            </div>
        </div>
        <div class="output">
            <iframe src="" class="virtual-iframe" frameborder="0"></iframe>
        </div>
    </div> -->

</section>