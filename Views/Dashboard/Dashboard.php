<?php headerDashboard($data); ?>

<section class="cards_section" id="<?= $_SESSION['idUser']; ?>">
    <div class="card__item card__item--first">
        <h2 class="card__title">
            Bienvenido de nuevo 👋 <br> <span><?= $_SESSION['tipo'];  ?> <?= $_SESSION['nombre']; ?></span>
        </h2>
        <p class="card__description">
            ¡Nosotros somos los que hacen que todo esto funcione!
        </p>
        <button ripple class="card__btn create__component">
            Crear componente <kbd>Esc</kbd>
        </button>
    </div>
    <!-- <div class="card__item card__item--carousel">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam ipsa tenetur odit autem
        dolores doloribus quasi sequi provident. Quasi culpa expedita temporibus, odio rerum quia ea
        laudantium beatae veniam!
    </div>
    <div class="card__item">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam ipsa tenetur odit autem
        dolores doloribus quasi sequi provident. Quasi culpa expedita temporibus, odio rerum quia ea
        laudantium beatae veniam!
    </div>
    <div class="card__item">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam ipsa tenetur odit autem
        dolores doloribus quasi sequi provident. Quasi culpa expedita temporibus, odio rerum quia ea
        laudantium beatae veniam!
    </div>
    <div class="card__item">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam ipsa tenetur odit autem
        dolores doloribus quasi sequi provident. Quasi culpa expedita temporibus, odio rerum quia ea
        laudantium beatae veniam!
    </div> -->
</section>


<?php footerDashboard($data); ?>