<?php headerAdmin($data); ?>

<div class="dashboard">
    <nav class="nav__component">
        <div class="nav__logo">
            <img class="nav__logo-img" src="assets/img/logo.png" alt="Create Components">
            <span class="nav__logo-text">Components</span>
        </div>
        <div class="nav__content">
            <div class="nav__title">
                Usuarios
            </div>
            <div class="nav__item">
                <a href="<?= BASE_URL . 'dashboard' ?>" ripple class="nav__item-head">
                    <span><i class="material-icons">dashboard</i> Dashboard</span>
                </a>
            </div>
            <div class="nav__item">
                <div ripple class="nav__item-head">
                    <span><i class="material-icons">people</i> Usuarios</span>
                    <span><i class="material-icons">chevron_right</i></span>
                </div>
                <div class="nav__item-content">
                    <div class="nav__item">
                        <a href="<?= BASE_URL . 'usuarios' ?>" ripple class="nav__item-head">
                            <span> Usuarios</span>
                        </a>
                        <div ripple class="nav__item-head">
                            <span> Permisos</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav__item">
                <div ripple class="nav__item-head">
                    <span><i class="material-icons-outlined">folder</i> Componentes</span>
                    <span><i class="material-icons">chevron_right</i></span>
                </div>
                <div class="nav__item-content">
                    <div class="nav__item">
                        <div ripple class="nav__item-head">
                            <span>Inputs</span>
                        </div>
                    </div>
                </div>
            </div>
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
                        <a href="#">Editar perfil</a>
                    </li>
                    <li>
                        <a href="#">Cambiar estado</a>
                    </li>
                    <li>
                        <a href="<?= BASE_URL . 'Logout' ?>">Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </header>

        <section class="main__content">