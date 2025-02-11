<script>
    export let params = {}
</script>

<h1>Pagina de Acerca de</h1>
<h1>Id recibido: {params.id}</h1>
<h1>Nombre recibido: {#if params.nombre}{params.nombre}{/if}</h1>