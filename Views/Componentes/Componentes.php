<?php headerDashboard($data); ?>
<h1 class="title__h1">Componentes</h1>
<!-- Breadcumb -->
<div class="main__breadcumb">
    <span class="breadcumb__item" item="base">Proyectos</span>
</div>
<!-- Components -->
<section class="cards__projects" id="cards__projects__components">
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
<section class="cards__components__only"></section>
<?php footerDashboard($data); ?>