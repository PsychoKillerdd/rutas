<h1>Pagina de contactos</h1>
<h1>Bienvenidos a svelte</h1>
<script>
    import { onMount } from 'svelte';
  
    let pokemons = [];
    let loading = true;
    let error = null;
  
    // Función para obtener la lista de los primeros 20 Pokémon
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) {
          throw new Error('Error al obtener los Pokémon');
        }
  
        const data = await response.json();
        const pokemonList = data.results;
  
        // Obtener detalles de cada Pokémon (como la imagen)
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
  
        pokemons = pokemonDetails;
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
  
    onMount(() => {
      fetchPokemons();
    });
  </script>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }
    .card {
      background-color: #f2f2f2;
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.05);
    }
    img {
      width: 120px;
      height: 120px;
    }
  </style>
  
  {#if loading}
    <p>Cargando Pokémon...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="grid">
      {#each pokemons as pokemon}
        <div class="card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        </div>
      {/each}
    </div>
  {/if}
  