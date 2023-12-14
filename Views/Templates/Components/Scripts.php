<script>
    const BASE_URL = "<?php echo BASE_URL; ?>"
</script>
<script src="<?php echo BASE_URL; ?>/Assets/js/devicons.js"></script>
<script src="<?php echo BASE_URL; ?>/Assets/js/app.js"></script>
<script type="text/javascript" src="https://unpkg.com/monaco-themes/dist/monaco-themes.js"></script>
<script src="https://topiaires.fr/monaco-editor/node_modules/monaco-editor/min/vs/loader.js"></script>
<?php 
foreach($data['js'] as $js) {
    echo "<script src='" . BASE_URL . "/Assets/js/" . $js . "'></script>";
}
?>
<script>
</script>