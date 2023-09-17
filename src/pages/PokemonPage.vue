<template>
    <h1 v-if="!pokemon">Loading...</h1>
    <div v-else>
      <h1>¿Cuál es este Pokémon?</h1>
      <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
      <PokemonOptions
        :pokemons="pokemonArr"
        @selection="checkAnswer($event)"
        :disabled="showAnswer"
      />
      <ul v-if="showAnswer" class="fade-in">
        <h2>{{ message }}</h2>
        <h3>Puntuación: {{ points }}</h3>
        <template class="button-container">
          <button class="continue-button" @click="continueGame" v-if="answeredCorrectly">Continuar</button>
          <button @click="newGame">Nuevo Juego</button>
        </template>
      </ul>
    </div>
  </template>
  
  <script>
  import PokemonOptions from '@/components/PokemonOptions.vue'
  import PokemonPicture from '@/components/PokemonPicture.vue'
  
  import getPokemonOptions from '@/helpers/getPokemonOptions'
  
  export default {
    components: {
      PokemonOptions,
      PokemonPicture,
    },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: '',
        points: 0,
        answeredCorrectly: false,
      }
    },
    methods: {
      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions()
  
        const rndInt = Math.floor(Math.random() * 4)
        this.pokemon = this.pokemonArr[rndInt]
        this.answeredCorrectly = false;
      },
      checkAnswer(pokemonId) {
        this.showPokemon = true
        this.showAnswer = true
        if (pokemonId === this.pokemon.id && !this.answeredCorrectly) {
          this.message = `¡Correcto, es ${this.pokemon.name}!`;
          this.points++;
          this.answeredCorrectly = true;
        } else {
          this.message = `¡Incorrecto, era ${this.pokemon.name}!`;
        }
      },
      continueGame() {
        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        this.mixPokemonArray()
      },
      newGame() {
        location.reload()
      },
    },
    mounted() {
      this.mixPokemonArray()
    },
  }
  </script>
  
  <style scoped>
  button {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
  }
  
  .continue-button {
    background-color: green;
    color: white;
  }
  
  button:hover {
    background-color: rgba(228, 27, 54, 0.911);
    color: aliceblue;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  </style>