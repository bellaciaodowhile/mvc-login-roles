<?php headerAdmin($data); ?>
<div aria-busy="true" aria-label="Loading, please wait." role="progressbar" class="main__preloader"></div>
<div class="dashboard">
    <nav class="nav__component">
        <div class="nav__logo">
            <img class="nav__logo-img" src="<?php echo BASE_URL; ?>Assets/img/logo.png" alt="Create Components">
            <span class="nav__logo-text">Components</span>
        </div>
        <div class="nav__content">
            <div class="nav__item">
                <button ripple class="nav__item-head nav__item-head--pink create__component">
                    <span><i class="material-icons">dashboard</i> Crear componente <kbd>Esc</kbd></span>
                </button>
            </div>
            <div class="nav__title mt-5">
                Usuarios
            </div>
            <div class="nav__item">
                <a href="<?= BASE_URL . 'dashboard' ?>" ripple class="nav__item-head">
                    <span><i class="material-icons">dashboard</i> Dashboard</span>
                </a>
            </div>
            <?php if ($_SESSION['tipo'] == 'SuperAdmin') {  ?>
            <div class="nav__item">
                <div ripple red class="nav__item-head">
                    <span><i class="material-icons">people</i> Usuarios</span>
                    <span><i class="material-icons">chevron_right</i></span>
                </div>
                <div class="nav__item-content">
                    <div class="nav__item">
                        <a href="<?= BASE_URL . 'usuarios' ?>" ripple class="nav__item-head">
                            <span>Usuarios</span>
                        </a>
                        <a href="<?= BASE_URL . 'roles' ?>" ripple class="nav__item-head">
                            <span>Roles</span>
                        </a>
                    </div>
                </div>
            </div>
            <?php } ?>
            <div class="nav__item">
                <a href="<?= BASE_URL . 'proyectos' ?>" ripple class="nav__item-head">
                    <span><i class="material-icons">web_stories</i> Proyectos</span>
                </a>
            </div>
            <div class="nav__item">
                <a href="<?= BASE_URL . 'componentes' ?>" ripple class="nav__item-head">
                    <span><i class="material-icons">folder</i> Componentes</span>
                </a>
            </div>
            <!-- <div class="nav__item">
                <div ripple red class="nav__item-head">
                    <span><i class="material-icons">folder</i> Componentes</span>
                    <span><i class="material-icons">chevron_right</i></span>
                </div>
                <div class="nav__item-content">
                    <div class="nav__item">
                        <div ripple class="nav__item-head components__open">
                            <span>Listado de componentes <kbd>Ctrl + Q</kbd></span>
                        </div>
                        <a href="<?= BASE_URL . 'categorias' ?>" ripple class="nav__item-head">
                            <span>Categorías</span>
                        </a>
                    </div>
                </div>
            </div> -->
        </div>
    </nav>
    <main class="dashboard__content">
        <header class="header__component">
            <span></span>
            <div class="dropdown__component">
                <div ripple class="dropdown__icon">
                    <i class="material-icons">settings</i>
                </div>
                <ul class="dropdown__content">
                    <li>
                        <a href="<?= BASE_URL . 'Logout' ?>">Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </header>

        <section class="main__content" id="<?= $_SESSION['idUser']; ?>">
        
        <?php require_once "Views/Templates/Components/CreateComponents.php"; ?>
        <?php require_once "Views/Templates/Components/ComponentsItems.php"; ?>

