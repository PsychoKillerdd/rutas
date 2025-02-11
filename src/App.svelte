<script>
  import { onMount } from 'svelte';
 import { link } from 'svelte-spa-router/Router.svelte';
  let characters = [];
  let loading = true;
  let error = null;

  // Función para consumir la API
  async function fetchCharacters() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) {
        throw new Error('Error al obtener los personajes');
      }
      const data = await response.json();
      characters = data.results;  // La API devuelve los personajes en la propiedad "results"
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // Llamar a la API cuando el componente se monta
  onMount(() => {
    fetchCharacters();
  });
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .card {
    background-color: #f9f9f9;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
</style>

<!-- Interfaz de Usuario -->
{#if loading}
  <p>Cargando personajes...</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="grid">
    {#each characters as character}
      <div class="card">
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
      </div>
    {/each}
  </div>
{/if}
<!-- Botón con estilo Bootstrap que navega a la página de Contactos -->
<a use:link href="/Contactos" class="btn btn-primary">
  Ir a Contactos
</a>
