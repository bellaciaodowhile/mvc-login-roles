<?php headerDashboard($data); ?>
<?php require_once "Views/Templates/Components/CreateComponents.php"; ?>
<section class="cards_section">
    <div class="card__item card__item--first">
        <h2 class="card__title">
            Bienvenido de nuevo 👋 <br> <span>Dev. <?= $_SESSION['nombre']; ?></span>
        </h2>
        <p class="card__description">
            ¡Nosotros somos los que hacen que todo esto funcione!
        </p>
        <button ripple class="card__btn create__component">
            Crear componente
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
<script>

</script>
<?php footerDashboard($data); ?>