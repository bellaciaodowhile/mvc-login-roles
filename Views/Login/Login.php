<?php headerAdmin($data); ?>
<div class="cursor"></div>
<div class="login">
    <div class="card__login">
        <h2>Inicia sesión</h2>
        <form action="#" class="form__login">
            <div class="input__text">
                <input class="input__text-input" type="text" required>
                <span class="input__text-label">Usuario</span>
            </div>
            <div class="input__text">
                <input class="input__text-input" type="password" required>
                <span class="input__text-label">Contraseña</span>
            </div>
            <button ripple class="btn-login">
                iniciar sesión
            </button>
        </form>
    </div>
</div>


<!-- 
    id
    nombre
    apellido
    usuario
    contrasena
    status
    tipo_usuario


 -->
<?php footerAdmin($data); ?>