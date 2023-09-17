<template>
  <div class="options-container">
    <ul>
      <li
        class="pkm-names"
        @click="$emit('selection', id)"
        v-for="{ name, id } in pokemons"
        :key="id"
      >
        {{ hardMode ? id : name }} <!-- Mostrar ID o nombre según el modo difícil -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    hardMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
.pkm-names {
  text-transform: capitalize;
}
</style>
