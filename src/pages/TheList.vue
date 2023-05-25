<template>
  <NavBar />
  <main>
    <div class="laptop" v-for="(value, key) in list" :key="key">
      <img src="../assets/images/laptop.png" alt="laptop" />
      <h3>{{ value.firstname }} {{ value.lastname }}</h3>
      <h4>{{ value.laptop_name }}</h4>
      <router-link :to="'/LaptopDetails/' + key">მეტის ნახვა</router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([]);

fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/PCFY.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    list.value = data;
  });
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 50% 50%;
  width: 66%;
  margin: auto;
  gap: 5%;
}

.laptop {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #eafaff;
}

img {
  position: relative;
  float: left;
  width: 10rem;
  margin-right: 2rem;
}

h3 {
  margin-top: 1rem;
}

h4 {
  margin-top: 0.5rem;
}

a {
  position: relative;
  display: block;
  margin-top: 1rem;
}

@media screen and (max-width: 1000px) {
  main {
    grid-template-columns: 100%;
  }
}

@media screen and (max-width: 500px) {
  * {
    font-size: 90%;
  }

  main {
    width: 100%;
  }

  img {
    width: 8rem;
  }
}
</style>